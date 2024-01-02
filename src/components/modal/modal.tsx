import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import s from './modal.module.css';

const rootModal = document.querySelector('#root-modals') as HTMLElement;

type TModalProps = {
    children: JSX.Element;
    onClose: () => void;
};

export default function Modal({ children, onClose }: TModalProps) {

    useEffect(() => {
        const onCloseEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onCloseEsc);
        return () => {
            document.removeEventListener('keydown', onCloseEsc);
        }
    });

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={onClose}>
                <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                    <button className={s.close} type="button" onClick={() => onClose()}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
            </ModalOverlay>
        )
        ,
        rootModal);
};
