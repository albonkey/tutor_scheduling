import React from 'react';
import style from './ProfileReviews.module.scss';
import ReviewCard from '../ReviewCard/ReviewCard';

const ProfileReviews = ({reviews}) => {
  const reviewsShort = reviews.slice(0,3);
    return(
        <div className = {style.wrapper}>
            <div>
                <div className= {style.heading2}>Reviews</div>
            </div>
            <div className = {style.cards}>
              {
                reviewsShort.map(review => {
                  return <ReviewCard
                      review = {review}
                  />
                })
              }
            </div>
            <button className = {style.subheading}>Read more</button>
        </div>
    );
}

export default ProfileReviews;
