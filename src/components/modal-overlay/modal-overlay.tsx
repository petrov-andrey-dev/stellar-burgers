import s from './modal-overlay.module.css';

type TModaOverlaylProps = {
    children: JSX.Element;
    onClose: () => void;
};

export default function ModalOverlay({children, onClose}: TModaOverlaylProps) {

    return (
        <div className={s.overlay} onClick={() => onClose()}>
            {children}
        </div>
    )
};