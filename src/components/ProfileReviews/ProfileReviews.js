import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileReviews.module.scss';
import ReviewCard from '../ReviewCard/ReviewCard';
import { listReviews } from '../../features/reviews/reviewListSlice';
import { reviewSave } from '../../features/reviews/reviewSaveSlice';
import PopUp from '../PopUpComponent/PopUp';

const ProfileReviews = ({userID}) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);
    const reviewSaveSuccess = useSelector((state) => state.reviewSave);

    const [reviewInfo, setReviewInfo] = useState({
        Description: '',
        Rating: '',
    })

    const [buttonPopup, setButtonPopup] = useState(false);

    const handleChange = (event) => {
      setReviewInfo({ ...reviewInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(reviewSave({...reviewInfo, user: userID }));
      setReviewInfo({ Description: '', Rating: '' });
    };

    useEffect(() => {
      dispatch(listReviews(userID));
    }, [reviewSaveSuccess])

    return(
      <div className = {style.wrapper}>
        <div className= {style.heading2}>
              Reviews
        </div>
      {
        reviews.loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        reviews.reviews.length > 0 ?
          <div className = {style.wrapper}>
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
        <div className={style.placeholder}>
          No reviews for this user yet...
        </div>
      }
      </div>
    );
}

export default ProfileReviews;
