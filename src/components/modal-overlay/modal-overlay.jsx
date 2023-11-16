import s from './modal-overlay.module.css'
import PropTypes from 'prop-types';

export default function ModalOverlay({children, onClose}) {

    return (
        <div className={s.overlay} onClick={() => onClose()}>
            {children}
        </div>
    )
};

ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired
};