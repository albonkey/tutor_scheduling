import React from 'react';
import style from './SessionDocuments.module.scss';
import DocumentCard from '../DocumentCard/DocumentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as plus} from '@fortawesome/free-solid-svg-icons';

const SessionDocuments = ({documents}) => {
    return(
        <div className = {style.wrapper}>
			<div className= {style.heading}>
                Documents
                <div className = {style.plus}>
                    <FontAwesomeIcon icon = {plus} />
                </div>
            </div>
            <div className = {style.cards}>
                {
                documents.map(document => {
                  return <DocumentCard
                      document = {document}
                  />
                    })
                }
            </div>
		</div>
    )
}

export default SessionDocuments;