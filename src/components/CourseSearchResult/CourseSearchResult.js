import React, { useState } from 'react';
import style from './CourseSearchResult.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../StarRating/StarRating';
import ScheduleSession from '../ScheduleSession/ScheduleSession';
const CourseSearchResult = ({course}) => {
	const {name, subject, level, nrOfLessons, rating, info} = course;
	const [toggle, setToggle] = useState(false);

	 return(
		 <div className={style.wrapper}>
		 	<div className={style.intro} onClick={() => setToggle(!toggle)}>
				<div>
					<div>{name}</div>
					<div className={style.courseTitle}>
						{subject} | {level}
					</div>
				</div>
				<div className={style.right}>
					<div className={style.ratingContainer}>
						<div>{nrOfLessons} lessons</div>
						<StarRating rating={rating}  />
					</div>
					<FontAwesomeIcon icon={toggle ? faAngleUp : faAngleDown} className={style.icon} />
				</div>
			</div>
			<div className={[style.extended, !toggle && style.hidden].join(' ') }>
				<h3 className={style.heading}>About Course</h3>
				<p className={style.info}>{info}</p>
				<h3 className={style.heading}>Schedule Session</h3>
				<ScheduleSession course={course}/>
			</div>
		 </div>
	 )
}
export default CourseSearchResult;
