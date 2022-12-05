import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import style from './SessionDetails.module.scss';
import placeholder from './placeholderImage.jpg';
import { getSession } from '../../features/sessions/sessionInfoSlice';


const SessionDetails = ({ subject, name, level, id  }) => {


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

          </div>

    </div>
    )
}

export default SessionDetails;
