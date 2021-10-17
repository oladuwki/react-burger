import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalStyles from './modal.module.css';

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals-root");

const Modal = (props) => {

    const pressEscHandle = (e) => {
        if (e.code === 'Escape') {
            props.onClose(e);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', pressEscHandle)

        return () => {
            document.removeEventListener('keydown', pressEscHandle)
        }
    }, [])

    return ReactDOM.createPortal((
        <ModalOverlay onClose={props.onClose}>
            <article className={`${ModalStyles.modal} p-10`}>
                <span backdrop="true" className={ModalStyles.modal__close}>
                    <CloseIcon onClick={props.onClose} />
                </span>
                <h1 className={`${ModalStyles.modal__header} text text_type_main-large`}>{props.title}</h1>
                {props.children}
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