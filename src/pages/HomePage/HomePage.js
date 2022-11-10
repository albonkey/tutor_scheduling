import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import style from './HomePage.module.scss';
import HomeGreeting from '../../components/HomeGreeting/HomeGreeting';
import SessionList from '../../components/SessionList/SessionList';
import HomeCourses from '../../components/HomeCourses/HomeCourses';
import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';

const HomePage = () => {
	const id = useSelector((state) => state.user.id)
	const [sessions, setSessions] = useState([]);
	const getSessions = async (userID) => {
		const response = await API.get('tutorhubAPI', `/users/${userID}/sessions`);
		setSessions([...response.data.Items]);
		console.log(sessions);
	}
	useEffect(() => {
		getSessions(id);
	}, [])

		 return(
			 <div className={style.page}>
			 	<HomeGreeting />
			 	{
					sessions &&
					<SessionList
						title = {'Today'}
						sessions = {sessions} />
				}


					<ScheduleComponent />
			 </div>

		 )
}
export default HomePage;
