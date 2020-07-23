import React, {useState} from 'react'
import './tasks-list-in-month-day.less'
import {Task} from "../../../domain/calendar/tasks";

type Props = {
    tasks: Task[],
    day: number,
    month: number,
    year: number,
    rows: number,
    row: number,
    column: number
}

export const TasksListInMonthDay = (props: Props) => {
    const { tasks, day, month, year, rows, row, column } = props
    const [isTasksListAvailable, setIsTasksListAvailable] = useState(false)
    let styleCart
    if (rows === 6){
        if (row === 1){
            styleCart = { top: '-20px' }
        } else if (row === 2){
            styleCart = { top: '-30px' }
        } else if (row === 3){
            styleCart = { top: '-30px' }
        } else if (row === 4){
            styleCart = { bottom: '-20px' }
        } else if (row === 5){
            styleCart = { bottom: '-20px' }
        } else {
            styleCart = { bottom: '10px' }
        }
    } else {
        if (row === 1){
            styleCart = { top: '-20px' }
        } else if (row === 2){
            styleCart = { top: '-30px' }
        } else if (row === 3){
            styleCart = { top: '-60%' }
        } else if (row === 4){
            styleCart = { bottom: '-20px' }
        } else {
            styleCart = { bottom: '-20px' }
        }
    }

    return (
        <div className='tasks-list-container'>
            {
                tasks.length <= 3 ?
                    <div className='tasks-list'>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <div className='task'>{task.title}</div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className='tasks-list'>
                        <div className='task'>{tasks[0].title}</div>
                        <div className='task'>{tasks[1].title}</div>
                        <div className='task'>{tasks[2].title}</div>
                        <div className='show-tasks-btn' onClick={() => {
                            console.log(rows)
                            console.log(row)
                            setIsTasksListAvailable(true)
                        }}>More {tasks.length-3}</div>
                    </div>
            }
            {
                (isTasksListAvailable && tasks.length > 3) &&
               <div className='tasks-list-cart' style={styleCart}>
                   <a onClick={() => setIsTasksListAvailable(false)}>close</a>
                   {
                       tasks.map((task, index) => {
                           return (
                               <div className='task'>{task.title}</div>
                           )
                       })
                   }
                   {
                       tasks.map((task, index) => {
                           return (
                               <div className='task'>{task.title}</div>
                           )
                       })
                   }
                   {
                       tasks.map((task, index) => {
                           return (
                               <div className='task'>{task.title}</div>
                           )
                       })
                   }
                   {
                       tasks.map((task, index) => {
                           return (
                               <div className='task'>{task.title}</div>
                           )
                       })
                   }
               </div>
            }
        </div>
    )
}