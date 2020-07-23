import React, {useState} from 'react'
import './date-input.less'
import {Month} from "../calendar/month";
import {months} from "../../../commons/calendar/constants";

type Props = {
    day: number,
    month: number,
    year: number,
    changeDay: (day: number) => void,
    changeMonth: (month: number) => void,
    changeYear: (year: number) => void
}

export const DateInput = (props: Props) => {
    const { day, month, year, changeDay, changeMonth, changeYear} = props
    const [monthIsAvailable, setMonthIsAvailable] = useState(false)

    const nextMonth = () => {
        if (month === 11){
            changeMonth(1)
            changeYear(year+1)
        } else {
            changeMonth(month+1)
        }
        changeDay(1)
    }

    const prevMonth = () => {
        if (month === 0){
            changeMonth(11)
            changeYear(year-1)
        } else {
            changeMonth(month-1)
        }
        changeDay(1)
    }

    const pickDay = (day: number) => {
        changeDay(day)
    }

    return (
        <div className='date-picker-container'>
            <div className='date-picker-header'>
                <div className='selected-date'>{day} / {month} / {year}</div>
                <div className='select-date' onClick={() => {setMonthIsAvailable(!monthIsAvailable)}}>pick date</div>
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