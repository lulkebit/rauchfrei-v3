import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.passwordConfirm) {
            setError('Passwörter stimmen nicht überein');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:8080/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        username: formData.username,
                        password: formData.password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Registrierung fehlgeschlagen');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            navigate('/');
        } catch {
            setError(
                'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.'
            );
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-8 w-full max-w-md'>
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative'>
                    <h2 className='text-2xl font-bold text-gray-100 mb-6'>
                        Registrierung
                    </h2>
                    {error && (
                        <div className='bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4'>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-gray-300 mb-2'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-300 mb-2'>
                                Benutzername
                            </label>
                            <input
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-300 mb-2'>
                                Passwort
                            </label>
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-300 mb-2'>
                                Passwort bestätigen
                            </label>
                            <input
                                type='password'
                                name='passwordConfirm'
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
                        >
                            Registrieren
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
