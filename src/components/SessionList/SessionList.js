import React from 'react';
import style from './SessionList.module.scss';
import SessionListItem from '../SessionListItem/SessionListItem';

const SessionList = ({title, sessions}) => {
    return(
        <div className = {style.wrapper}>
			<div className= {style.heading2}>
                {title}
            </div>
            <div>
                {
                sessions.map(session => {
                  return <SessionListItem
                      session = {session}
                  />
                    })
                }
            </div>
		</div>
    )
}

export default SessionList;