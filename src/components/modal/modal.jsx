import React from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import s from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { closeModal } from "../../services/modalSlice";
import { useDispatch } from "react-redux";

const rootModal = document.querySelector('#root-modals');

export default function Modal({ children }) {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const onCloseEsc = (e) => {
            if (e.key === 'Escape') {
                dispatch(closeModal())
            }
        };
        document.addEventListener('keydown', onCloseEsc);
        return () => {
            document.removeEventListener('keydown', onCloseEsc);
        }
    });

    return ReactDOM.createPortal(
        (
            <ModalOverlay>
                <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                    <button className={s.close} type="button" onClick={() => dispatch(closeModal())}>
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
    children: PropTypes.array.isRequired
};
