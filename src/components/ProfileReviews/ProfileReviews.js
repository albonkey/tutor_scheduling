import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileReviews.module.scss';
import ReviewCard from '../ReviewCard/ReviewCard';
import { listReviews } from '../../features/reviews/reviewsSlice';

const ProfileReviews = ({userID}) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);

    useEffect(() => {
      dispatch(listReviews(userID));
    }, [])

    return(
      <div className = {style.wrapper}>
      {
        reviews.loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        reviews.reviews.length > 0 ?
          <div className = {style.wrapper}>
              <div>
                  <div className= {style.heading2}>Reviews</div>
              </div>
              <div className = {style.cards}>
                {
                  reviews.reviews.map(review => {
                    return <ReviewCard
                        review = {review}
                    />
                  })
                }
              </div>
              <button className = {style.subheading}>Read more</button>
          </div>
        :
        <div className= {style.heading2}>
              Reviews
                <div>No reviews</div>
        </div>
      }
      </div>
    );
}

export default ProfileReviews;
