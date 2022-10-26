import React from 'react';
import style from './ProfileIntro.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating.js'

const ProfileIntro = ({user}) => {
    return(
        <div className = {style.wrapper}>
            <div className = {style.info}>
                <div className= {style.heading}>Tutor Rating</div>
                <div className={style.stars}>
                      <StarRating rating={user.Rating}/>
                </div>
                <div className = {style.smallText}>{user.TotalSessions} Sessions of tutoring</div>
                <div className= {style.heading2}>About me</div>
                <p>{user.Bio}</p>
            </div>
            <div className = {style.imageContainer}>
                {
                    user.Picture ? <img src={user.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                }
            </div>
        </div>
    )
}

export default ProfileIntro;
