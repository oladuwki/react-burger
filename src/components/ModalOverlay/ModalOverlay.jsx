import React from 'react';
import modalOverlay from './ModalOverlay.module.css'

const ModalOverlay = ({ children, onModalClose }) => {
    return (
        <div className={modalOverlay.overlay} onClick={e => e.target === e.currentTarget && onModalClose()}>
            {children}
        </div>
    )
};

export default ModalOverlay;