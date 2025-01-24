import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorDisplay from './ErrorDisplay';
import { useToast } from '../context/ToastContext';

const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        profileImage: null,
        rauchfreiSeit: '',
        zigarettenProTag: '',
        preisProPackung: '',
        zigarettenProPackung: '',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({
        message: '',
        details: '',
        fields: {},
    });
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                // Überprüfe die Dateigröße (5MB Limit)
                if (file.size > 5 * 1024 * 1024) {
                    setErrors({
                        ...errors,
                        fields: {
                            ...errors.fields,
                            profileImage:
                                'Die Datei darf nicht größer als 5MB sein',
                        },
                    });
                    return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                    // Komprimiere das Bild vor dem Speichern
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 800;
                        const MAX_HEIGHT = 800;
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        const compressedDataUrl = canvas.toDataURL(
                            'image/jpeg',
                            0.5
                        );
                        setFormData((prev) => ({
                            ...prev,
                            profileImage: compressedDataUrl,
                        }));
                    };
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validateStep = () => {
        const newErrors = {
            message: '',
            details: '',
            fields: {},
        };

        switch (step) {
            case 1:
                if (!formData.email) {
                    newErrors.fields.email = 'E-Mail ist erforderlich';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.fields.email = 'Ungültiges E-Mail-Format';
                }
                if (!formData.username) {
                    newErrors.fields.username = 'Benutzername ist erforderlich';
                } else if (formData.username.length < 3) {
                    newErrors.fields.username =
                        'Benutzername muss mindestens 3 Zeichen lang sein';
                }
                break;

            case 2:
                if (!formData.password) {
                    newErrors.fields.password = 'Passwort ist erforderlich';
                } else if (formData.password.length < 8) {
                    newErrors.fields.password =
                        'Passwort muss mindestens 8 Zeichen lang sein';
                } else if (
                    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
                ) {
                    newErrors.fields.password =
                        'Passwort muss Groß- und Kleinbuchstaben sowie Zahlen enthalten';
                }
                if (!formData.passwordConfirm) {
                    newErrors.fields.passwordConfirm =
                        'Passwortbestätigung ist erforderlich';
                } else if (formData.password !== formData.passwordConfirm) {
                    newErrors.fields.passwordConfirm =
                        'Passwörter stimmen nicht überein';
                }
                break;

            case 3:
                if (!formData.rauchfreiSeit) {
                    newErrors.fields.rauchfreiSeit = 'Datum ist erforderlich';
                } else {
                    const rauchfreiDate = new Date(formData.rauchfreiSeit);
                    if (rauchfreiDate > new Date()) {
                        newErrors.fields.rauchfreiSeit =
                            'Datum kann nicht in der Zukunft liegen';
                    }
                }
                if (!formData.zigarettenProTag) {
                    newErrors.fields.zigarettenProTag =
                        'Anzahl ist erforderlich';
                } else if (
                    formData.zigarettenProTag < 1 ||
                    formData.zigarettenProTag > 100
                ) {
                    newErrors.fields.zigarettenProTag =
                        'Bitte geben Sie eine realistische Anzahl an (1-100)';
                }
                if (!formData.preisProPackung) {
                    newErrors.fields.preisProPackung =
                        'Preis pro Packung ist erforderlich';
                } else if (formData.preisProPackung <= 0) {
                    newErrors.fields.preisProPackung =
                        'Preis muss größer als 0 sein';
                }
                if (!formData.zigarettenProPackung) {
                    newErrors.fields.zigarettenProPackung =
                        'Zigaretten pro Packung ist erforderlich';
                } else if (
                    formData.zigarettenProPackung < 1 ||
                    formData.zigarettenProPackung > 40
                ) {
                    newErrors.fields.zigarettenProPackung =
                        'Bitte geben Sie eine realistische Anzahl an (1-40)';
                }
                break;

            case 4:
                // Optional: Validierung für das Profilbild
                if (
                    formData.profileImage &&
                    formData.profileImage.size > 5000000
                ) {
                    newErrors.fields.profileImage =
                        'Profilbild darf nicht größer als 5MB sein';
                }
                break;
        }

        const hasErrors = Object.keys(newErrors.fields).length > 0;
        if (hasErrors) {
            newErrors.message = 'Bitte korrigieren Sie die folgenden Fehler:';
            newErrors.details = Object.values(newErrors.fields).join('\n');
        }

        setErrors(newErrors);
        return !hasErrors;
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        try {
            const rauchfreiDate = new Date(formData.rauchfreiSeit);

            // Profilbild-Konvertierung
            let profileImageData = null;
            if (formData.profileImage) {
                // Wenn das Bild bereits ein Base64-String ist, verwenden wir es direkt
                profileImageData = formData.profileImage;
            }

            const requestData = {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                profileImage: profileImageData,
                rauchfreiSeit: rauchfreiDate.toISOString(),
                zigarettenProTag: parseInt(formData.zigarettenProTag),
                preisProPackung: parseFloat(formData.preisProPackung),
                zigarettenProPackung: parseInt(formData.zigarettenProPackung),
            };

            console.log('Sending request data:', requestData); // Debugging

            const response = await fetch(
                'http://localhost:8080/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || 'Registrierung fehlgeschlagen'
                );
            }

            const data = await response.json();

            if (!response.ok) {
                if (data.fieldErrors) {
                    setErrors({
                        message: data.message || 'Registrierung fehlgeschlagen',
                        details: '',
                        fields: data.fieldErrors,
                    });
                    addToast('Bitte überprüfen Sie Ihre Eingaben', 'error');
                } else {
                    throw new Error(
                        data.message || 'Registrierung fehlgeschlagen'
                    );
                }
                return;
            }

            addToast(
                'Registrierung erfolgreich! Willkommen bei Rauchfrei',
                'success'
            );
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            navigate('/');
        } catch (error) {
            setErrors({
                message: 'Registrierung fehlgeschlagen',
                details: error.message,
                fields: {},
            });
            addToast('Ein unerwarteter Fehler ist aufgetreten', 'error');
        }
    };

    const renderStep = () => {
        const slideAnimation = {
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -50 },
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        };

        switch (step) {
            case 1:
                return (
                    <motion.div {...slideAnimation} className='space-y-6'>
                        <h3 className='text-2xl font-semibold text-gray-100 mb-6'>
                            Persönliche Informationen
                        </h3>
                        <div className='space-y-4'>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Benutzername
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div {...slideAnimation} className='space-y-6'>
                        <h3 className='text-2xl font-semibold text-gray-100 mb-6'>
                            Sicherheit
                        </h3>
                        <div className='space-y-4'>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Passwort
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Passwort bestätigen
                                </label>
                                <input
                                    type='password'
                                    name='passwordConfirm'
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div {...slideAnimation} className='space-y-6'>
                        <h3 className='text-2xl font-semibold text-gray-100 mb-6'>
                            Rauchverhalten
                        </h3>
                        <div className='space-y-4'>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Rauchfrei seit
                                </label>
                                <input
                                    type='date'
                                    name='rauchfreiSeit'
                                    value={formData.rauchfreiSeit}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Zigaretten pro Tag
                                </label>
                                <input
                                    type='number'
                                    name='zigarettenProTag'
                                    value={formData.zigarettenProTag}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Preis pro Packung (€)
                                </label>
                                <input
                                    type='number'
                                    step='0.01'
                                    name='preisProPackung'
                                    value={formData.preisProPackung}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <label className='block text-gray-300 mb-2 font-medium'>
                                    Zigaretten pro Packung
                                </label>
                                <input
                                    type='number'
                                    name='zigarettenProPackung'
                                    value={formData.zigarettenProPackung}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all'
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div {...slideAnimation} className='space-y-6'>
                        <h3 className='text-2xl font-semibold text-gray-100 mb-6'>
                            Profilbild & Abschluss
                        </h3>
                        <div className='flex flex-col items-center space-y-6'>
                            <div className='relative w-32 h-32 rounded-full overflow-hidden border-2 border-emerald-400/50'>
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt='Profilvorschau'
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <div className='w-full h-full bg-gray-700/50 flex items-center justify-center'>
                                        <svg
                                            className='w-12 h-12 text-gray-400'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                type='file'
                                name='profileImage'
                                onChange={handleChange}
                                accept='image/*'
                                className='w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-400/10 file:text-emerald-400 hover:file:bg-emerald-400/20 cursor-pointer'
                            />
                            <button
                                type='button'
                                onClick={handleSubmit}
                                className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors'
                            >
                                Registrieren
                            </button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4'>
            <div className='relative overflow-hidden rounded-2xl shadow-xl bg-gray-800/50 backdrop-blur-xl p-8 w-full max-w-md border border-gray-700/30'>
                <div className='relative'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-3xl font-bold text-gray-100'>
                            Registrierung
                        </h2>
                        <div className='flex space-x-2'>
                            {[1, 2, 3, 4].map((s) => (
                                <motion.div
                                    key={s}
                                    initial={false}
                                    animate={{
                                        scale: s === step ? 1.2 : 1,
                                        backgroundColor:
                                            s === step
                                                ? 'rgb(52, 211, 153)'
                                                : 'rgb(75, 85, 99)',
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300`}
                                />
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode='wait'>
                        {(errors.message ||
                            Object.keys(errors.fields).length > 0) && (
                            <ErrorDisplay errors={errors} />
                        )}
                    </AnimatePresence>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <AnimatePresence mode='wait'>
                            {renderStep()}
                        </AnimatePresence>

                        <div className='flex justify-between mt-8'>
                            {step > 1 && (
                                <button
                                    type='button'
                                    onClick={prevStep}
                                    className='px-4 py-2 text-gray-400 hover:text-gray-100 transition-colors flex items-center'
                                >
                                    <svg
                                        className='w-5 h-5 mr-2'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M15 19l-7-7 7-7'
                                        />
                                    </svg>
                                    Zurück
                                </button>
                            )}
                            {step < 4 && (
                                <button
                                    type='button'
                                    onClick={nextStep}
                                    className='ml-auto bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center'
                                >
                                    Weiter
                                    <svg
                                        className='w-5 h-5 ml-2'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M9 5l7 7-7 7'
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
