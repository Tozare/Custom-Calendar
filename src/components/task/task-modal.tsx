import React, { useEffect, useState } from 'react'
import './task-modal.less'

type Props = {
    year: number,
    month: number,
    day: number,
    addTask: (task: Task) => void
}

export type Item = number

import { daysInMonth, years } from '../../../commons/calendar/constants'
import {Task, TasksManagement} from "../../../domain/calendar/tasks";
import {useObservable} from "../../../commons/react-hooks/use-observable";
import {DateInput} from "../test-components/date-input";
import {MonoTypeOperatorFunction} from "rxjs";

export const TaskModal = (props: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { year, month, day, addTask } = props;


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [ startYear, setStartYear ] = useState(year)
    const [ startMonth, setStartMonth ] = useState(month)
    const [ startDay, setStartDay ] = useState(day)
    const [ startHour, setStartHour] = useState(0)
    const [ startMinute, setStartMinute] = useState(0)

    const [ endYear, setEndYear ] = useState(year)
    const [ endMonth, setEndMonth ] = useState(month)
    const [ endDay, setEndDay ] = useState(day)
    const [ endHour, setEndHour] = useState(0)
    const [ endMinute, setEndMinute] = useState(0)

    const days = daysInMonth(year, month)

    const pickStartDate = (day: number, month: number, year: number) => {
        setStartDay(day)
        setStartMonth(month)
        setStartYear(year)
    }

    const changeStartHour = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hour = parseInt(e.target.value)
        if (hour <= 23 && hour >= 0){
            setStartHour(hour)
        } else if (!e.target.value){
            setStartHour(0)
        }
    }

    const changeStartMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minute = parseInt(e.target.value)
        if (minute <= 59 && minute >= 0){
            setStartMinute(minute)
        } else if (!e.target.value){
            setStartMinute(0)
        }
    }

    const pickEndDate = (day: number, month: number, year: number) => {
        setEndDay(day)
        setEndMonth(month)
        setEndYear(year)
    }

    const changeEndHour = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hour = parseInt(e.target.value)
        if (hour <= 23 && hour >= 0){
            setEndHour(hour)
        } else if (!e.target.value){
            setEndHour(0)
        }
    }

    const changeEndMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minute = parseInt(e.target.value)
        if (minute <= 59 && minute >= 0){
            setEndMinute(minute)
        } else if (!e.target.value){
            setEndMinute(0)
        }
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const submit = () => {
        const startTime: Date = new Date(startYear, startMonth, startDay, startHour, startMinute)
        const endTime: Date = new Date(endYear, endMonth, endDay, endHour, endMinute)
        const taskId = JSON.stringify({
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime
        })
        const task: Task = {
            id: taskId,
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime
        }
        setModalIsOpen(!modalIsOpen)
        addTask(task)
    }



    return (
        <div className='modal-container'>
            <div className='add_btn' onClick={() => setModalIsOpen(!modalIsOpen)}>Add task</div>
            {
                modalIsOpen &&
                <div className='modal'>
                    <div className='title'>
                        <input placeholder='title' value={title} onChange={changeTitle}/>
                    </div>
                    <div className='description'>
                        <input type='textarea' placeholder='description' value={description} onChange={changeDescription}/>
                    </div>
                    <div className='time-input-container'>
                        <div className='time-input'>
                            <div className='time-input-label'>Start time:</div>
                            <DateInput
                                initialDay={startDay}
                                initialMonth={startMonth}
                                initialYear={startYear}
                                pickDate={pickStartDate}
                            />
                            <input value={startHour} onChange={changeStartHour}/>
                            <input value={startMinute} onChange={changeStartMinute}/>
                        </div>
                        <div className='time-input'>
                            <div className='time-input-label'>End time:</div>
                            <DateInput
                                initialDay={endDay}
                                initialMonth={endMonth}
                                initialYear={endYear}
                                pickDate={pickEndDate}
                            />
                            <input value={endHour} onChange={changeEndHour}/>
                            <input value={endMinute} onChange={changeEndMinute}/>
                        </div>
                    </div>
                    <div className='modal-control'>
                        <a className='btn' onClick={() => setModalIsOpen(!modalIsOpen)}>Close</a>
                        <a className='btn' onClick={submit}>Submit</a>
                    </div>
                </div>
            }
            {
                modalIsOpen &&
                <div className='background'/>
            }
        </div>
    )
}