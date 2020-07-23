import React, {useState} from 'react'
import {Week} from "../calendar/week";
import {MonthView} from "../calendar/month-view";
import './calendar.less'
import {daysInMonth, months} from "../../../commons/calendar/constants";
import {DateInput} from "../test-components/date-input";
import {Day} from "../calendar/day";
import {StateData, Task, TasksManagement} from "../../../domain/calendar/tasks";
import {useObservable} from "../../../commons/react-hooks/use-observable";
import {ListInput} from "../test-components/list-input";
import {Year} from "../calendar/year";


const calendarTypes = ['day', 'week', 'month', 'year']

export const Calendar = () => {

    const [calendarType, setCalendarType] = useState('month')
    const date = new Date()
    
    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth())
    const [year, setYear] = useState(date.getFullYear())

    //TODO: вынести tasksManagement на уровень CalendarPage
    
    let calendar = <Week day={day} month={month} year={year}/>
    if (calendarType === 'day'){
        calendar = <Day day={day} month={month} year={year}/>
    } else if (calendarType === 'week'){
        calendar = <Week day={day} month={month} year={year}/>
    } else if (calendarType === 'month'){
        calendar = <MonthView month={month} year={year}/>
    } else {
        calendar = <Year year={year}/>
    }


    // const getDayTasks = (day: number): Task[] => {
    //     if (tasksData && tasksData.tasks){
    //         return tasksData.tasks.filter(task => {
    //             task.startTime = new Date(task.startTime)
    //             task.endTime = new Date(task.endTime)
    //             return (
    //                 task.startTime.getDate() === day &&
    //                 task.startTime.getMonth() === month &&
    //                 task.startTime.getFullYear() === year
    //             )
    //         })
    //     } else {
    //         return []
    //     }
    // }

    const today = () => {
        const todayDate = new Date()
        setDay(todayDate.getDate())
        setMonth(todayDate.getMonth())
        setYear(todayDate.getFullYear())
    }

    const next = () => {
        const date = new Date(year, month, day)
        const thisMonthDaysAmount = daysInMonth(month, year)
        if (calendarType === 'week'){
            const weekDay = date.getDay()
            if (day + 7 > thisMonthDaysAmount){
                const nextWeekDay = (7 - (thisMonthDaysAmount - day))
                setDay(nextWeekDay)
                setMonth(month + 1)
            } else {
                const nextWeekDay = day + 7
                setDay(nextWeekDay)
            }
        } else if (calendarType === 'day'){
            if (day + 1 > thisMonthDaysAmount){
                setDay(1)
                setMonth(month + 1)
            } else {
                setDay(day + 1)
            }
        } else if (calendarType === 'month'){
            setMonth(month+1)
        }
    }

    const prev = () => {
        const date = new Date(year, month, day)
        const prevMonthDaysAmount = daysInMonth(month-1, year)
        if (calendarType === 'week'){
            const weekDay = date.getDay()
            if (day - 7 < 1){
                const prevWeekDay = prevMonthDaysAmount - (7 - day)
                setDay(prevWeekDay)
                setMonth(month-1)
            } else {
                const prevWeekDay = day - 7
                setDay(prevWeekDay)
            }
        } else if (calendarType === 'day'){
            if (day === 1){
                setDay(prevMonthDaysAmount)
                setMonth(month - 1)
            } else {
                setDay(day - 1)
            }
        } else if (calendarType === 'month'){
            setMonth(month - 1)
        }
    }

    return (
        <div className='calendar-container'>
            <div className='calendar-header'>
                <div className='btn' onClick={today}>Today</div>
                <div className='pick-week'>
                    <div className='pick-prev-week' onClick={prev}>{'<'}</div>
                    <div className='pick-next-week' onClick={next}>{'>'}</div>
                </div>
                <div className='pick-date'><DateInput 
                    day={day} 
                    month={month} 
                    year={year} 
                    changeDay={setDay} 
                    changeMonth={setMonth} 
                    changeYear={setYear}/>
                </div>
                <div>
                    <ListInput pickItem={setCalendarType} items={calendarTypes} pickedItem={calendarType}/>
                </div>
            </div>
            <div className='calendar-body'>
                {calendar}
                {/*<Week day={day} month={month} year={year}/>*/}
            </div>
            {/*<Week month={6} year={2020} day={3}/>*/}
        </div>
        // {calendar}
    )
}