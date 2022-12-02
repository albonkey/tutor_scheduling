// components/Layout.js
import React from 'react';
import style from './Layout.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';
import TopMenu from '../TopMenu/TopMenu';
import SideMenu from '../SideMenu/SideMenu';
const Layout = () => {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
		context.signOut
  ]);
  const navigate = useNavigate();

  return (
		<>
			<TopMenu status={route} signOut={signOut}/>
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
