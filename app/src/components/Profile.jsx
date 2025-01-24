import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const { addToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        rauchfreiSeit: user?.rauchfreiSeit?.split('T')[0] || '',
        zigarettenProTag: user?.zigarettenProTag?.toString() || '',
        preisProPackung: user?.preisProPackung?.toString() || '',
        zigarettenProPackung: user?.zigarettenProPackung?.toString() || '',
        bio: user?.bio || 'Auf dem Weg zu einem rauchfreien Leben! 🚭',
    });

    // Mock-Daten für Social Features
    const stats = {
        rauchfreiTage: 42,
        gespartesGeld: 336,
        follower: 124,
        following: 89,
    };

    const achievements = [
        { id: 1, title: '1 Woche Rauchfrei', icon: '🌟' },
        { id: 2, title: '100€ gespart', icon: '💰' },
        { id: 3, title: 'Motivator des Monats', icon: '🏆' },
    ];

    const activities = [
        {
            id: 1,
            type: 'milestone',
            text: 'Hat 30 Tage rauchfrei erreicht!',
            date: '2024-03-15',
        },
        {
            id: 2,
            type: 'badge',
            text: 'Neue Auszeichnung: Durchhalter',
            date: '2024-03-10',
        },
        {
            id: 3,
            type: 'support',
            text: 'Hat 5 Personen motiviert',
            date: '2024-03-05',
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = 'Benutzername ist erforderlich';
        }

        if (!formData.email.trim()) {
            errors.email = 'E-Mail ist erforderlich';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Ungültiges E-Mail-Format';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                addToast(error, 'error');
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                'http://localhost:8080/api/user/profile',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Fehler beim Aktualisieren des Profils');
            }

            const updatedUser = await response.json();
            updateUser(updatedUser);
            addToast('Profil erfolgreich aktualisiert', 'success');
            setIsEditing(false);
        } catch (error) {
            addToast('Fehler beim Aktualisieren des Profils', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container mx-auto space-y-6 py-8'>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-8'
            >
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative flex flex-col md:flex-row gap-8 items-center'>
                    {/* Profilbild */}
                    <div className='relative'>
                        <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/30'>
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt='Profilbild'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <div className='w-full h-full bg-emerald-500/20 flex items-center justify-center'>
                                    <span className='text-4xl text-emerald-400'>
                                        {user?.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profil Info */}
                    <div className='flex-1 text-center md:text-left'>
                        <h1 className='text-3xl font-bold text-gray-100 mb-2'>
                            {user?.username}
                        </h1>
                        <p className='text-gray-400 mb-4'>{formData.bio}</p>

                        {/* Stats */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
                            <div className='bg-gray-700/30 rounded-lg p-3'>
                                <div className='text-2xl font-bold text-emerald-400'>
                                    {stats.rauchfreiTage}
                                </div>
                                <div className='text-sm text-gray-400'>
                                    Tage rauchfrei
                                </div>
                            </div>
                            <div className='bg-gray-700/30 rounded-lg p-3'>
                                <div className='text-2xl font-bold text-emerald-400'>
                                    {stats.gespartesGeld}€
                                </div>
                                <div className='text-sm text-gray-400'>
                                    gespart
                                </div>
                            </div>
                            <div className='bg-gray-700/30 rounded-lg p-3'>
                                <div className='text-2xl font-bold text-emerald-400'>
                                    {stats.follower}
                                </div>
                                <div className='text-sm text-gray-400'>
                                    Follower
                                </div>
                            </div>
                            <div className='bg-gray-700/30 rounded-lg p-3'>
                                <div className='text-2xl font-bold text-emerald-400'>
                                    {stats.following}
                                </div>
                                <div className='text-sm text-gray-400'>
                                    Following
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'
            >
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative'>
                    <h2 className='text-xl font-bold text-gray-100 mb-4'>
                        Errungenschaften
                    </h2>
                    <div className='flex flex-wrap gap-4'>
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className='flex items-center gap-3 bg-gray-700/30 rounded-lg p-3'
                            >
                                <span className='text-2xl'>
                                    {achievement.icon}
                                </span>
                                <span className='text-gray-300'>
                                    {achievement.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'
            >
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative'>
                    <h2 className='text-xl font-bold text-gray-100 mb-4'>
                        Aktivitäten
                    </h2>
                    <div className='space-y-4'>
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className='flex items-start gap-4 bg-gray-700/30 rounded-lg p-4'
                            >
                                <div className='flex-1'>
                                    <p className='text-gray-300'>
                                        {activity.text}
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        {activity.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Edit Profile Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsEditing(true)}
                className='fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-colors'
            >
                Profil bearbeiten
            </motion.button>
        </div>
    );
};

export default Profile;
