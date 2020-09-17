import React, {useEffect, useState} from 'react'
import './date-input.less'
import {Month} from "../calendar/month";
import {months} from "../../../commons/calendar/constants";

type Props = {
    initialDay: number,
    initialMonth: number,
    initialYear: number,
    pickDate: (day: number, month: number, year: number) => void
}

export const DateInput = (props: Props) => {
    const { initialDay, initialMonth, initialYear, pickDate } = props
    const [monthIsAvailable, setMonthIsAvailable] = useState(false)

    // const [day, setDay] = useState(initialDay)
    // const [month, setMonth] = useState(initialMonth)
    // const [year, setYear] = useState(initialYear)

    let day = initialDay
    let month = initialMonth
    let year = initialYear

    const nextMonth = () => {
        if (month === 11){
            // setMonth(0)
            // setYear(year+1)
            month = 0
            year = year + 1
        } else {
            // setMonth(month + 1)
            month = month + 1
        }
    }

    const prevMonth = () => {
        if (month === 0){
            // setMonth(11)
            // setYear(year-1)
            month = 11
            year = year - 1
        } else {
            // setMonth(month-1)
            month = month - 1
        }
    }

    const pickDay = (newDay: number) => {
        // setDay(newDay)
        day = newDay
        pickDate(newDay, month, year)
        setMonthIsAvailable(false)
    }
    const close = () => {
        setMonthIsAvailable(!monthIsAvailable)
        // setDay(initialDay)
        // setMonth(initialMonth)
        // setYear(initialYear)
    }
    return (
        <div className='date-picker-container'>
            <div className='date-picker-header'>
                <div className='selected-date'>{day} / {month} / {year}</div>
                <div className='select-date' onClick={close}>{'>'}</div>
            </div>
            {
                monthIsAvailable ?
                    <div className='date-picker-body'>
                        <div className='pick-month'>
                            <div className='pick-prev-month' onClick={prevMonth}>{'<'}</div>
                            <div className='picked-month'>{months[month]}</div>
                            <div className='pick-next-month' onClick={nextMonth}>{'>'}</div>
                        </div>
                        <div className='month'>
                            <Month month={month} year={year} day={day} pickDay={pickDay}/>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}