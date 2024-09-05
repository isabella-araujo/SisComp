import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import Container from './Container';

export default function Modal({ children, open }) {
    if (open) {
        return (

            <div style={styles.modal}>
                <Container>
                    <div style={styles.modalHeader}>
                        <IoClose />
                    </div>
                    {children}
                </Container>
            </div>
        )
    } else {
        return null;
    }
}

const styles = {
    modal: {
        position: 'fixed',
        top:'50%',
        left: '50%',
        zIndex: '1000',
        transform: 'translate(-50%, -50%)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
}
