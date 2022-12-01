import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import style from './HomePage.module.scss';
import HomeGreeting from '../../components/HomeGreeting/HomeGreeting';
import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';
import HomeSessions from '../../components/HomeSessions/HomeSessions';

const HomePage = () => {
	const user = useSelector((state) => state.user)

	const { route } = useAuthenticator((context) => [
    context.route,
  ]);

		 return(
			 route === 'authenticated' ?
				 <div className={style.page}>
			 		{

						user.id &&
						<>
							<HomeGreeting />
							<SessionList
								title={'Today'}
								user={user.id}
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
