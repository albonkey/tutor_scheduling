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
      {
        reviews.loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        reviews.reviews.length > 0 ?
          <div className = {style.wrapper}>
          {/*Main page - load courses */}
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
                <div>
                  <button onClick = { () => setButtonPopup(true)} >
                      Review session
                  </button>
                </div>
        </div>
      }
      {/*Popup page - create a course */}
      <div>
                <PopUp trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                    <div className = {style.form}>
                      <form onSubmit = {handleSubmit}>
                        <div className = {style.formHeading}>
                            Review session
                        </div>
                        <div className = {style.title}>
                            Comment
                        </div>
                        <textarea className = {style.formInputs}
                            name = 'Description'
                            value = {reviewInfo.Description}
                            onChange = {handleChange}
                        />
                        <div className = {style.title}>
                            Rating
                        </div>
                        <input className = {style.formInputs}
                            type = 'text'
                            name = 'Subject'
                            value = {reviewInfo.Subject}
                            onChange = {handleChange}
                        />
                      </form>
                      <div className = {style.submit}>
                          <button onClick={handleSubmit}>Create Course</button>
                      </div>
                    </div>
                </PopUp>
            </div>

      </div>
    );
}

export default ProfileReviews;
