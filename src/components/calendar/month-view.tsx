import React from 'react'
import './month-view.less'
import {StateData, Task, TasksManagement} from "../../../domain/calendar/tasks";
import {useObservable} from "../../../commons/react-hooks/use-observable";
import {TasksListInMonthDay} from "./tasks-list-in-month-day";

type Props = {
    month: number,
    year: number
}

export const MonthView = (props: Props) => {
    const { month, year } = props

    const tasksManagement = new TasksManagement()
    const tasksData = useObservable<StateData | undefined>(tasksManagement.tasksObservable, tasksManagement.stateData)

    const daysInMonth = (month: number, year: number): number => {
        let date = new Date(year, month+1, 0);
        return date.getDate();
    }

    const numberOfDays = daysInMonth(month, year)

    const emptyDate = new Date(year, month, 0)
    const emptyDays: number = emptyDate.getDay()


    let countBoxes = 0
    const render = []
    for (let i=0; i<=emptyDays; i++){
        render.push(<div className='emptyDay'/>)
        countBoxes++
    }

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

    for (let i=0; i<numberOfDays; i++){
        countBoxes++
    }

    const rows = countBoxes % 7 === 0 ? Math.floor(countBoxes / 7) : Math.floor(countBoxes / 7) + 1
    countBoxes-=numberOfDays

    for (let i=0; i<numberOfDays; i++){
        countBoxes++
        let row = countBoxes % 7 === 0 ? Math.floor(countBoxes / 7) : Math.floor(countBoxes / 7) + 1
        const dayTasks = getDayTasks(i+1)
            .sort((a,b)=> (a.startTime.getTime()>b.startTime.getTime()) ? 1 : (a.startTime.getTime()===b.startTime.getTime() ? ((a.endTime.getTime()<b.endTime.getTime()) ? 1 : -1) :-1 ))
        render.push(
            <div className='day'>
                <div className='day-number'>{i+1}</div>
                <TasksListInMonthDay tasks={dayTasks} day={i+1} month={month} year={year} rows={rows} row={row} column={1}/>
            </div>
        )
    }

    const lastDate = new Date(year, month+1, 1);
    const lastDay = lastDate.getDay()
    if (lastDay!=0){
        for (let i=lastDay; i<=6; i++){
            render.push(<div className='emptyDay'/>)
            countBoxes++
        }
    }

    let styleMonthBody = {
        gridTemplateRows: '20% 20% 20% 20% 20%'
    }
    if (countBoxes == 42){
        styleMonthBody = {
            gridTemplateRows: '16.67% 16.67% 16.67% 16.67% 16.67%'
        }
    }

    const addTask = (task: Task) => {
        tasksManagement.addTask(task)
    }

    return (
        <div className='month-calendar-type-container'>
            <div className='month-calendar-type-header'>
                <div className='day-title'>Mn</div>
                <div className='day-title'>Ts</div>
                <div className='day-title'>Wed</div>
                <div className='day-title'>Thr</div>
                <div className='day-title'>Fr</div>
                <div className='day-title'>Sat</div>
                <div className='day-title'>Sun</div>
            </div>
            <div className='month-calendar-type-body' style={styleMonthBody}>
                {render}
            </div>
        </div>
    )
}