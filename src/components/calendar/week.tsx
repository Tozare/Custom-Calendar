import React, {useState} from 'react'
import './week.less'
import {daysInMonth, getDayNumberInWeek, timeslots, weekDays} from "../../../commons/calendar/constants";
import {StateData, Task, TasksManagement} from "../../../domain/calendar/tasks";
import {TaskCart} from "../task/task-cart";

type Props = {
    day: number,
    month: number,
    year: number,
    tasksData: StateData | undefined,
    deleteTask: (task: Task) => void,
}

export type IsModifyTaskCartAvailable = {
    isAvailable: boolean,
    id: string
}

export const Week = (props: Props) => {
    const { day, month, year, tasksData, deleteTask } = props

    const [isTaskCartAvailable, setIsTaskCartAvailable] = useState({
        isAvailable: false,
        id: 'none'
    })

    const monthDays = daysInMonth(month, year)
    const previousMonthDays = daysInMonth(month-1, year)

    const date = new Date(year, month, day)
    const weekDay = getDayNumberInWeek(date)

    const weekDates = []
    if (day-weekDay-1<1){
        const remainPreviousMonthDays = weekDay-day + 1
        const startDay = previousMonthDays - remainPreviousMonthDays + 1
        for (let i=startDay; i<=previousMonthDays; i++){
            weekDates.push(new Date(year, month-1, i))
        }
        for (let i=1; i<=day+(6-weekDay); i++){
            weekDates.push(new Date(year, month, i))
        }
    } else if (monthDays-day+weekDay<6){
        for (let i=day-weekDay; i<day; i++){
            weekDates.push(new Date(year, month, i))
        }
        for (let i=day; i<=monthDays; i++){
            weekDates.push(new Date(year, month, i))
        }
        for (let i=1; i<=(6-(monthDays-day+weekDay)); i++){
            weekDates.push(new Date(year, month+1, i))
        }
    } else {
        for (let i=day-weekDay; i<day; i++){
            weekDates.push(new Date(year, month, i))
        }
        for (let i=day; i<=day+(6-weekDay); i++){
            weekDates.push(new Date(year, month, i))
        }
    }

    const getDayTasks = (day: number, month: number, year: number): Task[] => {
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


    return (
        <div className='week-container'>
            {/*{ modalIsOpen && <TaskModal year={year} month={month} day={day}/> }*/}
            <div className='time-slots-container'>
                <div className='time-slot'/>
                <div className='time-slot'>Notes: </div>
                {timeslots.map( timeslot => <div className='time-slot'>{timeslot}</div>)}
            </div>
            {weekDates.map((date, index) => {
                const day = date.getDate()
                const lengthData: number[] = []
                return (
                    <div className='day'>
                        <div className='day-header'>
                            <div>
                                {weekDays[index]}
                            </div>
                            <div>
                                {day}
                            </div>
                        </div>
                        <div className='time-slot'/>
                        {timeslots.map( timeslot => <div className='time-slot'/>)}
                        {
                            getDayTasks(day, date.getMonth(), date.getFullYear())
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
                                    let zindex = d
                                    if (isTaskCartAvailable.id === task.id && isTaskCartAvailable.isAvailable){
                                        zindex = 1000
                                    }

                                    const styleObject = {
                                        height: `${height}px`,
                                        top: `${startPosition}px`,
                                        left: `${d}px`,
                                        zIndex: zindex
                                    }


                                    return (
                                        <div>
                                            <div className='task' style={styleObject} onClick={() => {
                                                setIsTaskCartAvailable({
                                                    isAvailable: true,
                                                    id: task.id
                                                })
                                            }}
                                            >
                                                {task.title}
                                            </div>
                                            {
                                                isTaskCartAvailable.isAvailable &&
                                                task.id === isTaskCartAvailable.id &&
                                                <TaskCart
                                                    task={task}
                                                    column={1}
                                                    setIsTaskCartAvailable={setIsTaskCartAvailable}
                                                    deleteTask={deleteTask}
                                                />
                                            }
                                        </div>
                                    )
                                })
                        }
                    </div>
                )
            })}
            <div>
            </div>
        </div>
    )
}