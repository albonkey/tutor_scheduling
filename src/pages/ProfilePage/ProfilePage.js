import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import style from './ProfilePage.module.scss';
import ProfileIntro from '../../components/ProfileIntro/ProfileIntro';
import ProfileCourses from '../../components/ProfileCourses/ProfileCourses';
import ProfileReviews from '../../components/ProfileReviews/ProfileReviews';
import { updateUser } from '../../features/user/updateUserSlice';
import PopUp from '../../components/PopUpComponent/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen as pen } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
	const { id } = useParams();
	const userID = id;
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const updateUserSuccess = useSelector((state) => state.updateUser);

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
        dispatch(updateUser({...updateInfo, user: userID }));
    }

	 return(
		<div className={style.page}>
			<div className = {style.name_banner}>
				<div className={style.header}>
					{user.userInfo['GSI-1-SK']}
				</div>
				<div className = {style.icon}>
					<button onClick = {() => setButtonPopup(true)} >
						<FontAwesomeIcon icon = { pen } />
					</button>
				</div>
			</div>
			{
				user && <ProfileIntro userID = {id}/>
			}

			{
				<ProfileCourses userID = {id}/>
			}

			{
				<ProfileReviews userID = {id} />
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
export default ProfilePage;
