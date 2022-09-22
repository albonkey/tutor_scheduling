import React from 'react';
import style from './ProfileIntro.module.scss';
// First import the FontAwesomeIcon component.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Then import whatever component you want to use
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ProfileIntro = ({name, rating, nrOfSessions, bio, image}) => {
	 return(
		 <div className={style.wrapper}>
		 	<div className={style.info}>
				<h3 className={style.heading}>Tutor Rating</h3>
				<div className={style.stars}>
					<FontAwesomeIcon icon={faStar} />
					<FontAwesomeIcon icon={faStar} />
					<FontAwesomeIcon icon={faStar} />
					<FontAwesomeIcon icon={faStar} />
					<FontAwesomeIcon icon={faStar} />
				</div>
				<div className={style.nrOfSessions}>Nr of Sessions {nrOfSessions}</div>
				<h4 className={style.heading2}>About me</h4>
				<p>{bio}</p>
			</div>
			<div className={style.image}>
				{
					image ?
						<img src={img} />
						:
						<img src={pathToPlaceholderImage}/>

				}
			</div>
		 </div>
	 )
}
export default ProfileIntro;
