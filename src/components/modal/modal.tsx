import React, {FC, ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
    children: ReactNode;
    handleClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, handleClose }) => {
    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    }

    useEffect(() => {
        const escHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        }
        document.addEventListener('keydown', escHandler);
        return () => document.removeEventListener('keydown', escHandler);
    })

    return ReactDOM.createPortal(
        (
            <ModalOverlay handleClick={handleClose} >
                <article className={modalStyles.modal} onClick={stopPropagation}>
                    <button onClick={handleClose} className={modalStyles.closeButton}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </article>
            </ModalOverlay>
        ), modalRoot
    );
}

export default Modal;