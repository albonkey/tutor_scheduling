import React from 'react';
import style from './ProfileIntro.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating.js'

const ProfileIntro = ({name, rating, nrOfSessions, bio, image}) => {
    return(
        <div className = {style.wrapper}>
            <div className = {style.info}>
                <h3 className= {style.heading}>Tutor Rating</h3>
                <div className = {style.heading2}>
                    <StarRating rating={rating} />
                </div>
                <div className = {style.heading2}>{nrOfSessions} sessions of tutoring</div>
                <h4 className= {style.heading2}>About me</h4>
                <p>{bio}</p>
            </div>
            <div className = {style.image}>
                {
                    image ? <img src={image} alt='' /> : <img src={placeholder} alt='' />
                }
            </div>
        </div>
    )
}

export default ProfileIntro;
