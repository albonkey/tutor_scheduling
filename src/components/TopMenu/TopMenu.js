import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import style from './TopMenu.module.scss';
import logo from '../../assets/logo_light.png';


const TopMenu = ({status, signOut}) => {
	 return(
		 <header className={style.topMenu}>
		 	<Link to='/' className={style.logo}>
		 		<img src={logo} className={style.logo}/>
			</Link>

			{
				status === 'authenticated' ?
					<button className={style.actions} onClick={signOut}>
						Sign out
					</button>
				:
				<Link to='/login' className={style.actions}>
					Sign In
				</Link>
			}
		 </header>
	 )
}
export default TopMenu;
