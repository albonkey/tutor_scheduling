import React, {useEffect, useState} from 'react';
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
	const [upcomingSessions, setUpcomingSessions] = useState([]);
	const [previousSessions, setPreviousSessions] = useState([]);
    useEffect(() => {
        dispatch(listSessions(user.id)).then(sessions => {
					const _upcomingSessions = [];
					const _previousSessions = [];

					for(const session in sessions){
						const startDate = new Date(session.StartOn);
						const currentDate = new Date();

						if(startDate > currentDate){
							_upcomingSessions.push(session);
						} else {
							_previousSessions.push(session);
						}
					}
				})
    }, [])

	 return(
			<div className = {style.page}>
			<div className={style.header}>
				Sessions
			</div>
				<div className={style.sessionsWrapper}>
					<div className={style.heading}>Upcoming</div>
					<div className={style.sessions}>
						{
							upcomingSessions.length > 0 ?
								<>

								</>
							:
							<div className={style.placeholder}>
								No upcoming sessions
							</div>
						}
					</div>
				</div>
				<div  className={style.sessionsWrapper}>
					<div className={style.heading}>Previous</div>
					<div className={style.sessions}>
						{
							previousSessions.length > 0 ?
								<>

								</>
							:
							<div className={style.placeholder}>
								No previous sessions
							</div>
						}
					</div>
				</div>
			</div>
		 )
	}
export default SessionsPage;
