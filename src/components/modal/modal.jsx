import React from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import s from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modals');

export default function Modal({ children, onClose }) {

    React.useEffect(() => {
        const onCloseEsc = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        };

        document.addEventListener('keydown', onCloseEsc);

        return () => {
            document.removeEventListener('keydown', onCloseEsc);
        }
    });

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={onClose} >
                <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                    <button className={s.close} type="button" onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
            </ModalOverlay>
        )
        ,
        rootModal);
};

Modal.propTypes = {
    children: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
};
