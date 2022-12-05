import React, {useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './SessionReview.module.scss';
import { reviewSave } from '../../features/reviews/reviewSaveSlice';
import { getReview } from '../../features/reviews/reviewInfoSlice';
import ReviewCard from '../ReviewCard/ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOpenStar} from '@fortawesome/free-regular-svg-icons';
import PopUp from '../PopUpComponent/PopUp';

const SessionReview = ({session}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [writeNote, setWriteNote] = useState(false);

    const {review} = useSelector((state) => state.reviewInfo);
    const reviewSaveSuccess = useSelector((state) => state.reviewSave);
    const [reviewInfo, setReviewInfo] = useState({
        description: "",
        rating: "",
    });

    const [buttonPopup, setButtonPopup] = useState(false);

    const handleChange = (event) => {
        setReviewInfo({ ...reviewInfo, [event.target.name]: event.target.value });
      };

      const submitHandler = (event) => {
        event.preventDefault();
        dispatch(reviewSave({
          ...reviewInfo,
          tutor: {
            id: session.Tutor.id,
            firstName: session.Tutor.firstName,
            lastName: session.Tutor.lastName,
          },
          student: {
            id: session.Student.id,
            firstName: session.Student.firstName,
            lastName: session.Student.lastName,
          },
          courseId: session.courseId,
          sessionId: session.id

        }))
         };

      useEffect(() => {
        if(session.reviewId){
          dispatch(getReview(session.reviewId));
        }

	}, [reviewSaveSuccess])


    return(
        <div className = {style.wrapper}>
            {
                review.loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        review ?
          <div className = {style.wrapper}>
          {/* LOAD REVIEW CARD */}
              <div>
                  <div className= {style.heading}>Reviews</div>
              </div>
              <div className = {style.cards}>
                   <ReviewCard
                        review = {review}
                    />
              </div>
              <button className = {style.subheading}>Read more</button>
          </div>
                :
                <form className = {style.content} onSubmit={submitHandler}>
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
                      {
                        writeNote ?
                          <textarea className = {style.formInputs}
                              type = 'text'
                              name = 'description'
                              value = {reviewInfo.description}
                              onChange = {handleChange}
                          />
                        :
                          <button onClick = { () => setWriteNote(true)} >
                              Add Note
                          </button>
                      }

                    </div>
                    <div className = {style.submit}>
                        <button type='submit'>
                            Create Review
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default SessionReview;
