import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import style from './SessionDetails.module.scss';
import placeholder from './placeholderImage.jpg';
import { getSession } from '../../features/sessions/sessionInfoSlice';
import image from './placeholderImage.jpg';

const SessionDetails = ({ subject, tutor, level, id, rating  }) => {


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
            </div>
            <img src={image} className={style.image}/>
          </div>

    </div>
    )
}

export default SessionDetails;
