import { useContext } from 'react';
import { ContactModalContext } from './ContactContext.js';

export const useContactModal = () => {
    const context = useContext(ContactModalContext);
    if (!context) {
        throw new Error('useContactModal must be used within a ContactModalProvider');
    }
    return context;
};
