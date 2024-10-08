import React from 'react';
import '../styles/Confirmation.css';

const Confirmation = ({ message, onConfirm, onCancel }) => {
    return (
        <>
            <div className="confirmation-overlay"></div> {}
            <div className="confirmation">
                <p className="confirmation-message">{message}</p>
                <div className="confirmation-actions">
                    <button className="confirmation-btn confirm-btn" onClick={onConfirm}>
                        Confirmar
                    </button>
                    <button className="confirmation-btn cancel-btn" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    );
};

export default Confirmation;
