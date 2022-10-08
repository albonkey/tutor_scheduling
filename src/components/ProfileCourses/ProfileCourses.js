import React from 'react';
import style from './ProfileCourses.module.scss';
import CourseCard from '../CourseCard/CourseCard';

const ProfileCourses = ({name, courses}) => {
    return(
        <div className = {style.wrapper}>
            <div>
                <div className= {style.heading2}>Tutoring</div>
                <div>
                    <CourseCard
                            name = {name}
                            courses = {courses}  
                 />
                </div>
            </div>
        </div>
    )
}

export default ProfileCourses;