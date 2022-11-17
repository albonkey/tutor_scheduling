import { getByTitle } from '@testing-library/react';
import React from 'react';
import style from './DocumentCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload as download} from '@fortawesome/free-solid-svg-icons';
import { faXmark as xmark} from '@fortawesome/free-solid-svg-icons';

const DocumentCard = ({document}) => {
    return(
        <div className = {style.wrapper}>
            <div className = {style.info}>
                <div className = {style.sub1}>
                    <div className = {style.align}>{document.title}</div>
                    <div className = {style.align}>{document.date}</div>
                    <div className = {style.align}> {document.type}</div>
                </div>
                <div className = {style.sub2}>
                    <div className = {style.download}>
                        <FontAwesomeIcon icon = {download} />
                    </div>
                    <div className = {style.xmark}>
                        <FontAwesomeIcon icon = {xmark} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentCard;