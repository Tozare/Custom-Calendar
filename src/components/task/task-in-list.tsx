import React, {useState} from 'react'
import {Task} from "../../../domain/calendar/tasks";
import {TaskCart} from "./task-cart";
import './task-in-list.less'
import {TaskCartAvailability} from "./tasks-list-in-month-day";

type Props = {
    task: Task,
    column: number,
    isTaskCartAvailable: TaskCartAvailability,
    setIsTaskCartAvailable: (taskCartAvailability: TaskCartAvailability) => void,
    deleteTask: (task: Task) => void,
}

export const TaskInList = (props: Props) => {
    const { task, column, isTaskCartAvailable, setIsTaskCartAvailable, deleteTask } = props
    const showTaskCart = isTaskCartAvailable.isAvailable && isTaskCartAvailable.id === task.id

    return (
        <div>
            <div className='task-in-list' onClick={() => setIsTaskCartAvailable({
                isAvailable: true,
                id: task.id
            })}>
                {task.title}
            </div>
            {
                showTaskCart && <TaskCart
                    task={task}
                    column={column}
                    setIsTaskCartAvailable={setIsTaskCartAvailable}
                    deleteTask={deleteTask}
                    />
            }
        </div>
    )
}