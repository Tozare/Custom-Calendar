export const years: number[] = []

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const timeslots = [
    '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
    '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'
]

export const daysInMonth = (month: number, year: number): number => {
    let date = new Date(year, month+1, 0);
    return date.getDate();
}

export const getDayNumberInWeek = (date: Date): number => {
    const weekDayNumber = date.getDay()
    if (weekDayNumber === 0){
        return 6
    } else {
        return (weekDayNumber-1)
    }
}