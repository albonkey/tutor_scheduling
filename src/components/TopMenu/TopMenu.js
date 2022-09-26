import React from 'react';
import style from './TopMenu.module.scss';
import logo from '../../assets/logo_light.png';
const TopMenu = () => {
	 return(
		 <header className={style.topMenu}>
		 	<img src={logo} className={style.logo}/>
			<div className={style.actions}>
				Sign out
			</div>
		 </header>
	 )
}
export default TopMenu;
