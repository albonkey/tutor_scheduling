import React from 'react';
import { Link } from 'react-router-dom';
import style from './SessionConfirmation.module.scss';

const SessionConfirmation = () => {
	 return(
		 <div className={style.page}>
		 	<div className={style.heading}>Thanks for signing up for session!</div>


			<Link to='/sessions' className={style.link}>Click here to go to your session overview.</Link>
		 </div>
	 )
}
export default SessionConfirmation;
