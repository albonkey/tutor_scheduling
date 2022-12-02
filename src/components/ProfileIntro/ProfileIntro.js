import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './ProfileIntro.module.scss';
import placeholder from './placeholderImage.jpg';
import StarRating from '../StarRating/StarRating.js'
import { getUserInfo } from '../../features/user/userSlice';
import { updateUser } from '../../features/user/userSaveSlice';
import PopUp from '../PopUpComponent/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen as pen } from '@fortawesome/free-solid-svg-icons';

const ProfileIntro = ({userID}) => {
    const dispatch = useDispatch();
	  const user = useSelector((state) => state.user);
    const {success} = useSelector((state) => state.userSave);
    const [bio, setBio] = useState('');
    const [editBio, setEditBio] = useState(false);
    const cancelHandler = () => {
      setEditBio(false);
    }
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUser({
        ...user.userInfo,
        bio: bio,
        id: user.id
      }));
      setEditBio(false);
    }

    useEffect(() => {
        dispatch(getUserInfo(userID)).then((user) => {
          setBio(user.Bio)
        });
    }, [success])

    return(
        <div className = {style.wrapper}>
        {
            user.loading ?
                <div>Page Loading</div>
            :
            user.userInfo ?
                <div className = {style.wrapper}>
                    <div className = {style.info}>
                      <form className={style.about} onSubmit={submitHandler}>
                        <div className = {style.smallText}>3 courses</div>
                        <div className = {style.smallText}>{user.userInfo.TotalSessions ? user.userInfo.TotalSessions : 0} sessions as a student</div>
                        <div className = {style.smallText}>{user.userInfo.TotalSessions ? user.userInfo.TotalSessions : 0} sessions as a tutor</div>

                          <div className={style.bioWrapper}>
                            <div className= {style.heading2}>
                                About me
                            </div>
                            <div className = {style.icons}>
                              {
                                editBio ?
                                <>
                                  <button className={style.cancel} onClick={() => cancelHandler()}>Cancel</button>
                                  <button type='submit'>Update</button>
                                </>
                              :
                                <FontAwesomeIcon icon={ pen } onClick = {() => setEditBio(!editBio)}/>
                            }
                            </div>
                          </div>
                          {
                            editBio ?
                              <textarea className={style.textarea} value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Write something about yourself...' />
                            :
                              <div className={style.bio}>
                                  <p>
                                    {
                                      user.userInfo.Bio ?
                                        user.userInfo.Bio
                                      :
                                        'Write something about yourself so people can get to know you!'

                                    }
                                  </p>
                              </div>
                          }
                        </form>

                      <div className = {style.imageContainer}>
                      {
                          user.userInfo.Picture ? <img src={user.Picture} alt='' className={style.image}/> : <img src={placeholder} alt='' className={style.image} />
                      }
                      </div>

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
