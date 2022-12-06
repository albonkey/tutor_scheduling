import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './DiscoveryPage.module.scss';
import CourseSearchResult from '../../components/CourseSearchResult/CourseSearchResult';
import {searchCourses} from '../../features/courses/courseSearchSlice';
import {getAvailabilityInfo} from '../../features/availability/availabilityInfoSlice'

const DiscoveryPage = () => {
	const [search, setSearch] = useState('');
	const [courseSelected, setCourseSelected] = useState('');
	const [subjectSelected, setSubjectSelected] = useState('');
	const [dateSelected, setDateSelected] = useState('');
	const [timeSelected, setTimeSelected] = useState('');
	const [selectedAppointment, setSelectedAppointment] = useState({});
	const [hasSelected, setHasSelected] = useState(false);
	const {courses, loading, error, searchTerm} = useSelector(state => state.courseSearch);
	const {availability} = useSelector(state => state.availabilityInfo)
	const dispatch = useDispatch();

	const doSearch = (e) => {
		e.preventDefault();

		dispatch(searchCourses(search));
		setSearch('');
	}
	const selectCourse = (course, subject, user) => {
		setCourseSelected(course);
		setSubjectSelected(subject);
		dispatch(getAvailabilityInfo(user));
		setHasSelected(false);
		setDateSelected('');
		setTimeSelected('');

	}

	const selectAppointment = (appointment, day, course) => {
		const object = {
			time: appointment,
			day: day,
			course: course
		}
		setTimeSelected(appointment);
		setSelectedAppointment(object);
		setHasSelected(true);
}
	const dayCreator = () => {
		const days = [];
		for(let i = 0; i < 10; i++){
			const date = new Date();
			date.setDate(date.getDate() + i);
			const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
			const month = date.toLocaleDateString('en-US', { month: 'short'});
			const dateString = date.toLocaleDateString();
			const isSelected = dateSelected === dateString;
			days.push(<div className={[style.appointmentDay, isSelected && style.selected].join(' ')} onClick={() => setDateSelected(dateString)} key={dateString}>{`${date.getDate()} ${month}`}</div>);
		}

		return (
			<div className={style.appointmentWidget}>
				{days}
			</div>
		)
	}
	const appointmentCreator = (day, availability) => {
		const appointments = [];

		if(availability[day]){
			for (const appointment in availability[day]){

				const isSelected = timeSelected === appointment;
				appointments.push(
					<div className={[style.appointment, isSelected && style.selected].join(' ')} onClick={() => selectAppointment(appointment, dateSelected, courseSelected)}>
						<span>{appointment}</span>
					</div>
				)
			}
		}
		return <div className={style.appointmentWrapper}>{appointments}</div>;
	}

	 return(
		 <div className={style.page}>
			 	<h2 className={style.pageHeading}>Find Tutor</h2>
				<div className={style.contentWrapper}>
					<div className={style.mainWrapper}>
						<form className={style.searchWrapper} onSubmit={doSearch}>
							<div className={style.searchMain}>
								<div className={style.search}>
									<input placeholder={'Search for subject'} value={search} onChange={(e) => setSearch(e.target.value)} />
								</div>
							</div>
							<div className={style.searchButton}>
								<button type='submit'>Search</button>
							</div>
						</form>

						{
							loading ?
								<div>Loading... </div>
							: error ?
								<div>Error</div> :
							<>
								<h3 className={style.heading}>Results for {searchTerm}</h3>
								<div className={style.results}>
										{
											courses.map(course => {
												return <CourseSearchResult
													key={course['SK (GSI-1-PK)']}
													id={course['SK (GSI-1-PK)']}
													firstName={course.FirstName}
													lastName={course.LastName}
													subject={course['GSI-1-SK']}
													level={course.Level}
													cost={course.Cost}
													totalSessions={course.TotalSessions}
													rating={course.Rating}
													info={course.Description}
													user={course['PK'].substr(5)}
													selected={course['SK (GSI-1-PK)'] === courseSelected}
													onPress={selectCourse}
													/>
											})
										}
								</div>
							</>
						}
					</div>
					<div className={style.sideWrapper}>
						<div className={style.courseSelected}>
							<div>{subjectSelected ? subjectSelected : 'No Course Selected'}</div>
							<div>{`${selectedAppointment.day ? selectedAppointment.day : '-'} ${selectedAppointment.time ? selectedAppointment.time : ''}`}</div>
							{
								hasSelected && <Link to={`/book/session?course=${courseSelected}&date=${dateSelected}&time=${timeSelected}`}className={style.button}>Continue</Link>
							}

						</div>
						{
							courseSelected &&
							<>
								{dayCreator()}
								{appointmentCreator(dateSelected, availability)}
							</>
						}

					</div>
				</div>
		 </div>
	 )
}
export default DiscoveryPage;
