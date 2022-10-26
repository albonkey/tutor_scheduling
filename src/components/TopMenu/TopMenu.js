import React from 'react';
import style from './TopMenu.module.scss';
import logo from '../../assets/logo_light.png';
const TopMenu = ({signOut}) => {
	 return(
		 <header className={style.topMenu}>
		 	<img src={logo} className={style.logo}/>
			<button className={style.actions} onClick={signOut}>
				Sign out
			</button>
		 </header>
	 )
}
export default TopMenu;
