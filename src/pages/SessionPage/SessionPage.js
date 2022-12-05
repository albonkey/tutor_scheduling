import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { API } from 'aws-amplify';
import style from './SessionPage.module.scss';
import { getSession } from '../../features/sessions/sessionInfoSlice'
import SessionDetails from '../../components/SessionDetails/SessionDetails';
import SessionReview from '../../components/SessionReview/SessionReview';

const SessionPage = () => {
	const { id } = useParams();
	const {session, tutor, student} = useSelector((state) => state.sessionInfo);
	const dispatch = useDispatch();

	console.log(session);
	console.log(tutor);
	console.log(student);
	useEffect(() => {
		console.log('running');
		const sessionId = id.substr(8);
		dispatch(getSession(sessionId));
	}, [])


	 return(
		 <div className={style.page}>
				{
					session &&
					<SessionDetails
						subject={session['GSI-2-PK']}
						tutor={session['Tutor']}
						level={session['Level']}
						id={session['SK (GSI-1-PK)']}
						rating={4}
						 />
				}
				{
					session &&
						<SessionReview session={session}/>

				}
		 </div>
	 )
}
export default SessionPage;
