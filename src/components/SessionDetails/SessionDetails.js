import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import style from './SessionDetails.module.scss';
import placeholder from './placeholderImage.jpg';
import { getSession } from '../../features/sessions/getSessionSlice';
import { sessionTutor } from '../../features/sessions/sessionTutorSlice';

const SessionDetails = ({ id }) => {
    const dispatch = useDispatch();
	const sessionID = id.split('-')[1];
	const sessionInfo = useSelector((state) => state.getSession); 
    const [session, setSession] = useState({});
    const [student, setStudent] = useState({});
    const [tutor, setTutor] = useState({});

	useEffect(() => {
		dispatch(getSession(sessionID));

        setSession(sessionInfo.session[0]);
        setStudent(sessionInfo.session[1]);
        setTutor(sessionInfo.session[2])
	}, [])

    console.log(student);

    return(
        <div className = {style.wrapper}>
        {/*Header section*/}
            <div>
                <Link className={style.link} to={`/sessions`}>Return to Sessions</Link>
            </div>
            <div className = {style.header}>
                <div className = {style.heading}>Session      
                    <span className = {style.classLevel}>
                        {session['GSI-2-PK']} | {session['Level']}
                    </span>
                </div>
                <div className =  {style.id}>
                        #{session['SK (GSI-1-PK)']}  
                </div>
            </div>

        {/*Tutor section: display= name, rating, startOn, Description*/}
            <div className = {style.tutor}>
                <div className = {style.heading}>
                    <div>Tutor: </div>
                    <div>{student.TutorName}</div>
                    <div className = {style.stars1}>   
                    <StarRating rating={tutor.Rating}/>
                    </div>
                    <div className = {style.heading}>
                        Time
                    </div>
                    <div className = {style.info}>
                        {session.StartOn}
                    </div>
                    <div className = {style.heading}>Location</div>
                    <div className = {style.info}>Online</div>
                </div>
                <div className = {style.imageContainer}>
                {
                    tutor.Picture ? <img src={tutor.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                }
                </div>
            </div>
            <div className = {style.about}>
                <div className = {style.heading}>About Course
                    <div className = {style.info}>
                        {session.Description}
                    </div>
                </div>
            </div>

        {/*Student section*/}
            <div className = {style.student}>
                <div className = {style.sub1}>
                    <div className = {style.sub2}>
                        <div className = {style.heading}>
                            <div>Student : {tutor.StudentName}</div>
                        </div>
                        <div className = {style.stars2}>
                            <StarRating rating={student.Rating}/>
                        </div>
                    </div>
                    <div className = {style.heading}>
                        What {tutor.StudentName} wants from the session
                    </div>
                    <div className = {style.heading}>
                        <div className = {style.info}>
                            {student.Description}
                        </div>
                     </div>
                </div>
                <div className = {style.imageContainer}>
                    {
                        student.Picture ? <img src={student.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                    }
                    </div>
                </div>
        </div>
    )
}

export default SessionDetails;