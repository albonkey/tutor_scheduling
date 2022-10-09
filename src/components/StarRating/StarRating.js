import React from 'react';
import style from './StarRating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOpenStar} from '@fortawesome/free-regular-svg-icons';

const StarRating = ({rating}) => {
    const stars = [];
    const whole = rating.toString().split('.')[0];
    const part = rating.toString().split('.')[1];

    for(let i=0; i< whole; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} />)
    }
    if(part) {
        stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />)
        for(let i=0; i < (4-whole); i++) {
            stars.push(<FontAwesomeIcon icon={faOpenStar} />)
        }
    }
    else {
        for(let i=0; i < (5-whole); i++) {
            stars.push(<FontAwesomeIcon icon={faOpenStar} />)
        }
    }

    return(
        <div className={style.stars}>
            <h2> {stars}</h2>
        </div>

    );
}

export default StarRating;
