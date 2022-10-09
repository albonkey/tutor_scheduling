import React, {useState} from 'react';
import style from './DiscoveryPage.module.scss';
import CourseSearchResult from '../../components/CourseSearchResult/CourseSearchResult';
const DiscoveryPage = () => {

	const [level, setLevel] = useState('');
	const [time, setTime] = useState('');
	const [day, setDay] = useState('');
	const [search, setSearch] = useState('');

	const doSearch = (e) => {
		e.preventDefault();

		console.log({
			level,
			time,
			day,
			search
		})
	}
	const mySessionStart = new Date();
	mySessionStart.setHours(11);
	mySessionStart.setMinutes(0);

	const mySessionEnd = new Date();
	mySessionEnd.setHours(12);
	mySessionEnd.setMinutes(0);

	const myCourse = {
		name: 'Carl Solli',
		subject: 'Math',
		level: 'Intermediate',
		nrOfLessons: 50,
		rating: 4,
		info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh.
			Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi,
			eget malesuada nulla porttitor ut.
			Nullam sit amet risus vitae eros lobortis tristique in quis nisi.`,
		schedule: [
			{
				id: 1,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			}
		]
	}
	const myCourse2 = {
		name: 'Ashkan',
		subject: 'Databases',
		level: 'Intermediate',
		nrOfLessons: 50,
		rating: 5,
		info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh.
			Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi,
			eget malesuada nulla porttitor ut.
			Nullam sit amet risus vitae eros lobortis tristique in quis nisi.`,
		schedule: [
			{
				id: 1,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 2,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 3,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 4,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 5,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 6,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 7,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 8,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			},{
				id: 9,
				date: new Date(),
				available: true,
				time_start: mySessionStart,
				time_end: mySessionEnd
			}
		]
	}
	const myCourse3 = {
		name: 'Aylin',
		subject: 'Machine Learning',
		level: 'Intermediate',
		nrOfLessons: 50,
		rating: 4.5,
		info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh.
			Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi,
			eget malesuada nulla porttitor ut.
			Nullam sit amet risus vitae eros lobortis tristique in quis nisi.`,
			schedule: [
				{
					id: 1,
					date: new Date(),
					available: true,
					time_start: mySessionStart,
					time_end: mySessionEnd
				}
			]
	}
	 return(
		 <div className={style.page}>
		 	<h2 className={style.pageHeading}>Find Tutor</h2>
		 	<form className={style.searchWrapper} onSubmit={doSearch}>
				<div className={style.searchMain}>
					<div className={style.searchAttributes}>
						<div className={style.searchAttribute}>
							<select value={level} onChange={(e) => setLevel(e.target.value)}>
								<option value=''>Level</option>
								<option value='easy'>Easy</option>
								<option value='intermediate'>Intermediate</option>
								<option value='hard'>Hard</option>
							</select>
						</div>
						<div className={style.searchAttribute}>
							<select value={time} onChange={(e) => setTime(e.target.value)}>
								<option value=''>Time</option>
								<option value='morning'>Morning</option>
								<option value='afternoon'>Afternoon</option>
							</select>
						</div>
						<div className={style.searchAttribute}>
							<select value={day} onChange={(e) => setDay(e.target.value)}>
								<option value=''>Day</option>
								<option value='monday'>Monday</option>
								<option value='tuesday'>Tuesday</option>
								<option value='wednesday'>Wednesday</option>
								<option value='thursday'>Thursday</option>
								<option value='friday'>Friday</option>
								<option value='saturday'>Saturday</option>
								<option value='sunday'>Sunday</option>
							</select>
						</div>
					</div>
					<div className={style.search}>
						<input placeholder={'Search for subject'} value={search} onChange={(e) => setSearch(e.target.value)} />
					</div>
				</div>
				<div className={style.searchButton}>
					<button type='submit'>Search</button>
				</div>
			</form>
			<h3 className={style.heading}>Results</h3>
			<CourseSearchResult course={myCourse} />
			<CourseSearchResult course={myCourse2} />
			<CourseSearchResult course={myCourse3} />
		 </div>
	 )
}
export default DiscoveryPage;
