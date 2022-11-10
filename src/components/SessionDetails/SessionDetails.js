import React, {useState} from 'react';
import StarRating from '../StarRating/StarRating';
import style from './SessionDetails.module.scss';
import placeholder from './placeholderImage.jpg';

const SessionDetails = ({tutor, details,student}) => {
    return(
        <div className = {style.wrapper}>
        {/*Header section*/}
            <div className = {style.link}>
                Return to Sessions
            </div>
            <div className = {style.header}>
                <div className = {style.heading}>Session      
                    <span className = {style.classLevel}>
                        {details.GSI2PK} | {details.Level} 
                    </span>
                </div>
                <div className =  {style.id}>
                        #{details.PK}  
                </div>
            </div>
        {/*Tutor section*/}
            <div className = {style.tutor}>
                <div className = {style.heading}>
                    Tutor {tutor.PK}
                    <div className = {style.stars1}>
                    <StarRating rating={tutor.Rating}/>
                    </div>
                    <div className = {style.heading}>
                        Time
                    </div>
                    <div className = {style.info}>
                        {details.StartOn}
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
                        {details.Description}
                    </div>
                </div>
            </div>
        {/*Student section*/}
            <div className = {style.student}>
                <div className = {style.sub1}>
                    <div className = {style.sub2}>
                        <div className = {style.heading}>
                            Student {student.PK}
                        </div>
                        <div className = {style.stars2}>
                            <StarRating rating={tutor.Rating}/>
                        </div>
                    </div>
                    <div className = {style.heading}>
                        What {student.PK} wants from the session
                    </div>
                    <div className = {style.heading}>
                        <div className = {style.info}>
                            {details.Description}
                        </div>
                     </div>
                </div>
                <div className = {style.imageContainer}>
                    {
                        tutor.Picture ? <img src={tutor.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                    }
                    </div>
                </div>
        </div>
    )
}

export default SessionDetails;