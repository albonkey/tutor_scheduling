import React from 'react';
import style from './ReviewCard.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating';

const ReviewCard = ({review}) => {
    return(
        <div className = {style.wrapper}>
            <div className = {style.info}>
                <div>
                {
                    review.image ? <img img className = {style.image} src={review.image} alt='' /> : <img className = {style.image} src={placeholder} alt='' />
                }
                </div>
                <div className = {style.stars}><StarRating 
                    rating ={review.rating} />
                </div>
                <p>{review.info}</p>
                <h2 className = {style.heading2}>{review.name}</h2>
            </div>
            
        </div>
    )
}

export default ReviewCard;