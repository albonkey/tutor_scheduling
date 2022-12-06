import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './SessionsPage.module.scss';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import { listSessions } from '../../features/sessions/sessionsSlice';
import {Link} from 'react-router-dom';


const SessionsPage = () => {
	const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
	const {sessions} = useSelector((state) => state.sessions);
  const today = new Date().toLocaleDateString();

    useEffect(() => {
        dispatch(listSessions(user.id));
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
							sessions.length > 0 ?
								<>
									{
										sessions.map(session => {
											const todayDate = new Date()
											const sessionDate = new Date(session.Date);

											if(sessionDate >= todayDate){
												return <SessionListItem session={session}/>
											}
										}
									)}

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
							sessions.length > 0 ?
							<>
								{
									sessions.map(session => {
										const todayDate = new Date()
										const sessionDate = new Date(session.Date);

										if(sessionDate <= todayDate){
											return <SessionListItem session={session}/>
										}
									}
								)}

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
