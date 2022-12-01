import React, {useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './SessionReview.module.scss';
import { reviewSave } from '../../features/reviews/reviewSaveSlice';
import { getReview } from '../../features/reviews/getReviewSlice';
import ReviewCard from '../ReviewCard/ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOpenStar} from '@fortawesome/free-regular-svg-icons';
import PopUp from '../PopUpComponent/PopUp';

const SessionReview = ({ id }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const reviews = useSelector((state) => state.getReview);
    const reviewSaveSuccess = useSelector((state) => state.reviewSave);
    const [reviewInfo, setReviewInfo] = useState({
        Description: "",
        Rating: "",
    });
    
    const [buttonPopup, setButtonPopup] = useState(false);

    const handleChange = (event) => {
        setReviewInfo({ ...reviewInfo, [event.target.name]: event.target.value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(reviewSave({...reviewInfo, user: user.id }))
         };

      useEffect(() => {
        dispatch(getReview(user.id))
	}, [reviewSaveSuccess])


    return(
        <div className = {style.wrapper}>
            {
                reviews.loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        reviews.review ?
          <div className = {style.wrapper}>
          {/* LOAD REVIEW CARD */}
              <div>
                  <div className= {style.heading}>Reviews</div>
              </div>
              <div className = {style.cards}>
                   <ReviewCard
                        review = {reviews.review}
                    />
              </div>
              <button className = {style.subheading}>Read more</button>
          </div>
                :
                <div className = {style.content}>
            {/* REVIEW STAR RATING */}
                    <div className = {style.starSection}>
                        <div className = {style.stars}>
                            {[...Array(5)].map((star, index) => {
                                const ratingVal = index + 1;

                                return (
                                    <label>
                                        <input
                                            type = 'radio'
                                            name = 'rating'
                                            value = {ratingVal}
                                            onClick = {() => setRating (ratingVal)}
                                            onChange = {handleChange}
                                            />
                                        {
                                            ratingVal <= (hover || rating) ? 
                                            <FontAwesomeIcon 
                                                icon = {faStar}
                                                onMouseEnter = {() => setHover(ratingVal)} 
                                                onMouseLeave = {() => setHover(null)} />
                                            : 
                                            <FontAwesomeIcon 
                                                icon = {faOpenStar}
                                                onMouseEnter = {() => setHover(ratingVal)} 
                                                onMouseLeave = {() => setHover(null)} />
                                        }   
                                    </label>
                                )
                            })} 
                        </div>
                    </div>   
                    <div className = {style.text}>
                        <button onClick = { () => setButtonPopup(true)} >
                            Add Note
                        </button>
                    </div>
                    <div className = {style.submit}>
                        <button onClick = {handleSubmit}>
                            Create Review
                        </button>
                    </div>
                </div>
            }
            {/* POPUP PAGE ADD REVIEW COMMENT */}
        <div>
                <PopUp trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                    <div className = {style.form}>
                      <form onSubmit = {handleSubmit}>
                        <div className = {style.formHeading}>
                            Create Review
                        </div>
                        <div className = {style.title}>
                            Comment
                        </div>
                        <textarea className = {style.formInputs}
                            type = 'text'
                            name = 'description'
                            value = {reviewInfo.description}
                            onChange = {handleChange}
                        />
                      </form>
                      <div className = {style.submit}>
                          <button onClick={handleSubmit}>Add comment</button>
                      </div>
                    </div>
                </PopUp>
            </div>
        </div>
    )
}

export default SessionReview;