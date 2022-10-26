import React from 'react';
import style from './HomePage.module.scss';
import HomeCourses from '../../components/HomeCourses/HomeCourses';
import HomeCalendar from '../../components/HomeCalendar/HomeCalendar';

const HomePage = () => {
	const sessions = [
		{
			isTeaching: true,
			subject: 'Math',
			name: 'Sara',
			time: '12:00 - 1:00pm'
		},{
			isTeaching: false,
			subject: 'History',
			name: 'Alex',
			time: '2:00 - 3:00pm'
		}
	]
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
					<HomeCourses
						name = {'A. Person'}
						title = {'Today'}
						sessions = {sessions} />
				
					<HomeCalendar schedule = {schedule}/> 	 
			 </div>
			 
		 )
}
export default HomePage;
