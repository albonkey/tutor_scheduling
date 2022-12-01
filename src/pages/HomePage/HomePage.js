import React from 'react';
import { useSelector } from 'react-redux';
import style from './HomePage.module.scss';
import HomeGreeting from '../../components/HomeGreeting/HomeGreeting';
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
