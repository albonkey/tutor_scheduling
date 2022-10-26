import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import style from './HomePage.module.scss';
import HomeCourses from '../../components/HomeCourses/HomeCourses';
import HomeCalendar from '../../components/HomeCalendar/HomeCalendar';

const HomePage = () => {
	const [sessions, setSessions] = useState([]);
	const getSessions = async (userID) => {
		const response = await API.get('tutorhubAPI', `/users/${userID}/sessions`);
		setSessions([...response.data.Items]);
		console.log(sessions);
	}
	useEffect(() => {
		getSessions(1);
	}, [])

	const schedule = [
		{
			date: 'Feb 19',
			appointment: [
				{
					isTeaching: false,
					time: '3 pm',
					name: 'Rob',
					subject: 'Guitar'
				},{
					isTeaching: true,
					time: '4 pm',
					name: 'Haley',
					subject: 'English'
				},{
					isTeaching: false,
					time: '6 pm',
					name: 'Bob',
					subject: 'Math'
				}
			]
		},{
			date: 'Feb 20',
			appointment: [
				{
					isTeaching: true,
					time: '2 pm',
					name: 'Mel',
					subject: 'Math'
				},{
					isTeaching: false,
					time: '3 pm',
					name: 'Sal',
					subject: 'History'
				},{
					isTeaching: false,
					time: '6 pm',
					name: 'Bob',
					subject: 'Spanish'
				}
			]
		},{
			date: 'Feb 19',
			appointment: [
				{
					isTeaching: false,
					time: '3 pm',
					name: 'Rob',
					subject: 'Guitar'
				},{
					isTeaching: true,
					time: '4 pm',
					name: 'Haley',
					subject: 'English'
				},{
					isTeaching: false,
					time: '6 pm',
					name: 'Bob',
					subject: 'Math'
				}
			]
		},{
			date: 'Feb 20',
			appointment: [
				{
					isTeaching: true,
					time: '2 pm',
					name: 'Mel',
					subject: 'Math'
				},{
					isTeaching: false,
					time: '3 pm',
					name: 'Sal',
					subject: 'History'
				},{
					isTeaching: false,
					time: '6 pm',
					name: 'Bob',
					subject: 'Spanish'
				}
			]
		}
	]

		 return(
			 <div className={style.page}>
			 	{
					sessions &&
					<HomeCourses
						name = {'Welcome Carl Solli'}
						title = {'Today'}
						sessions = {sessions} />
				}


					<HomeCalendar schedule = {schedule}/>
			 </div>

		 )
}
export default HomePage;
