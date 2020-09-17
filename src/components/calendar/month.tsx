import React from 'react'
import './month.less'

type Props = {
    month: number,
    year: number,
    day: number,
    pickDay: (day: number) => void
}

export const Month = (props: Props) => {
    const { month, year, day, pickDay } = props

    const daysInMonth = (month: number, year: number): number => {
        let date = new Date(year, month+1, 0);
        return date.getDate();
    }

    const numberOfDays = daysInMonth(month, year)

    const emptyDate = new Date(year, month, 0)
    const emptyDays: number = emptyDate.getDay()

    const render = []
    for (let i=0; i<=emptyDays; i++){
        render.push(<div className='emptyDay'></div>)
    }
    for (let i=0; i<numberOfDays; i++){
        render.push(<div className='day' onClick={() => pickDay(i+1)}>{i+1}</div>)
    }

    const lastDate = new Date(year, month+1, 1);
    const lastDay = lastDate.getDay()
    if (lastDay!=0){
        for (let i=lastDay; i<=6; i++){
            render.push(<div className='emptyDay'></div>)
        }
    }


    return (
        <div className='month-container'>
            <div className='dayTitle'>Mn</div>
            <div className='dayTitle'>Tue</div>
            <div className='dayTitle'>Wed</div>
            <div className='dayTitle'>Thr</div>
            <div className='dayTitle'>Fr</div>
            <div className='dayTitle'>Sat</div>
            <div className='dayTitle'>Sun</div>
            {render}
        </div>
    )
}