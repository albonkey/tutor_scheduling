import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import style from './SessionDetails.module.scss';
import placeholder from './placeholderImage.jpg';
import { getSession } from '../../features/sessions/sessionInfoSlice';
import image from './placeholderImage.jpg';

const SessionDetails = ({ subject, tutor, student, level, id, rating, date, time , description, sessionNeeds }) => {


    return(
        <div className = {style.wrapper}>
          <div className={style.header}>
            <Link className={style.link} to={`/sessions`}>Return to Sessions</Link>
            <div className={style.headerInfo}>
              <span className={style.sessionHeading}>{subject}</span>
              <span>{level}</span>
            </div>
          </div>
          <div className={style.tutorInfo}>
            <div className={style.info}>
              <div className={style.header2}>
                {`Tutor ${tutor?.firstName} ${tutor?.lastName}`}
              </div>
              <StarRating rating={rating} />
              <div className={style.header2}>
                Time
              </div>
              <div className={style.infoAttribute}>{`${date} ${time}`}</div>
              <div className={style.header2}>Location</div>
              <div className={style.infoAttribute}>Online</div>
              <div className={style.header2}>About Course</div>
              <div className={style.infoAttribute}>{description}</div>
            </div>
            <img src={image} className={style.image}/>
          </div>
          <div className={style.studentInfo}>
            <div className={style.info}>
              <div className={style.header2}>
                {`Student ${student?.firstName} ${student?.lastName}`}
              </div>
              <StarRating rating={rating} />
              <div className={style.header2}>
                Goals for Session
              </div>
              <div className={style.infoAttribute}>{sessionNeeds}</div>
            </div>
            <img src={image} className={style.imageStudent}/>
          </div>
    </div>
    )
}

export default SessionDetails;
