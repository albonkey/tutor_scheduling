import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileIntro.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating.js'
import { getUserInfo } from '../../features/user/userSlice';
import { updateUser } from '../../features/user/updateUserSlice';
import PopUp from '../PopUpComponent/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen as pen } from '@fortawesome/free-solid-svg-icons';

const ProfileIntro = ({userID}) => {
    const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

    const updateUserSuccess = useSelector((state) => state.updateUserSuccess);

    const [updateInfo, setUpdateInfo] = useState({
        'SK (GSI-1-PK)': 'Details',
        'GSI-1-SK': user.userInfo['GSI-1-SK'],
        Bio: user.userInfo['Bio'],
    });

    const [buttonPopup, setButtonPopup] = useState(false);

    const handleChange = (event) => {
        setUpdateInfo({...updateInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        console.log(updateInfo);
        dispatch(updateUser({...updateInfo, user: userID }));
    }

    useEffect(() => {
        dispatch(getUserInfo(userID))
    }, [updateUserSuccess])

    return(
        <div className = {style.wrapper}>
        {
            user.loading ?
                <div>Page Loading</div> 
            :
            user.userInfo ?
                <div className = {style.wrapper}>
                    {/*Main page - user info */}
                    <div className = {style.info}>
                        <div className= {style.heading} >User Rating</div>
                        <div className={style.stars}>
                            <StarRating rating={user.userInfo.Rating}/>
                        </div>
                        <div className = {style.smallText}>{user.userInfo.TotalSessions} Sessions of tutoring</div>
                        <div className = {style.about}>
                            <div className= {style.heading2}>
                                About me
                            </div>
                            <div className = {style.icon}>
                                <button onClick = {() => setButtonPopup(true)} >
                                    <FontAwesomeIcon icon = { pen } />
                                </button>
                            </div>
                        </div>
                        <div className = {style.heading2}>
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
            {/*Popup page - create a course */}
        <div>
                <PopUp trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                    <div className = {style.form}>
                      <form onSubmit = {handleSubmit}>
                        <div className = {style.formHeading}>
                            Edit Profile
                        </div>
                        <input className = {style.formInputs}
                            type = 'text'
                            name = 'Name'
							defaultValue={user.userInfo['GSI-1-SK']}
                            value = {updateInfo['GSI-1-PK']}
                            onChange = {handleChange}/>
                        <textarea
                            className = {style.formInputs}
                            name = 'Bio'
                            defaultValue={user.userInfo.Bio}
                            value = {updateInfo.Bio}
                            onChange = {handleChange}
                            />
                      </form>
                      <div className = {style.submit}>
                          <button onClick={handleSubmit}>
                            Submit
                          </button>
                      </div>
                    </div>
                </PopUp>
            </div>
        </div>
    )
}

export default ProfileIntro;
