import React from 'react';
import style from './SessionReview.module.scss';
import StarRating from '../StarRating/StarRating';

const SessionReview = ({}) => {
    return(
        <div className = {style.wrapper}>
			<div className= {style.heading}>
                Review
            </div>
            <div className = {style.content}>
                <div className = {style.stars}>
                    <StarRating rating= '0'/>
                </div>
                <div className = {style.text}>
                    Add Note
                </div>
                <button className = {style.button}>
                    Submit Review
                </button>
            </div>
        </div>
    )
}

export default SessionReview;