import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalStyles from './modal.module.css';

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals-root");

const Modal = (props) => {
    const {onClose, title, children} = props;

    useEffect(() => {
        const handleEscapeDown = (e) => {
          if (e.key === 'Escape') {
            onClose(e);
          }
        };
    
        window.addEventListener('keydown', handleEscapeDown);
    
        return () => {
          window.removeEventListener('keydown', handleEscapeDown);
        };
      }, [onClose]);

    return ReactDOM.createPortal((
        <ModalOverlay onClose={onClose}>
            <article className={`${ModalStyles.modal} p-10`}>
                <span backdrop="true" className={ModalStyles.modal__close}>
                    <CloseIcon onClick={onClose} />
                </span>
                <h1 className={`${ModalStyles.modal__header} text text_type_main-large`}>{title}</h1>
                {children}
            </article>
        </ModalOverlay>
    ), modalRoot)
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object.isRequired
}

export default Modal;