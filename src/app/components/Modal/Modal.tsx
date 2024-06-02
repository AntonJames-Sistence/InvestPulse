import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>x</button>
            {children}
        </div>
        </div>
    )

}

export default Modal;