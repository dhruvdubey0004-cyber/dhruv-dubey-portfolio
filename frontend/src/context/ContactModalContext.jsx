import React, { useState, useCallback } from 'react';
import { ContactModalContext } from './ContactContext.js';

export const ContactModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState('');

    const openModal = useCallback((triggerSource = '') => {
        setSource(triggerSource);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <ContactModalContext.Provider value={{ isOpen, source, openModal, closeModal }}>
            {children}
        </ContactModalContext.Provider>
    );
};
