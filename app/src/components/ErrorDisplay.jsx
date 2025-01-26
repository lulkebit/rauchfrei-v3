import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ErrorDisplay = ({ errors }) => {
    if (!errors) return null;

    const errorMessages =
        typeof errors === 'string'
            ? { general: errors }
            : errors.fieldErrors || {
                  general: errors.message || 'Ein Fehler ist aufgetreten',
              };

    return (
        <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400'>
            {Object.entries(errorMessages).map(([key, value]) => (
                <div key={key} className='mb-2'>
                    {key !== 'general' && <strong>{key}: </strong>}
                    {value}
                </div>
            ))}
        </div>
    );
};

ErrorDisplay.propTypes = {
    errors: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            message: PropTypes.string,
            fieldErrors: PropTypes.object,
        }),
    ]),
};

export default ErrorDisplay;
