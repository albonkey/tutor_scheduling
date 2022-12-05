import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './SideMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPerson, faEarth, faPersonChalkboard, faCreditCard, faGear, faFileLines, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';

const SideMenu = () => {
	const {userInfo, id} = useSelector((state) => state.user);

	 return(
	 	<nav className={style.sideMenu}>
			{
				userInfo &&
					<ul className={style.list}>
						<li>
							 <NavLink to="/" className={style.listItem}>
								 <FontAwesomeIcon icon={faHome} fixedWidth/>
								 <span className={style.listItemText}>Home</span>
							 </NavLink>
						</li>
						<li>
							<NavLink to={`/profile/${id}`} className={style.listItem}>
								<FontAwesomeIcon icon={faPerson} fixedWidth />
								<span className={style.listItemText}>{`${userInfo.FirstName} ${userInfo.LastName}`}</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/discover" className={style.listItem}>
								<FontAwesomeIcon icon={faEarth} fixedWidth />
								<span className={style.listItemText}>Discover</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/sessions" className={style.listItem}>
								<FontAwesomeIcon icon={faPersonChalkboard} fixedWidth />
								<span className={style.listItemText}>Sessions</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/payments" className={style.listItem}>
								<FontAwesomeIcon icon={faCreditCard} fixedWidth />
								<span className={style.listItemText}>Payments</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/settings" className={style.listItem}>
								<FontAwesomeIcon icon={faGear} fixedWidth />
								<span className={style.listItemText}>Settings</span>
							</NavLink>
						</li>
					</ul>
				}

		</nav>
	 )
}
export default SideMenu;
