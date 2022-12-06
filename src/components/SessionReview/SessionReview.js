import React, {useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './SessionReview.module.scss';
import { reviewSave } from '../../features/reviews/reviewSaveSlice';
import { getReview } from '../../features/reviews/reviewInfoSlice';
import ReviewCard from '../ReviewCard/ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOpenStar} from '@fortawesome/free-regular-svg-icons';
import StarRating from '../StarRating/StarRating';

const SessionReview = ({session}) => {
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [writeNote, setWriteNote] = useState(false);

    const {review, loading} = useSelector((state) => state.reviewInfo);
    const {success} = useSelector((state) => state.reviewSave);
    const [reviewInfo, setReviewInfo] = useState({
        description: "",
        rating: "",
    });

    const handleChange = (event) => {
        setReviewInfo({ ...reviewInfo, [event.target.name]: event.target.value });
      };


      const submitHandler = (event) => {
        event.preventDefault();
        const sessionId = session['SK (GSI-1-PK)'].substr(8);
        const courseId = session['CourseId'].substr(7);
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
          courseId: courseId,
          sessionId: sessionId

        }))
         };

      useEffect(() => {
        if(session.ReviewId){
          const reviewId = session.ReviewId.substr(7);
          dispatch(getReview(reviewId));
        }
	    }, [success])

    return(
        <div className = {style.wrapper}>
          <div className= {style.heading}>Review</div>
            {
                loading ?
            <div className = {style.heading2}>Page loading</div>
        :
        (session.ReviewId && review) ?
          <div className = {style.reviewWrapper}>
          {/* LOAD REVIEW CARD */}
            <div className={style.reviewInfo}>
              <div className={style.reviewComment}>{review.Description}</div>
              <StarRating rating={review.Rating} />
            </div>

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
                      {
                        writeNote ?
                          <textarea className = {style.formInputs}
                              type = 'text'
                              name = 'description'
                              value = {reviewInfo.description}
                              onChange = {handleChange}
                              placeholder='What did you think about the session...'
                          />
                        :
                          <button onClick = { () => setWriteNote(true)} className={style.addNote}>
                              Add Note
                          </button>
                      }
                    <button type='submit' className = {style.submit}>
                        Post Review
                    </button>
                </form>
            }
        </div>
    )
}

export default SessionReview;
