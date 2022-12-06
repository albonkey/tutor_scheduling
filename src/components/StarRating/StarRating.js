import React from 'react';
import style from './StarRating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOpenStar} from '@fortawesome/free-regular-svg-icons';

const StarRating = ({rating, small}) => {
    const stars = [];
    let currentRating = rating;

    for(let i = 0; i < 5; i++){
      if(currentRating >= 1){
        stars.push(<FontAwesomeIcon icon={faStar} />)
      } else if (currentRating > 0.3){
        stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />)
      } else{
        stars.push(<FontAwesomeIcon icon={faOpenStar} />)
      }
        currentRating--;
    }


    return(
        <div className={style.stars}>
          {
            small ?
              <div>
                <FontAwesomeIcon icon={faStar} /> {rating}
              </div>
            :
            <h2> {stars}</h2>
          }

        </div>

    );
}

export default StarRating;
