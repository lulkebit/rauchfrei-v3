import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ErrorDisplay = ({ errors }) => {
    const getErrorIcon = (type) => {
        switch (type) {
            case 'validation':
                return (
                    <svg
                        className='w-5 h-5 text-yellow-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                    </svg>
                );
            case 'error':
                return (
                    <svg
                        className='w-5 h-5 text-red-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getErrorClass = (type) => {
        switch (type) {
            case 'validation':
                return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
            case 'error':
                return 'bg-red-500/10 border-red-500/20 text-red-400';
            default:
                return 'bg-red-500/10 border-red-500/20 text-red-400';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='space-y-3'
        >
            {/* Hauptfehlermeldung */}
            {errors.message && (
                <div
                    className={`rounded-lg border p-4 ${getErrorClass(
                        errors.type
                    )}`}
                >
                    <div className='flex items-start space-x-3'>
                        {getErrorIcon(errors.type)}
                        <div className='flex-1'>
                            <h3 className='font-semibold'>{errors.message}</h3>
                            {errors.details && (
                                <p className='text-sm mt-1 opacity-80'>
                                    {errors.details}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Feldspezifische Fehler */}
            {Object.keys(errors.fields).length > 0 && (
                <div className='rounded-lg border bg-gray-800/50 p-4'>
                    <h4 className='text-sm font-medium text-gray-300 mb-2'>
                        Folgende Felder müssen korrigiert werden:
                    </h4>
                    <ul className='space-y-2'>
                        {Object.entries(errors.fields).map(
                            ([field, message]) => (
                                <li
                                    key={field}
                                    className='flex items-start space-x-2 text-sm'
                                >
                                    <svg
                                        className='w-4 h-4 text-red-400 mt-0.5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M6 18L18 6M6 6l12 12'
                                        />
                                    </svg>
                                    <span>
                                        <span className='font-medium text-gray-300'>
                                            {(field === 'email' && 'E-Mail') ||
                                                (field === 'username' &&
                                                    'Benutzername') ||
                                                (field === 'password' &&
                                                    'Passwort') ||
                                                (field === 'passwordConfirm' &&
                                                    'Passwortbestätigung') ||
                                                (field === 'rauchfreiSeit' &&
                                                    'Rauchfrei seit') ||
                                                (field === 'zigarettenProTag' &&
                                                    'Zigaretten pro Tag') ||
                                                (field === 'preisProPackung' &&
                                                    'Preis pro Packung') ||
                                                (field ===
                                                    'zigarettenProPackung' &&
                                                    'Zigaretten pro Packung') ||
                                                field}
                                            :
                                        </span>{' '}
                                        <span className='text-red-400'>
                                            {message}
                                        </span>
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}

            {/* Backend Fehlercode */}
            {errors.errorCode && (
                <p className='text-xs text-gray-500 text-right'>
                    Fehlercode: {errors.errorCode}
                </p>
            )}
        </motion.div>
    );
};

ErrorDisplay.propTypes = {
    errors: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        details: PropTypes.string,
        fields: PropTypes.object,
        errorCode: PropTypes.string,
    }).isRequired,
};

export default ErrorDisplay;
