import React, {useState} from 'react'
import './tasks-list-in-month-day.less'
import {Task} from "../../../domain/calendar/tasks";
import {TaskInList} from "./task-in-list";

type TaskListCartAvailability = {
    isAvailable: boolean,
    day: number,
    month: number,
    year: number
}

export type TaskCartAvailability = {
    isAvailable: boolean,
    id: string
}

type Props = {
    tasks: Task[],
    day: number,
    month: number,
    year: number,
    rows: number,
    row: number,
    column: number,
    isTasksListAvailable: TaskListCartAvailability,
    setIsTasksListCartAvailable: (taskListCartAvailability: TaskListCartAvailability) => void,
    isTaskCartAvailable: TaskCartAvailability,
    setIsTaskCartAvailable: (taskCartAvailability: TaskCartAvailability) => void,
    deleteTask: (task: Task) => void,
}


export const TasksListInMonthDay = (props: Props) => {
    const { tasks, day, month, year, rows, row, column, setIsTasksListCartAvailable, isTasksListAvailable, isTaskCartAvailable, setIsTaskCartAvailable, deleteTask } = props

    const showTasksList =
        isTasksListAvailable.isAvailable &&
        month === isTasksListAvailable.month &&
        day === isTasksListAvailable.day &&
        year === isTasksListAvailable.year

        let styleCart = {
        width: 'calc((100% / 7)/10 + (100% / 7))',
        left: `calc((100% / 7) * ${column - 1} - (100% / 7)/20)`,
        top: '',
        bottom: '',
        right: ''
    }
    if (rows === 6){
        if (row === 1){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/5)`
        } else if (row === 2){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/4)`
        } else if (row === 3){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/2)`
        } else if (row === 4){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/2)`
        } else if (row === 5){
            styleCart.bottom = `calc(60px + ((100% - 60px)/${rows})*${row} - ((100% - 60px)/${rows})/5)`
            styleCart.top = ''
        } else {
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row} - ((100% - 60px)/${rows})/4)`
            styleCart.top = ''
        }
    } else {
        if (row === 1){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/5)`
        } else if (row === 2){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/4)`
        } else if (row === 3){
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row - 1} - ((100% - 60px)/${rows})/2)`
        } else if (row === 4){
            styleCart.bottom = `calc(60px + ((100% - 60px)/${rows})*${row} - ((100% - 60px)/${rows})/5)`
        } else {
            styleCart.top = `calc(60px + ((100% - 60px)/${rows})*${row} - ((100% - 60px)/${rows})/4)`
        }
    }

    if (column === 1){
        styleCart.left = `calc((100% / 7) * ${column - 1} + (100% / 7)/20)`
    } else if (column === 7){
        styleCart.left = `calc((100% / 7) * ${column - 1} - (100% / 7)/7)`
    }
    return (
        <div className='tasks-list-container'>
            {
                tasks.length <= 3 ?
                    <div className='tasks-list'>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <TaskInList isTaskCartAvailable={isTaskCartAvailable} setIsTaskCartAvailable={setIsTaskCartAvailable} task={task} column={0} deleteTask={deleteTask}/>
                                )
                            })
                        }
                    </div>
                    :
                    <div className='tasks-list'>
                        <TaskInList deleteTask={deleteTask} isTaskCartAvailable={isTaskCartAvailable} setIsTaskCartAvailable={setIsTaskCartAvailable} task={tasks[0]} column={0}/>
                        <TaskInList deleteTask={deleteTask} isTaskCartAvailable={isTaskCartAvailable} setIsTaskCartAvailable={setIsTaskCartAvailable} task={tasks[1]} column={0}/>
                        <TaskInList deleteTask={deleteTask} isTaskCartAvailable={isTaskCartAvailable} setIsTaskCartAvailable={setIsTaskCartAvailable} task={tasks[2]} column={0}/>
                        <div className='show-tasks-btn' onClick={() => {
                            setIsTasksListCartAvailable({
                                isAvailable: true,
                                month: month,
                                year: year,
                                day: day
                            })
                        }}>More {tasks.length-3}</div>
                    </div>
            }
            {
                (showTasksList && tasks.length > 3) &&
               <div className='tasks-list-cart' style={styleCart}>
                   <h1>{column}</h1>
                   <div onClick={() => setIsTasksListCartAvailable({
                       isAvailable: false,
                       month: month,
                       year: year,
                       day: day
                   })} className='close-btn'>close</div>
                   {
                       tasks.map((task, index) => {
                           return (
                               <TaskInList deleteTask={deleteTask} isTaskCartAvailable={isTaskCartAvailable} setIsTaskCartAvailable={setIsTaskCartAvailable} task={task} column={0}/>
                           )
                       })
                   }
               </div>
            }
        </div>
    )
}