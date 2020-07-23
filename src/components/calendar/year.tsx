import React from 'react'
import {months} from "../../../commons/calendar/constants";
import {Month} from "./month";
import {MonthView} from "./month-view";

import './year.less'
import {MonthForYear} from "./month-for-year";

type Props = {
    year: number
}

export const Year = (props: Props) => {
    const { year } = props

    return (
        <div className='year-calendar-type-container'>
            {
                months.map((monthName, index) => {
                    return (
                        <div className='month-in-year'>
                            <MonthForYear month={index} year={year}/>
                        </div>
                    )
                })
            }
        </div>
    )
}