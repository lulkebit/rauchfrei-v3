import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:8080/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                throw new Error('Login fehlgeschlagen');
            }

            const data = await response.json();
            login(data);
            navigate('/');
        } catch {
            setError(
                'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.'
            );
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-8 w-full max-w-md'>
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative'>
                    <h2 className='text-2xl font-bold text-gray-100 mb-6'>
                        Login
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
                        >
                            Einloggen
                        </button>
                        <div className='mt-4 text-center text-gray-400'>
                            Noch kein Konto?{' '}
                            <Link
                                to='/register'
                                className='text-emerald-400 hover:text-emerald-300'
                            >
                                Jetzt registrieren
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
