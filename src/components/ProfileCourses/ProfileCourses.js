import React from 'react';
import style from './ProfileCourses.module.scss';
import CourseCard from '../CourseCard/CourseCard';

const ProfileCourses = ({courses}) => {
    return(
        <div className = {style.wrapper}>
            <div>
                <div className= {style.heading2}>Tutoring</div>
                <div>
                  {
                    courses.map(course => {
                      return <CourseCard course={course}/>
                    })
                  }

                </div>
            </div>
        </div>
    )
}

export default ProfileCourses;
