import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './SessionList.module.scss';
import SessionListItem from '../SessionListItem/SessionListItem';
import { listSessions } from '../../features/sessions/sessionsSlice';

const SessionList = ({title, user}) => {
  const {sessions} = useSelector(state => state.sessions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSessions(user))
  }, [])

    return(
        <div className = {style.wrapper}>
    			<div className= {style.heading2}>
            {title}
          </div>
            {
              sessions &&
              <div>
                  {
                    sessions.map(session => {
                    return <SessionListItem
                            key={session['SK (GSI-1-PK)']}
                            isTeaching={session['GSI-1-SK'] === 'Tutor'}
                            subject={session.Subject}
                            name={session.StudentName ? session.StudentName : session.TutorName}
                            time={session.StartOn}
                            sessionID={session['SK (GSI-1-PK)']}
                    />
                      })
                  }
              </div>
            }

		</div>
    )
}

export default SessionList;
