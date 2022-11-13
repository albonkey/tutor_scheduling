import React from 'react';
import style from './PopUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark as xmark } from '@fortawesome/free-solid-svg-icons';

function PopUp(props) {
    return (props.trigger) ? (
        <div className = {style.popup}>
            <div className = {style.popupInner}>
                <button className = {style.closeBtn} onClick = {() => props.setTrigger(false)}>
                    <FontAwesomeIcon icon = {xmark} />
                </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default PopUp