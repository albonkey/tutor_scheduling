import React from 'react';
import style from './ProfileReviews.module.scss';
import ReviewCard from '../ReviewCard/ReviewCard';

const ProfileReviews = ({reviews}) => {

    return(
        <div className = {style.wrapper}>
            <div>
                <div className= {style.heading2}>Reviews</div>
            </div>
            <div className = {style.cards}>
                <ReviewCard 
                    review = {reviews.review[0]}
                />
                <ReviewCard 
                    review = {reviews.review[1]}
                />
                <ReviewCard 
                    review = {reviews.review[2]}
                />
            </div>
            <div className = {style.subheading}>Read more</div>
        </div>
    );
}

export default ProfileReviews;