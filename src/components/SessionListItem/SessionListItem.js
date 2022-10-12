import React from 'react';
import style from './SessionListItem.module.scss';

const SessionListItem = ({session}) => {

const background = session.isTeaching ? style.teach : style.learn;

    return(
        <div className = {style.wrapper + ' ' + background}>
            <div className={style.info}>
                <span className={style.status}>
                    {
                        session.isTeaching ? 'Teaching' : 'Learning'
                    }
                </span>
                <span>{`${session.subject} with ${session.name}`}</span>
            </div>
            <div className={style.info}>
                <a className={style.link}>View Session</a>
                <span>{session.time}</span>
            </div>
        </div>
    )
}

export default SessionListItem;
