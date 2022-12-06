import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {API} from 'aws-amplify';
import style from './ScheduleComponent.module.scss';
import { getAvailabilityInfo } from '../../features/availability/availabilityInfoSlice';
import { saveAvailability} from '../../features/availability/availabilitySaveSlice';

const ScheduleComponent = () => {
	const [editable, setEditable] = useState(false);
	const [oldSchedule, setOldSchedule] = useState({});
	const [schedule, setSchedule] = useState({
		'11/22/2022': {
			'9am': {
				'type': 'Available'
			},
			'10am': {
				'type': 'Available'
			},
			'12am': {
				'type': 'Tutoring',
				'message': 'Tutoring Math with Carl'
			},'3pm': {
				'type': 'Learning',
				'message': 'Learning Math with Ashkan'
			}
		}});

	const availabilityInfo = useSelector(state => state.availabilityInfo);
	const userInfo = useSelector(state => state.user);

	const dispatch = useDispatch();

	const createDate = (offset) => {
		const date = new Date();
		const add = offset ? offset : 0;
		date.setDate(date.getDate() + add);

		return date;
	}

	const updateSchedule = (day, time, action) => {
		const newSchedule = structuredClone(schedule);

		if(action === 'makeAvailable'){
			let newTime = {'type': 'Available'};

			if(!newSchedule[day]){
				newSchedule[day] = {};
			}
			newSchedule[day][time] = newTime;

		} else if(action === 'remove'){
			delete newSchedule[day][time]
		}
		setSchedule(newSchedule);
	}

	const timeStringFromNumber = (number) => {
		let time = '';
		if (number === 12){
			time = '12pm'
		} else if (number === 24){
			time = '12am'
		} else if(number > 12){
			time = `${number-12}pm`
		} else {
			time = `${number}am`
		}

		return time;
	}

	const hourBuilder = (day, time, dateString, editable) => {
		let text;
		let action = <span></span>
		let hourData;

		if(day.hasOwnProperty(time)){
			hourData = day[time];
			if(hourData.type === 'Available'){
				text = 'Available'
				if(editable){
					action = <span onClick={() => updateSchedule(dateString, time, 'remove')}>x</span>
				}
			} else if (hourData.type === 'Tutoring') {
				text = hourData.message
			} else if (hourData.type === 'Learning'){
				text = hourData.message
			}
		}
		else{
			text = '-';
			if(editable){
				action = <span onClick={() => updateSchedule(dateString, time, 'makeAvailable')}>[ ]</span>;
			}

		}

		const appearance = hourData ? style[hourData.type.toLowerCase()] : '';

		return(
			<li key={time} className={style.hour + ' ' + appearance}>
				<span className={style.time}>{time}</span>
				<span className={style.hourText}>{text}</span>
				{action}
			</li>
		)



	}

	const createDay = (date, editable) => {
		//Variables for displaying time
		const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
		const month = date.toLocaleDateString('en-US', { month: 'short'});
		const dateNumber = date.getDate();
		const dateString = date.toLocaleDateString();

		let dayData = {};
		if(schedule){
			dayData = schedule[dateString] ? schedule[dateString] : {};
		}


		const hours = [];


			for(let hour = 5; hour <=24; hour++){
				const time = timeStringFromNumber(hour);
				hours.push(hourBuilder(dayData, time, dateString, editable));
			}



			return (
				<div className={style.day}>
					<div className={style.dayHeader}>
						<span className={style.dayName}>{dayName}</span>
						<span className={style.dayDate}>{month} {dateNumber}</span>
					</div>
					<ul className={style.dayList}>
						{hours}
					</ul>
				</div>
			)
	}

	const submitHandler = async (user, availability) => {
		dispatch(saveAvailability(user, availability));
	}

	useEffect(() => {
		dispatch(getAvailabilityInfo(userInfo.id))
		.then(response => {
			const obj = structuredClone(response)
			setSchedule(obj);
		});
	}, []);

	 return(
		 <div className={style.wrapper}>
		 	<div className={style.header}>
				<div className={style.heading}>Schedule</div>
				{
					editable ?
						<div className={style.buttonWrapper}>
							<button className={style.button + ' ' + style.red} onClick={() => {
								setEditable(!editable);
								setSchedule(structuredClone(oldSchedule));
								}
							}>Cancel</button>
							<button className={style.button + ' ' + style.green} onClick={() => {
								setEditable(!editable);
								submitHandler(userInfo.id, schedule)
							}}>Update</button>
						</div>

					:
					<div className={style.buttonWrapper}>
						<button className={style.button + ' ' + style.green} onClick={() => {
							setEditable(!editable);
							setOldSchedule(structuredClone(schedule));
						}
						}>Change Availability</button>
					</div>
				}

			</div>
			<div className={style.schedule}>
					{createDay(createDate(), editable)}
					{createDay(createDate(1), editable)}
					{createDay(createDate(2), editable)}
					{createDay(createDate(3), editable)}
					{createDay(createDate(4), editable)}
			</div>
		 </div>
	 )
}
export default ScheduleComponent;
