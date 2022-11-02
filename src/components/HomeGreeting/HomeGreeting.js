import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './HomeGreeting.module.scss';
import image from './image.jpg';

const HomeGreeting = () => {
	const today = new Date();
	const day = today.toLocaleDateString('en-US', { weekday: 'long' });
	const date = today.getDate()
	const month = today.toLocaleDateString('en-US', { month: 'long'});

	const user = useSelector((state) => state.user)
	 return(
		 <div className={style.wrapper}>
		 	<div className={style.greeting}>
				<img src={image} className={style.image} />
				<div className={style.greetingText}>
					Hey {user.userInfo['GSI-1-SK']}!
				</div>
			</div>
			<div className={style.info}>
				<span className={style.day}>{day}</span>
				<span className={style.date}>{date} {month}</span>
				<Link to='/schedule' className={style.link}>Update Schedule</Link>
			</div>
		 </div>
	 )
}
export default HomeGreeting;
