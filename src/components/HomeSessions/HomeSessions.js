import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './HomeSessions.module.scss';
import SessionListItem from '../SessionListItem/SessionListItem';
import { getUserInfo } from '../../features/user/userSlice';
import { listSessions } from '../../features/sessions/sessionsSlice';

const HomeSessions = ({userID}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const sessions = useSelector((state) => state.sessions);

    useEffect(() => {
        dispatch(getUserInfo(userID));
        dispatch(listSessions(userID))
    }, [])
    
    return(
        <div className = {style.wrapper}>
        {
        sessions.loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        sessions.sessions ?
            <div className = {style.wrapper}>
                <div className= {style.heading2}>
                    Welcome {user.userInfo['GSI-1-SK']}
                    <div className = {style.title}>
                        Today's sessions
                    </div>
                </div>
                <div>
                    {
                    sessions.sessions.map(session => {
                    return <SessionListItem
                        key = {session['SK (GSI-1-PK)']}
                        session = {session}
                    />
                    })
                    }
                    </div>

            </div>
        :
        <div className= {style.heading2}>
            Sessions
                <div>No sessions today</div>
        </div>
        }
		</div>
    )
}

export default HomeSessions;
