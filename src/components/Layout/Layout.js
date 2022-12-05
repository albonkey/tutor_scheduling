// components/Layout.js
import React from 'react';
import style from './Layout.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';
import { useDispatch } from 'react-redux';
import {userSignOut} from '../../features/user/userSlice';
import TopMenu from '../TopMenu/TopMenu';
import SideMenu from '../SideMenu/SideMenu';

const Layout = () => {
  const dispatch = useDispatch();
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
		context.signOut
  ]);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(userSignOut());
    signOut();

  }
  return (
		<>
			<TopMenu status={route} signOut={handleSignOut}/>
	    <div className={style.mainView}>

	      <View>
	        {route === 'authenticated' &&
						<SideMenu />
					}
	      </View>

	      <Outlet />
	    </div>
		</>
  );
}

export default Layout;
