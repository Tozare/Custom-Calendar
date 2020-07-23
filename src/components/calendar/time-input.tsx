import React, {SyntheticEvent, useState} from 'react'
import './time-input.less'

type Props = {
    hour: number,
    minute: number
    setHour: (hour: number) => void,
    setMinute: (minute: number) => void
}

export const TimeInput = (props: Props) => {
    const { hour, minute, setHour, setMinute } = props
    const [ time, setTime ] = useState(0)
    const increaseHour = () => {
        if (hour === 23){
            setHour(0)
        } else {
            setHour(hour+1)
        }
    }

    const decreaseHour = () => {
        if (hour === 0){
            setHour(23)
        } else {
            setHour(hour-1)
        }
    }

    const increaseMinute = () => {
        if (minute === 59){
            setMinute(0)
        } else {
            setMinute(minute+1)
        }
    }

    const decreaseMinute = () => {
        if (minute === 0){
            setMinute(59)
        } else {
            setMinute(minute-1)
        }
    }

    const displayMinute = (): string => {
        if (minute<=9){
            return `0${minute}`
        } else {
            return `${minute}`
        }
    }

    const displayHour = (): string => {
        if (hour<=9){
            return `0${hour}`
        } else {
            return `${hour}`
        }
    }

    const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value) <= 23 && parseInt(e.target.value) >= 0){
            setTime(parseInt(e.target.value))
        }
    }

    return (
        <div className='time-input-container'>
            <input value={time} onChange={changeTime} />
            <div className='hour-container'>
                <div className='hour'>{displayHour()}</div>
                <div className='btn-container'>
                    <a className='btn' onClick={increaseHour}>+</a>
                    <a className='btn' onClick={decreaseHour}>-</a>
                </div>
            </div>
            <div className='minute-container'>
                <div className='minute'>{displayMinute()}</div>
                <div className='btn-container'>
                    <a className='btn' onClick={increaseMinute}>+</a>
                    <a className='btn' onClick={decreaseMinute}>-</a>
                </div>
            </div>
        </div>
    )
}