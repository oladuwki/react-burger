import React from "react";
import PropTypes from 'prop-types';
import ModalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    return (
        <section className={ModalOverlayStyles.modal_overlay} onClick={props.onClose} backdrop="true">
            {props.children}
        </section>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;