import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import style from './HomePage.module.scss';
import HomeSessions from '../../components/HomeSessions/HomeSessions';
import HomeCalendar from '../../components/HomeCalendar/HomeCalendar';

const HomePage = () => {
	const id = useSelector((state) => state.user.id)

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
					<HomeSessions
						userID = {id} />
				}

				{
					<HomeCalendar schedule = {schedule}/>
}
			 </div>

		 )
}
export default HomePage;
