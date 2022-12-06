import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API, Auth } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import style from './HomePage.module.scss';
import HomeGreeting from '../../components/HomeGreeting/HomeGreeting';
import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';
import HomeSessions from '../../components/HomeSessions/HomeSessions';

const HomePage = () => {
	const dispatch = useDispatch();
	const {userInfo, id} = useSelector((state) => state.user)
	const { route } = useAuthenticator((context) => [
    context.route,
  ]);

	console.log(userInfo);
		 return(
			 route === 'authenticated' ?
				 <div className={style.page}>
			 		{

						id &&
						<>
							<HomeGreeting />
							<HomeSessions
								userID = {id}
							/>
							<ScheduleComponent />
						</>
					}
				 </div>
			:
			<div className={style.landingPage}>
				<div className={style.sectionLeft}>
					<div className={style.heading}>
						<span className={style.brand}>TutorHub </span>
						 connecting tutorers with student all around the world.
					</div>
					<p className={style.message}>Get started learning and teaching today.</p>
					<Link to='/login' className={style.button}>Get Started</Link>
				</div>
				<div className={style.sectionRight}>

				</div>
			</div>

		 )
}
export default HomePage;
