// import React from 'react'
// import {TaskModal} from "../task/task-modal";
// import {DateInput} from "../test-components/date-input";
// import {ListInput} from "../test-components/list-input";
//
// type Props = {
//     year: number,
//     month: number,
//     day: number,
// }
//
// export const Navbar = () => {
//
//
//
//     return (
//         <div className='calendar-navbar'>
//             <TaskModal year={year} month={month} day={day} addTask={addTask}/>
//             <div className='today_btn' onClick={today}>Today</div>
//             <div className='pick-week'>
//                 <div className='pick-prev-week' onClick={prev}>{'<'}</div>
//                 <div className='pick-next-week' onClick={next}>{'>'}</div>
//             </div>
//             <div className='pick-date'>
//                 <DateInput
//                     initialDay={day}
//                     initialMonth={month}
//                     initialYear={year}
//                     pickDate={pickDate}
//                 />
//             </div>
//             <div>
//                 <ListInput pickItem={setCalendarType} items={calendarTypes} pickedItem={calendarType}/>
//             </div>
//         </div>
//     )
// }