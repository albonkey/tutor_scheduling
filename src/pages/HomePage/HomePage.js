import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import style from './HomePage.module.scss';
import HomeGreeting from '../../components/HomeGreeting/HomeGreeting';
import SessionList from '../../components/SessionList/SessionList';
import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';
import HomeSessions from '../../components/HomeSessions/HomeSessions';

const HomePage = () => {
	const user = useSelector((state) => state.user)

		 return(
			 <div className={style.page}>
		 		{
					user.id &&
					<>
						<HomeGreeting />
						
						<HomeSessions
							userID = {user.id}
					/>
						<ScheduleComponent />
					</>
				}

			 </div>

		 )
}
export default HomePage;
