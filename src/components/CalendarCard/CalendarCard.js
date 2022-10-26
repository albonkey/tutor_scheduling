import React from 'react';
import style from './CalendarCard.module.scss';

const CalendarCard = ({date, details}) => {
    return(
        <div className={style.card}>
            <div className = {style.header}>
                <div className={style.date}>
                    {date}
                </div>
              </div>
                  <div className = {style.info}>
                  {
                      details.map(detail=> {
                          return(
                              detail.isTeaching ?
                                  <div className={style.day}>
                                    <span className={style.time}> {detail.time} </span> Teaching {detail.subject} with {detail.name}
                                  </div>
                              :
                                  <div className={style.day}><span className={style.time}> {detail.time} </span> {detail.subject} with {detail.name}</div>
                          )
                      })
                  }
                </div>
        </div>
    )
}

export default CalendarCard;
