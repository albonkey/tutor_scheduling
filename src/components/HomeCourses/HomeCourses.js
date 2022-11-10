import React from 'react';
import style from './HomeCourses.module.scss';
import SessionListItem from '../SessionListItem/SessionListItem';

const HomeCourses = ({name, title, sessions}) => {
    return(
        <div className = {style.wrapper}>
			<div className= {style.heading2}>
                {name}
                <div className = {style.title}>
                    {title}
                </div>
            </div>
            <div>
                {
                sessions.map(session => {
                  return <SessionListItem
                      isTeaching={session['GSI-1-SK'] === 'Tutor'}
                      subject={session.Subject}
                      name={session.StudentName ? session.StudentName : session.TutorName }
                      time={session.StartOn}
                      sessionID={session['SK (GSI-1-PK)']}
                  />
                    })
                }
            </div>
		</div>
    )
}

export default HomeCourses;
