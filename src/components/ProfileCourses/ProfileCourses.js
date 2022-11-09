import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileCourses.module.scss';
import CourseCard from '../CourseCard/CourseCard';
import { listCourses } from '../../features/courses/coursesSlice';

const ProfileCourses = ({userID}) => {
  const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses);

  useEffect(() => {
		dispatch(listCourses(userID));
	}, [])


    return(
        <div className = {style.wrapper}>
        {
            courses.loading ?
                <div className = {style.heading2}>Page loading</div>
            :
            courses.courses ?
                <div className = {style.wrapper}>
                    <div className= {style.heading2}>Tutoring</div>
                    <div className = {style.cards}>
                      {
                        
                        courses.courses.map(course => {
                          return <CourseCard 
                          key = {course['GSI-1-SK']}
                          course={course}/>
                        })
                      }

                    </div>   
                </div>
            :
            <div className= {style.heading2}>
                Tutoring 
                <div>No user information</div>
            </div>
        }
        </div>
    )
}

export default ProfileCourses;
