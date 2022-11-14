import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileIntro.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating.js'
import { getUserInfo } from '../../features/user/userSlice';

const ProfileIntro = ({userID}) => {
    const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserInfo(userID))
    }, [])

    return(
        <div className = {style.wrapper}>
        {
            user.loading ?
                <div>Page Loading</div> 
            :
            user.userInfo ?
                <div className = {style.wrapper}>
                    <div className = {style.info}>
                        <div className= {style.heading} >User Rating</div>
                        <div className={style.stars}>
                            <StarRating rating={user.userInfo.Rating}/>
                        </div>
                        <div className = {style.smallText}>{user.userInfo.TotalSessions} Sessions of tutoring</div>
                        <div className= {style.heading2}>About me
                            <p>{user.userInfo.Bio}</p>
                        </div>
                    </div>
                    <div className = {style.imageContainer}>
                    {
                        user.userInfo.Picture ? <img src={user.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                    }
                    </div>
                </div>
            :
            <div className= {style.heading2}>
              User 
                <div>No information</div>
            </div>
        }
        </div>
    )
}

export default ProfileIntro;
