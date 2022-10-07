import React from 'react';
import style from './ProfileCourses.module.scss';
import CourseCard from '../CourseCard/CourseCard';

const ProfileCourses = ({name, courses}) => {
    return(
        <div className = {style.wrapper}>
            <div>
                <h2 className= {style.heading2}>Tutoring</h2>
                <div>
                    <CourseCard
                            courses = {courses}  
                 />
                </div>
            </div>
        </div>
    )
}

export default ProfileCourses;