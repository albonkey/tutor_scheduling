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

	 return(
		 <div className={style.page}>
			<div>
				{
					id &&
					<SessionDetails
						id = { id } />
				}
				{
					<SessionReview id = { id } />
				}
			</div>
		 </div>
	 )
}
export default SessionPage;
