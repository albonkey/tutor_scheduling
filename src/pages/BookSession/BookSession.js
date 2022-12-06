import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import style from './BookSession.module.scss';
import useQuery from '../../hooks/useQuery';
import { getCourse } from '../../features/courses/courseInfoSlice';
import { saveSession } from '../../features/sessions/sessionSaveSlice';
import StarRating from '../../components/StarRating/StarRating';
const BookSession = () => {
	const query = useQuery();
	const navigate = useNavigate();
	const [textarea, setTextarea] = useState('');
	const {course} = useSelector(state => state.courseInfo)
	const {userInfo, id: userId} = useSelector(state => state.user)
	const dispatch = useDispatch();

	useEffect(() => {
		const courseId = query.get('course').substr(7);
		dispatch(getCourse(courseId));
	}, [])

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('Submit')
		const tutorId = course['PK'].substr(5);
		const sessionObject = {
			courseId: course["SK (GSI-1-PK)"],
			subject: course['GSI-1-SK'],
			level: course['Level'],
			description: course['Description'],
			sessionNeeds: textarea,
			date: query.get('date'),
			time: query.get('time'),
			cost: course['Cost'],
			tutor: {
				id: tutorId,
				firstName: course['FirstName'],
				lastName: course['LastName'],
			},
			student: {
				id: userId,
				firstName: userInfo.FirstName,
				lastName: userInfo.LastName
			},
		}

		dispatch(saveSession(sessionObject)).then(response => {
			navigate('/sessionConfirmation');
		});
	}
	 return(
		 <div className={style.page}>
		 	<div className={style.header}>
				<div className={style.heading}>Book Session</div>
				<Link to='/discover' className={style.cancel}>Cancel</Link>
			</div>
			{
				course &&
				<form className={style.main} onSubmit={submitHandler}>
					<div className={style.info}>
						<div className={style.section}>
							<div>
								<div className={style.infoHeading}>{`${course['GSI-1-SK']} with ${course['FirstName']} ${course['LastName']}`}</div>
								<div>{course['Level']}</div>
							</div>
							<div className={style.image} />
						</div>
						<div className={style.section}>
							{course['Description']}
						</div>
						<div className={style.section}>
							<textarea className={style.textarea} placeholder='What would you like to learn from this session?' value={textarea} onChange={(e) => setTextarea(e.target.value)} />
						</div>
					</div>

					<div className={style.booking}>
						<div className={style.bookingHeader}>
							<div>
								<span className={style.cost}>${course['Cost']}</span> session
							</div>
							<div>
								<StarRating rating={course.Rating} small />
							</div>
						</div>
						<div className={style.bookingTime}>
							<div className={style.timeContainer}>
								<div className={style.timeTitle}>Date</div>
								<div>{query.get('date')}</div>
							</div>
							<div className={style.timeContainer}>
								<div className={style.timeTitle}>Time</div>
								<div>{query.get('time')}</div>
							</div>
						</div>
						<button type='submit' className={style.button}>
							Schedule Session
						</button>
					</div>
				</form>
			}

		 </div>
	 )
}
export default BookSession;
