import React from 'react';
import style from './CalendarCard.module.scss';

const CalendarCard = ({date, details}) => {
    return(
          <div className={style.card}>
            <div className = {style.header}>
                <div className={style.date}>
                    {date}
                </div>
            <div>
                <div className = {style.cardbody}>
                {
                    details.map(detail=> {
                        return(
                            detail.isTeaching ?
                                 <div className = {style.day}>{detail.time} Teaching {detail.subject} with {detail.name}</div>
                            :
                                <div className = {style.day}>{detail.time} Session with {detail.name}</div>
                        )
                    })
                }
                </div>
                </div>
                </div>
            </div>
    )
}

export default CalendarCard;