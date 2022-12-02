import React from 'react';
import {Link} from 'react-router-dom';
import style from './SessionListItem.module.scss';

const SessionListItem = ({session}) => {

    const background = session['GSI-1-SK'] === 'Tutor' ? style.teach : style.learn;

    return(
        <div className = {style.wrapper + ' ' + background}>
            <div className={style.info}>
                <span className={style.status}>
                    {
                        session['GSI-1-SK'] === 'Tutor' ? 'Teaching' : 'Learning'
                    }
                </span>
                <span>{`${session.Subject} with ${session.StudentName ? session.StudentName : session.TutorName}`}</span>
            </div>
            <div className={style.info}>
                <Link className={style.link} to={`/session/${session['SK (GSI-1-PK)']}`}>View Session</Link>
                <span>{session.StartOn}</span>
            </div>
        </div>
    )
}

export default SessionListItem;
