import React from 'react';
import style from './SessionsPage.module.scss';
import SessionList from '../../components/SessionList/SessionList';

const SessionsPage = () => {
const sessions = [
	{
		isTeaching: true,
		subject: 'Math',
		name: 'Sara',
		time: '12:00 - 1:00pm'
	},{
		isTeaching: false,
		subject: 'History',
		name: 'Alex',
		time: '2:00 - 3:00pm'
	}
]

	 return(
		 <div className={style.page}>
		 	<SessionList
				title = {'Today'}
				sessions = {sessions}
				 
			 />
			 <SessionList
				title = {'Upcoming Sessions'}
				sessions = {sessions} 
			 />
		 </div>
	 )
}
export default SessionsPage;
