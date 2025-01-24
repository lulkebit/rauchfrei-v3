import { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 5000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className='fixed bottom-4 right-4 z-50 space-y-2'>
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const Toast = ({ id, message, type, onClose }) => {
    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
            case 'error':
                return 'bg-red-500/20 border-red-500/30 text-red-400';
            case 'warning':
                return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
            default:
                return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative overflow-hidden rounded-lg border p-4 backdrop-blur-lg shadow-lg ${getToastStyle()}`}
        >
            <div className='flex items-center space-x-3'>
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className='ml-auto hover:opacity-70 transition-opacity'
                >
                    <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error(
            'useToast muss innerhalb eines ToastProviders verwendet werden'
        );
    }
    return context;
};
