import React from 'react'
import './task-cart.less'
import {Task} from "../../../domain/calendar/tasks";
import {getDayNumberInWeek, months, weekDays} from "../../../commons/calendar/constants";

type Props = {
    task: Task,
    column: number
}

export const TaskCart = (props: Props) => {
    const { task, column} = props

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

    return (
        <div className='task-cart-container'>
            <div className='task-cart-header'>
                <div>mofidy</div>
                <div>delete</div>
                <div>close</div>
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