import React from 'react';
import style from './Stars.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOpenStar} from '@fortawesome/free-regular-svg-icons';

const Stars = (rating) => {
/*    return(
        <div className={style.stars}>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfStroke} />
            <FontAwesomeIcon icon={faOpenStar} />
        </div>
    )
*/
    
    let stars = [];
    let whole = rating.toString().split('.')[0];
    let part = rating.toString().split('.')[1];
    
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

export default Stars;