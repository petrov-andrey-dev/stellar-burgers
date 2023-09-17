import s from './modal-overlay.module.css'
import PropTypes from 'prop-types';
import { closeModal } from '../../services/modalSlice';
import { useDispatch } from 'react-redux';

export default function ModalOverlay({children}) {
    const dispatch = useDispatch();

    return (
        <div className={s.overlay} onClick={() => dispatch(closeModal())}>
            {children}
        </div>
    )
};

ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired
};