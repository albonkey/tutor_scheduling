import React from 'react';
import style from './HomeCalendar.module.scss';
import CalendarCard from '../CalendarCard/CalendarCard';

const HomeCalendar = ({schedule}) => {
    return(
        <div className = {style.wrapper}>
            <div>
                <div className= {style.heading2}>Calendar</div>
                <div className = {style.cards}>
                    {
                        schedule.map(schedule=>
                            <CalendarCard 
                                date = {schedule.date}
                                details = {schedule.appointment}
                                 />
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default HomeCalendar;