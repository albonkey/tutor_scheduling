import React, { useState } from 'react';
import style from './CourseCard.module.scss';
import StarRating from '../StarRating/StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown as downCaret} from '@fortawesome/free-solid-svg-icons';
import { faCaretUp as upCaret} from '@fortawesome/free-solid-svg-icons';


const CourseCard = ({name, courses}) => {
    const [isSelected, setIsSelected] = useState(false);

    return(
        <div className={style.wrapper}>
            <div className={style.intro}>
                <div className={style.course}>
                    <span className={style.heading3}>
                        {courses.subject}
                        <div className={style.subheading}>
                            {courses.nrOfSessions} Sessions
                        </div>
                    </span>
                </div>
                <div className={style.icons}>
                    <div>
                        <StarRating rating={courses.rating} />
                    </div>
                    <div
                        className={style.carets}
                        onClick = {() => setIsSelected(!isSelected)}
                    >
                        {
                            isSelected ?
                            <div>
                                <FontAwesomeIcon icon = {upCaret} />
                            </div>
                            :
                            <FontAwesomeIcon icon = {downCaret} />
                        }
                    </div>
                </div>
            </div>
            <div className={[style.extended, !isSelected && style.hidden].join(' ')}>
                <p className={style.info}>
                    {courses.info}
                </p>
					      <button className={style.button}>Schedule a session with {name}</button>
            </div>

        </div>
    )
}

export default CourseCard;
