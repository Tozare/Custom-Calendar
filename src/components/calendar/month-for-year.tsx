import React from 'react'
import './month.less'
import {getDayNumberInWeek} from "../../../commons/calendar/constants";

type Props = {
    month: number,
    year: number
}

export const MonthForYear = (props: Props) => {
    const { month, year } = props

    const daysInMonth = (month: number, year: number): number => {
        let date = new Date(year, month+1, 0);
        return date.getDate();
    }

    const numberOfDays = daysInMonth(month, year)

    const emptyDate = new Date(year, month, 0)
    const emptyDays: number = emptyDate.getDay()

    let rows = 0

    const render = []
    for (let i=0; i<emptyDays; i++){
        render.push(<div className='emptyDay'></div>)
        rows++
    }
    for (let i=0; i<numberOfDays; i++){
        render.push(<div className='day'>{i+1}</div>)
        rows++
    }

    const lastDate = new Date(year, month+1, 1);
    const lastDay = getDayNumberInWeek(lastDate)
    if (lastDay !== 0){
        for (let i=lastDay; i<=6; i++){
            render.push(<div className='emptyDay'></div>)
            rows++
        }
        // if (rows == 35){
        //     for (let i=0; i<=6; i++){
        //         render.push(<div className='emptyDay'></div>)
        //         rows++
        //     }
        // }
    } else if (rows == 35){
        // for (let i=0; i<=6; i++){
        //     render.push(<div className='emptyDay'></div>)
        //     rows++
        // }
    }


    return (
        <div className='month-container'>
            <div className='dayTitle'>Mn</div>
            <div className='dayTitle'>Ts</div>
            <div className='dayTitle'>Wed</div>
            <div className='dayTitle'>Thr</div>
            <div className='dayTitle'>Fr</div>
            <div className='dayTitle'>Sat</div>
            <div className='dayTitle'>Sun</div>
            {render}
        </div>
    )
}