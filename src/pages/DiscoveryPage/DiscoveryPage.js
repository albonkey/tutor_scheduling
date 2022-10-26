import React, {useState} from 'react';
import style from './DiscoveryPage.module.scss';
import CourseSearchResult from '../../components/CourseSearchResult/CourseSearchResult';
import {courses} from './data.js';

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
				{
					courses.map(course => {
						return <CourseSearchResult course={course} />
					})
				}
		 </div>
	 )
}
export default DiscoveryPage;
