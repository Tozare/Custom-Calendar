import React, {useState} from 'react'
import './day.less'
import {daysInMonth, getDayNumberInWeek, timeslots, weekDays} from "../../../commons/calendar/constants";
import {TaskModal} from "./task-modal";
import {StateData, Task, TasksManagement} from "../../../domain/calendar/tasks";
import {useObservable} from "../../../commons/react-hooks/use-observable";

type Props = {
    day: number,
    month: number,
    year: number
}

export const Day = (props: Props) => {
    const { day, month, year } = props

    const tasksManagement = new TasksManagement()
    const tasksData = useObservable<StateData | undefined>(tasksManagement.tasksObservable, tasksManagement.stateData)

    const date = new Date(year, month, day)
    const weekDayIndex = date.getDay()


    const getDayTasks = (day: number): Task[] => {
        if (tasksData && tasksData.tasks){
            return tasksData.tasks.filter(task => {
                task.startTime = new Date(task.startTime)
                task.endTime = new Date(task.endTime)
                return (
                    task.startTime.getDate() === day &&
                    task.startTime.getMonth() === month &&
                    task.startTime.getFullYear() === year
                )
            })
        } else {
            return []
        }
    }


    const addTask = (task: Task) => {
        tasksManagement.addTask(task)
    }

    const lengthData: number[] = []


    return (
        <div className='day-container'>
            {/*{ modalIsOpen && <TaskModal year={year} month={month} day={day}/> }*/}
            <div className='time-slots-container'>
                <div className='time-slot   '><TaskModal year={year} month={month} day={day} addTask={addTask}/></div>
                <div className='time-slot   '>Notes: </div>
                {timeslots.map( timeslot => <div className='time-slot'>{timeslot}</div>)}
            </div>
            <div className='day'>
                <div className='day-header'>
                    <div>
                        {weekDays[weekDayIndex]}
                    </div>
                    <div>
                        {day}
                    </div>
                </div>
                <div className='time-slot'/>
                {timeslots.map( timeslot => <div className='time-slot'/>)}
                {
                    getDayTasks(day)
                        .sort((a,b)=> (a.startTime.getTime()>b.startTime.getTime()) ? 1 : (a.startTime.getTime()===b.startTime.getTime() ? ((a.endTime.getTime()<b.endTime.getTime()) ? 1 : -1) :-1 ))
                        .map((task, index) => {
                            const startHour = task.startTime.getHours()
                            const startMinute = task.startTime.getMinutes()
                            const endHour = task.endTime.getHours()
                            const endMinute = task.endTime.getMinutes()

                            const height = (endHour - startHour) * 48 + (endMinute - startMinute)*(48 / 60)
                            const startPosition = (startHour + 2) * 48 + (startMinute) * (48/60)


                            let d = 0
                            if (index === 0){
                                lengthData.push(endHour * 60 + endMinute)
                            } else {
                                for(let i=0; i<lengthData.length; i++){
                                    if ((startHour * 60 + startMinute) < lengthData[i]){
                                        d+=10
                                        if (i === lengthData.length-1){
                                            lengthData.push(endHour * 60 + endMinute)
                                            break;
                                        }
                                    } else {
                                        lengthData[i] = (endHour * 60 + endMinute)
                                        break;
                                    }
                                }
                            }

                            const styleObject = {
                                width: '100px',
                                height: `${height}px`,
                                top: `${startPosition}px`,
                                border: '1px solid black',
                                left: `${d}px`,
                                backgroundColor: 'blue',
                                zIndex: d
                            }
                            return (
                                <div className='task' style={styleObject}>{task.title}</div>
                            )
                        })
                }
            </div>
        </div>
    )
}