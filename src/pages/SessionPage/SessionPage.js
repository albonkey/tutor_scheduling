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
	const {session} = useSelector((state) => state.sessionInfo);
	const dispatch = useDispatch();

	useEffect(() => {
		const sessionId = id.substr(8);
		dispatch(getSession(sessionId));
	}, [])

	 return(
		 <div className={style.page}>
				{
					session &&
					<SessionDetails
						subject={session['GSI-2-PK']}
						name={session['GSI-2-PK']}
						level={session['Level']}
						id={session['SK (GSI-1-PK)']}
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
