import React from "react";
import PropTypes from 'prop-types';
import ModalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    const {children, onClose} = props;
    const closePopup = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
      };

    return (
        <section className={ModalOverlayStyles.modal_overlay} onClick={closePopup} backdrop="true">
            {children}
        </section>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;