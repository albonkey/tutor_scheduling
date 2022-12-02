import React, {useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileCourses.module.scss';
import CourseCard from '../CourseCard/CourseCard';

import { listCourses } from '../../features/courses/courseListSlice';
import { createCourse } from '../../features/courses/courseSaveSlice';
import PopUp from '../PopUpComponent/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as plus } from '@fortawesome/free-solid-svg-icons';


const ProfileCourses = ({userID}) => {
  const dispatch = useDispatch();
	const courses = useSelector((state) => state.courseList);
  const user = useSelector((state) => state.user);
  const {success} = useSelector((state) => state.courseSave);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [courseInfo, setCourseInfo] = useState({
        Subject: "",
        Level: "",
        Description: "",
    });



  const handleChange = (event) => {
    setCourseInfo({ ...courseInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userName = `${user.userInfo.FirstName} ${user.userInfo.LastName}`
    dispatch(createCourse({...courseInfo, user: userID, Name: userName }));
    setCourseInfo({ Subject: "", Level: "", Description: "" });
    setButtonPopup(false);
  };

  useEffect(() => {
		dispatch(listCourses(userID));
	}, [success])


    return(
        <div className = {style.wrapper}>
        {
            courses.loading ?
                <div className = {style.heading2}>Page loading</div>
            :
            courses.courses ?
                <div className = {style.wrapper}>
                {/*Main page - load courses */}
                    <div className = {style.header}>
                        <div className= {style.heading2}>Tutoring</div>
                        <div className = {style.icon}>
                            <button onClick = { () => setButtonPopup(true)} >
                              <FontAwesomeIcon icon = {plus} />
                            </button>
                        </div>
                    </div>
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

        {/*Popup page - create a course */}
        <div>
                <PopUp trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                    <div className = {style.form}>
                      <form onSubmit = {handleSubmit}>
                        <div className = {style.formHeading}>
                            Create Course
                        </div>
                        <div className = {style.title}>
                            Subject
                        </div>
                        <input className = {style.formInputs}
                            type = 'text'
                            name = 'Subject'
                            value = {courseInfo.Subject}
                            onChange = {handleChange}
                        />
                        <div className = {style.title}>
                            Level
                        </div>
                        <select className = {style.formInputs}
                          name = 'Level'
                          value = {courseInfo.Level}
                          onChange = {handleChange}
                        >
                            <option disabled={true} value="">
                                --Select a level--
                            </option>
                            <option value = "Beginner">Beginner</option>
                            <option value = "Intermediate">Intermediate</option>
                            <option value = "Advanced">Advanced</option>
                        </select>
                        <div className = {style.title}>
                            Description
                        </div>
                        <textarea className = {style.formInputs}
                            name = 'Description'
                            value = {courseInfo.Description}
                            onChange = {handleChange}
                        />
                      </form>
                      <div className = {style.submit}>
                          <button onClick={handleSubmit}>Create Course</button>
                      </div>
                    </div>
                </PopUp>
            </div>
        </div>
    )
}

export default ProfileCourses;
