import React, { useState } from 'react';
import style from './CourseSearchResult.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../StarRating/StarRating';
import ScheduleAppointment from '../ScheduleAppointment/ScheduleAppointment';

const CourseSearchResult = ({ id, firstName, lastName, subject, level, cost, totalSessions, rating, info, user, selected, onPress}) => {
	const [toggle, setToggle] = useState(false);

	 return(
		 <div className={[style.wrapper, selected && style.selected].join(' ')} onClick={() => onPress(id, subject, user)}>
		 	<div className={style.intro} onClick={() => setToggle(!toggle)}>
				<div>
					<div className={style.name}>{`${firstName} ${lastName}`}</div>
					<div className={style.courseTitle}>
						{subject} | {level}
					</div>
				</div>
				<div className={style.right}>
					<div className={style.ratingContainer}>
						<div className={style.costWrapper}>
							<span>{totalSessions} lessons</span>
							<span className={style.cost}>
								${cost}
							</span>
						</div>
						<StarRating rating={rating}  />
					</div>
					<FontAwesomeIcon icon={toggle ? faAngleUp : faAngleDown} className={style.icon} />
				</div>
			</div>
			<div className={[style.extended, !selected && style.hidden].join(' ') }>
				<h3 className={style.heading}>About Course</h3>
				<p className={style.info}>{info}</p>
			</div>
		 </div>
	 )
}
export default CourseSearchResult;
