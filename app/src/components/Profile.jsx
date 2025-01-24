import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        rauchfreiSeit: '2024-03-01',
        zigarettenProTag: '20',
        preisProPackung: '8.00',
        zigarettenProPackung: '20',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: API-Aufruf zum Aktualisieren der Benutzerdaten
        setIsEditing(false);
    };

    return (
        <div className='container mx-auto space-y-6'>
            <h1 className='text-3xl font-bold mb-8 text-gray-100'>
                Mein Profil
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Persönliche Informationen */}
                <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
                    <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                    <div className='relative'>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-xl font-semibold text-gray-100'>
                                Persönliche Informationen
                            </h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className='text-emerald-400 hover:text-emerald-300 transition-colors'
                            >
                                {isEditing ? 'Abbrechen' : 'Bearbeiten'}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label className='block text-gray-300 mb-2'>
                                    Benutzername
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-300 mb-2'>
                                    E-Mail
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                />
                            </div>
                            {isEditing && (
                                <button
                                    type='submit'
                                    className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
                                >
                                    Speichern
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Rauchverhalten */}
                <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
                    <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                    <div className='relative'>
                        <h2 className='text-xl font-semibold text-gray-100 mb-6'>
                            Rauchverhalten
                        </h2>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-gray-300 mb-2'>
                                    Rauchfrei seit
                                </label>
                                <input
                                    type='date'
                                    name='rauchfreiSeit'
                                    value={formData.rauchfreiSeit}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-300 mb-2'>
                                    Zigaretten pro Tag
                                </label>
                                <input
                                    type='number'
                                    name='zigarettenProTag'
                                    value={formData.zigarettenProTag}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-300 mb-2'>
                                    Preis pro Packung (€)
                                </label>
                                <input
                                    type='number'
                                    step='0.01'
                                    name='preisProPackung'
                                    value={formData.preisProPackung}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-300 mb-2'>
                                    Zigaretten pro Packung
                                </label>
                                <input
                                    type='number'
                                    name='zigarettenProPackung'
                                    value={formData.zigarettenProPackung}
                                    onChange={handleChange}
                                    className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
