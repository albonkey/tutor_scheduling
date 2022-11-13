import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {listCourses} from '../../features/courses/coursesSlice';
import style from './ProfileCourses.module.scss';
import CourseCard from '../CourseCard/CourseCard';
import PopUp from '../PopUpComponent/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as plus } from '@fortawesome/free-solid-svg-icons';

const ProfileCourses = ({id}) => {
  const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
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
    console.log(courseInfo);
    setCourseInfo({ Subject: "", Level: "", Description: "" });
  };

  useEffect(() => {
		dispatch(listCourses(id));
	}, [])

    return(
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
            <div>
                {
                  courses.map(course => {
                    return <CourseCard course={course}/>
                  })
                }
            </div>

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
