import React, {useState} from 'react'
import './event-edit.less'
import {StateData, Task} from "../../../domain/calendar/tasks";
import {DateInput} from "../test-components/date-input";
import {useHistory, useParams} from "react-router";

type Props = {
    tasksData: StateData | undefined,
    modifyTask: (task: Task) => void
}


export const EventEdit = (props: Props) => {
    const { tasksData, modifyTask } = props
    const { eventId } = useParams()
    const history = useHistory()

    const task: Task | undefined = tasksData !== undefined ? tasksData.tasks.find( task => task.id === eventId) : undefined

    if (task === undefined){
        return <h1>404</h1>
    }

    task.startTime = new Date(task.startTime)
    task.endTime = new Date(task.endTime)


    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    const [ startYear, setStartYear ] = useState(task.startTime.getFullYear())
    const [ startMonth, setStartMonth ] = useState(task.startTime.getMonth())
    const [ startDay, setStartDay ] = useState(task.startTime.getDate())
    const [ startHour, setStartHour] = useState(task.startTime.getHours())
    const [ startMinute, setStartMinute] = useState(task.startTime.getMinutes())

    const [ endYear, setEndYear ] = useState(task.endTime.getFullYear())
    const [ endMonth, setEndMonth ] = useState(task.endTime.getMonth())
    const [ endDay, setEndDay ] = useState(task.endTime.getDate())
    const [ endHour, setEndHour] = useState(task.endTime.getHours())
    const [ endMinute, setEndMinute] = useState(task.endTime.getMinutes())

    const pickStartDate = (newStartYear: number, newStartMonth: number, newStartDay: number) => {
        setStartYear(newStartYear)
        setStartMonth(newStartMonth)
        setStartDay(newStartDay)
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

    const pickEndDate = (newEndYear: number, newEndMonth: number, newEndDay: number) => {
        setEndYear(newEndYear)
        setEndMonth(newEndMonth)
        setEndDay(newEndDay)
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
        // const taskId = JSON.stringify({
        //     title: title,
        //     description: description,
        //     startTime: startTime,
        //     endTime: endTime
        // })
        const modifiedTask: Task = {
            id: task.id,
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime
        }
        modifyTask(modifiedTask)
        history.goBack()
    }


    return (
        <div className='event-edit-container'>
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
                <div className='btn' onClick={() => history.goBack()}>Close</div>
                <div className='btn' onClick={ submit }>Edit</div>
            </div>
        </div>
    )
}