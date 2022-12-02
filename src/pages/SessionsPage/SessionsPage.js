import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './SessionsPage.module.scss';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import { listSessions } from '../../features/sessions/sessionsSlice';
import {Link} from 'react-router-dom';


const SessionsPage = () => {
	const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
	const sessions = useSelector((state) => state.sessions);
  const today = new Date().toLocaleDateString();

	let emptyList = true;

    useEffect(() => {
        dispatch(listSessions(user.id))
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
	                    <div className = {style.title}>
	                        Today's sessions
	                    </div>
	                </div>
	                <div>
	                {
	                    sessions.sessions.map(session => {
	                        if(session.StartOn.split('-')[0] === '11/11/22')
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
					<div className= {style.heading2}>
	                    <div className = {style.title}>
	                        Upcoming sessions
	                    </div>
	                </div>
	                <div>
	                {
	                    sessions.sessions.map(session => {
	                        if(session.StartOn.split('-')[0] !== '11/11/22')
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
	                <div>No sessions scheduled
					</div>
	        </div>
	        }

	        {/* If no sessions scheduled for today */}
	        {
	        emptyList ?
	            <div className = {style.empty}>
					<div className = {style.heading2}>
					</div>
	                <div className = {style.button}>
	                    <button>
	                        <Link className={style.link} to={`/discover`}>Schedule a session</Link>
	                    </button>
	                </div>
	            </div>
	        :
	            <div></div>
	        }

			</div>
		 )
	}
export default SessionsPage;
