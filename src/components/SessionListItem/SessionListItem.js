import React from 'react';
import {Link} from 'react-router-dom';
import style from './SessionListItem.module.scss';

const SessionListItem = ({isTeaching, subject, name, time, sessionID}) => {

    const background = isTeaching ? style.teach : style.learn;

    return(
        <div className = {style.wrapper + ' ' + background}>
            <div className={style.info}>
                <span className={style.status}>
                    {
                        isTeaching ? 'Teaching' : 'Learning'
                    }
                </span>
                <span>{`${subject} with ${name}`}</span>
            </div>
            <div className={style.info}>
                <Link className={style.link} to={`/session/${sessionID}`}>View Session</Link>
                <span>{time}</span>
            </div>
        </div>
    )
}

export default SessionListItem;
