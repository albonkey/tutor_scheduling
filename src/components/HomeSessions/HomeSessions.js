import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import style from './HomeSessions.module.scss';
import SessionListItem from '../SessionListItem/SessionListItem';
import { listSessions } from '../../features/sessions/sessionsSlice';
import image from './image.png';

const HomeSessions = ({userID}) => {
    const dispatch = useDispatch();
    const sessions = useSelector((state) => state.sessions);
    const today = new Date().toLocaleDateString();
    let emptyList = true;

    useEffect(() => {
        dispatch(listSessions(userID))
    }, [])

    return(
        <div className = {style.wrapper}>
          <div className = {style.heading2}>
              Today's sessions
          </div>
        {
        sessions.sessions ?
            <div className = {style.wrapper}>
                <div>
                {
                    sessions.sessions.map(session => {
                        if(session.date === today)
                        {
                            emptyList = false;
                            return <SessionListItem
                                key = {session['SK (GSI-1-PK)']}
                                session = {session}
                            />
                        }
                    })
                }
                </div>
            </div>
        :
        <div className= {style.heading2}>
            Today's sessions
                <div>No sessions scheduled for today.</div>
        </div>
        }

        {/* If no sessions scheduled for today */}
        {
        emptyList ?
            <div className = {style.empty}>
              <img src={image} className={style.image} alt='' />
              <div className={style.placeholderText}>
                <div>Looks like you have no sessions today...</div>
                <Link className={style.link} to={`/discover`}>Search for sessions</Link>

              </div>
              </div>
        :
            <div>No load</div>
        }

		</div>
    )
}

export default HomeSessions;
