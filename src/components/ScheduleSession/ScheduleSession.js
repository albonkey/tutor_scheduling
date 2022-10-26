import React, { useState } from 'react';
import style from './ScheduleSession.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


const ScheduleSession = ({ course }) => {
	const today = new Date();
	const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
									'August', 'September', 'October', 'November', 'Desember'];
	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getYear());
	const [daySelected, setDaySelected] = useState(new Date());
	const [appointmentSelected, setAppointmentSelected] = useState(5);

	const selectDay = (day, month, year) => {
		const date = new Date();
		if(month === 12){
			date.setMonth(1);
		} else {
			date.setMonth(month);
		}
		date.setDate(day);
		date.setYear(year);

		setDaySelected(date);
	}

	const createCalendar = (month, year) => {
		const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
										'August', 'September', 'October', 'November', 'December'];
		const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		const calendar = new Date();
		calendar.setMonth(month);
		calendar.setYear(year);

		calendar.setDate(1);

		const calendarHeader = [];
		for(const day of daysOfTheWeek){
			calendarHeader.push(<div key={day}>{day}</div>)
		}

		const calendarElements = [];
		for(let day = 0; day <=	 calendar.getDay(); day++){
			calendarElements.push(<div className={style.day}></div>)
		}

		for(let day = 1; day <= calendar.getDate(); day++){

			calendarElements.push(
				<div className={style.day} onClick={() => selectDay(day, month, year)}>{day}</div>
			)

			calendar.setDate(calendar.getDate() + 1);
		}

		return (
			<div className={style.calendar}>
				<div className={style.calendarHeader}>
					{calendarHeader}
				</div>
				<div className={style.calendarBody}>
					{calendarElements}
				</div>
			</div>
		)
	}

	const createAppointments = (day, course) => {
		const appointments = [];

		for(const session of course.schedule){
			appointments.push(
				<div className={[style.appointment, session.id === appointmentSelected && style.selected].join(' ')} onClick={() => setAppointmentSelected(session.id)}>{`${session.time_start.getHours()}- ${session.time_end.getHours()}pm `}</div>
			)

		}

		return (
			<div className={style.appointments}>
				<div className={style.appointmentsHeader}>
					Find Session
				</div>
				<div className={style.appointmentsBody}>
					{appointments}
				</div>
				<div className={style.buttonWrapper}>
					<button className={style.button}>Schedule Session</button>
				</div>
			</div>
			)
	}
	 return(
		 <div className={style.wrapper}>
		 	<div className={style.elementWrapper}>
				<div className={style.header}>
					<FontAwesomeIcon icon={faAngleLeft} className={style.monthArrow} onClick={() => setMonth(month - 1)}/>
					<div className={style.title}>
							{`${monthsOfTheYear[month]} ${year + 1900}`}
					</div>
					<FontAwesomeIcon icon={faAngleRight} className={style.monthArrow} onClick={() => setMonth(month + 1)} />
				</div>
				{createCalendar(month, year)}
			</div>
			<div className={style.elementWrapper}>
				<div className={style.header}>
					{`${monthsOfTheYear[daySelected.getMonth()]} ${daySelected.getDate()}`}
				</div>
				{createAppointments(2, course)}

			</div>
		 </div>
	 )
}
export default ScheduleSession;
