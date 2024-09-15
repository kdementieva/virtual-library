import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../error.css'; 

function Error() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-content">
                <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                <h1 className="error-title">Ups! Ta strona nie istnieje.</h1>
                <p className="error-message">
                    Wygląda na to, że strona, której szukasz, jest niedostępna lub została przeniesiona.
                </p>
                <button className="error-button" onClick={() => navigate('/')}>
                    Wróć do strony głównej
                </button>
            </div>
        </div>
    );
}

export default Error;
