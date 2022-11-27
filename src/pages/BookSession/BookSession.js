import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import style from './BookSession.module.scss';
import useQuery from '../../hooks/useQuery';
import {getCourse } from '../../features/courses/courseInfoSlice'
const BookSession = () => {
	const query = useQuery();
	const {course} = useSelector(state => state.courseInfo)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourse(query.get('course')));
	}, [])


	 return(
		 <div className={style.page}>
		 	<div className={style.header}>
				<div className={style.heading}>Book Session</div>
				<Link to='/discover' className={style.cancel}>Cancel</Link>
			</div>
			{
				course &&
				<div className={style.main}>

					<div className={style.info}>
						<div className={style.section}>
							<div>
								<div className={style.infoHeading}>{`${course['GSI-1-SK']} with ${course['TutorName']}`}</div>
								<div>{course['Level']}</div>
							</div>
							<div className={style.image} />
						</div>
						<div className={style.section}>
							{course['Description']}
						</div>
						<div className={style.section}>
							<textarea className={style.textarea} placeholder='What would you like to learn from this session?' />
						</div>
					</div>

					<div className={style.booking}>
						<div>
							<div>
								<span className={style.cost}>$30</span> session
							</div>
						</div>
					</div>
				</div>
			}

		 </div>
	 )
}
export default BookSession;
