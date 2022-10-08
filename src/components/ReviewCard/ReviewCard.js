import React from 'react';
import style from './ReviewCard.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating';

const ReviewCard = ({review}) => {
    return(
        <div className = {style.wrapper}>
          <div className={style.info}>
            {
              review.image ?
                <img img className = {style.image} src={review.image} alt='' />
                :
                <img className = {style.image} src={placeholder} alt='' />
            }
              <div className = {style.stars}>
                <StarRating rating ={review.rating} />
              </div>
              <p className={style.quote}>{review.info}</p>
              <div className = {style.heading2}>{review.name}</div>
            </div>
        </div>
    )
}

export default ReviewCard;
