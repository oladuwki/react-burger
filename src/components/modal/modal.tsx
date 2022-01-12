import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';

// @ts-ignore
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
    CLOSE_MODAL,
    SET_MODAL_TYPE,
} from '../../services/actions/burgerVendor';

type TLocationState = {
    background?: Location;
};

const Modal: FC = ({ children }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<TLocationState | undefined>();
    const currentModalType = useAppSelector(state => state.burgerVendor.currentModalType);

    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    }

    const handleClose = () => {
        return history.push({
            state: { background: location },
        })
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