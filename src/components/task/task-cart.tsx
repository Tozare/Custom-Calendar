import React, {useState} from 'react'
import './task-cart.less'
import {Task} from "../../../domain/calendar/tasks";
import {getDayNumberInWeek, months, weekDays} from "../../../commons/calendar/constants";
import {TaskCartAvailability} from "./tasks-list-in-month-day";
import {IsModifyTaskCartAvailable} from "../calendar/week";
import {useHistory, useRouteMatch} from "react-router";

type Props = {
    task: Task,
    column: number,
    setIsTaskCartAvailable: (isTaskCartAvailability: TaskCartAvailability) => void,
    deleteTask: (task: Task) => void,
}

export const TaskCart = (props: Props) => {
    const { task, column, setIsTaskCartAvailable, deleteTask } = props
    let { url } = useRouteMatch()
    const history = useHistory()

    console.log(url)

    task.startTime = new Date(task.startTime)
    task.endTime = new Date(task.endTime)

    const startWeekDay = weekDays[getDayNumberInWeek(task.startTime)]
    const isDaysEqual =
        task.startTime.getDate() === task.endTime.getDate() &&
        task.startTime.getMonth() === task.endTime.getMonth() &&
        task.startTime.getFullYear() === task.endTime.getFullYear()


    const startDay = task.startTime.getDate()
    const startMonth = months[task.startTime.getMonth()]
    const startYear = task.startTime.getFullYear()
    const startTime = `${task.startTime.getHours()}:${task.startTime.getMinutes()}`

    const endDay = task.endTime.getDate()
    const endMonth = months[task.endTime.getMonth()]
    const endYear = task.endTime.getFullYear()
    const endTime = `${task.endTime.getHours()}:${task.endTime.getMinutes()}`

    const styleTaskCart = {
        top: 'calc((100% - 220px)/2)',
        left: 'calc((100% - 448px)/2)'
    }

    const deleteTaskAndCloseTaskCart = (task: Task) => {
        deleteTask(task)
        setIsTaskCartAvailable({
            isAvailable: false,
            id: 'none'
        })
    }

    const openEditEventPage = () => {
        history.push(`${url}/eventedit/${task.id}`)
    }
    return (

        <div className='task-cart-container' style={styleTaskCart}>
            <div className='task-cart-header'>
                <div onClick={() => openEditEventPage()}>modify</div>
                <div onClick={() => deleteTaskAndCloseTaskCart(task)}>delete</div>
                <div onClick={() => setIsTaskCartAvailable({
                    isAvailable: false,
                    id: task.id
                })}>close</div>
            </div>
            <div className='task-cart-title-and-date'>
                <div className='date-type'>IMG</div>
                <div className='title-and-date'>
                    <div className='title'>{task.title}</div>
                    {
                        isDaysEqual ?
                            <div className='date'>
                                {startWeekDay}, {startDay} {startMonth} : {startTime}-{endTime}
                            </div>
                            :
                            <div className='date'>
                                {startDay} {startMonth} {startYear}, {startTime} - {endDay} {endMonth} {endYear}, {endTime}
                            </div>
                    }
                </div>
            </div>
            <div className='task-cart-description'>
                <div className='description-type'>IMG</div>
                <div className='description'>{task.description}</div>
            </div>
        </div>
    )
}