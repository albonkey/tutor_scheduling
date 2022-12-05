import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import style from './SessionDetails.module.scss';
import placeholder from './placeholderImage.jpg';
import { getSession } from '../../features/sessions/sessionInfoSlice';
import { sessionTutor } from '../../features/sessions/sessionTutorSlice';

const SessionDetails = ({ subject, name, level, id  }) => {


    return(
        <div className = {style.wrapper}>
        {/*Header section*/}
            <div>
                <Link className={style.link} to={`/sessions`}>Return to Sessions</Link>
            </div>
            <div className = {style.header}>
                <div className = {style.heading}>Session
                    <span className = {style.classLevel}>
                        {subject} | {level}
                    </span>
                </div>
                <div className =  {style.id}>
                        #{id}
                </div>
            </div>

        {/*Tutor section: display= name, rating, startOn, Description*/}
            <div className = {style.tutor}>
                <div className = {style.heading}>

{/*
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
*/}
                </div>
            </div>

        {/*Student section*/}
{/*
            <div className = {style.student}>
                <div className = {style.sub1}>
                    <div className = {style.sub2}>
                        <div className = {style.heading}>
                            Student {session.StudentID}
                        </div>
                        <div className = {style.stars2}>
                            <StarRating rating={tutor.Rating}/>
                        </div>
                    </div>
                    <div className = {style.heading}>
                        What {session.StudentName} wants from the session
                    </div>
                    <div className = {style.heading}>
                        <div className = {style.info}>
                            {session.Description}
                        </div>
                     </div>
                </div>
                <div className = {style.imageContainer}>
                    {
                        tutor.Picture ? <img src={tutor.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                    }
                    </div>
                </div>
    */}
        </div>
    )
}

export default SessionDetails;
