import React, {useEffect, useState} from 'react'
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
import {TaskModal} from "../task/task-modal";
import {Redirect, Route, Switch, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {Month} from "../calendar/month";
import {EventEdit} from "./event-edit";


const calendarTypes = ['day', 'week', 'month', 'year']

export const Calendar = () => {
    //TODO: initial value of calendarType
    const [calendarType, setCalendarType] = useState('week')
    const history = useHistory()

    let { yearParam, monthParam, dayParam} = useParams()
    const year: number = parseInt(yearParam)
    const month: number = parseInt(monthParam)
    const day: number= parseInt(dayParam)

    const tasksManagement = new TasksManagement()
    const tasksData = useObservable<StateData | undefined>(tasksManagement.tasksObservable, tasksManagement.stateData)

    const addTask = (task: Task) => {
        tasksManagement.addTask(task)
    }
    const pickDate = (newDay: number, newMonth: number, newYear: number) => {
        history.push(`/${calendarType}/${newYear}/${newMonth}/${newDay}`)
    }
    const modifyTask = (task: Task) => {
        tasksManagement.modifyTask(task)
    }
    const deleteTask = (task: Task) => {
        tasksManagement.deleteTask(task)
    }

    const today = () => {
        const todayDate = new Date()
        history.push(`/${calendarType}/${todayDate.getFullYear()}/${todayDate.getMonth()}/${todayDate.getDate()}`)
    }

    const next = () => {
        const thisMonthDaysAmount = daysInMonth(month, year)
        if (calendarType === 'week'){
            if (day + 7 > thisMonthDaysAmount){
                const nextDay = (7 - (thisMonthDaysAmount - day))
                const nextMonth = month === 11 ? 0 : month + 1
                const nextYear = month === 11 ? year + 1 : year
                history.push(`/week/${nextYear}/${nextMonth}/${nextDay}`)
            } else {
                const nextDay = day + 7
                const nextMonth = month
                const nextYear = year
                history.push(`/week/${nextYear}/${nextMonth}/${nextDay}`)
            }
        } else if (calendarType === 'day'){
            if (day + 1 > thisMonthDaysAmount){
                const nextDay = 1
                const nextMonth = month === 11 ? 0 : month + 1
                const nextYear = month === 1 ? year + 1 : year
                history.push(`/day/${nextYear}/${nextMonth}/${nextDay}`)
            } else {
                const nextDay = day + 1
                const nextMonth = month
                const nextYear = year
                history.push(`/day/${nextYear}/${nextMonth}/${nextDay}`)
            }
        } else if (calendarType === 'month'){
            const nextDay = 1
            const nextMonth = month === 11 ? 0 : month + 1
            const nextYear = month === 11 ? year + 1 : year
            history.push(`/month/${nextYear}/${nextMonth}/${nextDay}`)
        }
    }

    const prev = () => {
        const prevMonthDaysAmount = daysInMonth(month-1, year)
        if (calendarType === 'week'){
            if (day - 7 < 1){
                const prevDay = prevMonthDaysAmount - (7 - day)
                const prevMonth = month === 0 ? 11 : month - 1
                const prevYear = month === 0 ? year -1 : year
                history.push(`/week/${prevYear}/${prevMonth}/${prevDay}`)
            } else {
                const prevDay = day - 7
                const prevMonth = month
                const prevYear = year
                history.push(`/week/${prevYear}/${prevMonth}/${prevDay}`)
            }
        } else if (calendarType === 'day'){
            if (day === 1){
                const prevDay = prevMonthDaysAmount
                const prevMonth = month === 0 ? 11 : month - 1
                const prevYear = month === 0 ? year - 1 : year
                history.push(`/day/${prevYear}/${prevMonth}/${prevDay}`)
            } else {
                const prevDay = day - 1
                const prevMonth = month
                const prevYear = year
                history.push(`/day/${prevYear}/${prevMonth}/${prevDay}`)
            }
        } else if (calendarType === 'month'){
            const prevDay = 1
            const prevMonth = month === 0 ? 11 : month - 1
            const prevYear = month === 0 ? year - 1 : year
            history.push(`/month/${prevYear}/${prevMonth}/${prevDay}`)
        }
    }

    const d = new Date(year, month+1, 0)

    const yearParamRegex = '([1-9][0-9][0-9][0-9])'
    const monthParamRegex = '([0-9]|10|11)'
    const dayParamRegex = `([1-9]|1[0-9]|2[0-9]|${d.getDate()-1}|${d.getDate()})`

    //TODO: make NavBar and add it to the react router
    return (
        <div className='calendar-container'>
            <Route exact path='/(week|month|year|day)/:yearParam/:monthParam/:dayParam/'>
                <div className='calendar-navbar'>
                    <TaskModal year={year} month={month} day={day} addTask={addTask}/>
                    <div className='today_btn' onClick={today}>Today</div>
                    <div className='pick-week'>
                        <div className='pick-prev-week' onClick={prev}>{'<'}</div>
                        <div className='pick-next-week' onClick={next}>{'>'}</div>
                    </div>
                    <div className='pick-date'>
                        <DateInput
                            initialDay={day}
                            initialMonth={month}
                            initialYear={year}
                            pickDate={pickDate}
                        />
                    </div>
                    <div>
                        <ListInput pickItem={setCalendarType} items={calendarTypes} pickedItem={calendarType}/>
                    </div>
                </div>
            </Route>
            <Switch>
                <Route path={`/(day|week|month|year)/:yearParam/:monthParam/:dayParam/eventedit/:eventId`}>
                    <EventEdit
                        tasksData={tasksData}
                        modifyTask={modifyTask}
                    />
                </Route>
                <Route path='/day/:yearParam/:monthParam/:dayParam'>
                    <Day
                        day={day}
                        month={month}
                        year={year}
                        tasksData={tasksData}
                        deleteTask={deleteTask}
                    />
                </Route>
                <Route path={`/week/:yearParam/:monthParam/:dayParam`}>
                    <Week
                        day={day}
                        month={month}
                        year={year}
                        tasksData={tasksData}
                        deleteTask={deleteTask}
                    />
                </Route>
                <Route path={`/month/:yearParam/:monthParam/:dayParam`}>
                    <MonthView
                        day={day}
                        month={month}
                        year={year}
                        tasksData={tasksData}
                        deleteTask={deleteTask}
                    />
                </Route>
            </Switch>
        </div>
    )
}