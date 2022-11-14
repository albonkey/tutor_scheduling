import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import style from './HomePage.module.scss';
import HomeGreeting from '../../components/HomeGreeting/HomeGreeting';
import SessionList from '../../components/SessionList/SessionList';
import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';

const HomePage = () => {
	const user = useSelector((state) => state.user)

		 return(
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

		 )
}
export default HomePage;
