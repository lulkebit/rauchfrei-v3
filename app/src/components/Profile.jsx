import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Konvertiere die Werte in die richtigen Typen
            const updatedData = {
                ...formData,
                zigarettenProTag: Number(formData.zigarettenProTag),
                preisProPackung: Number(formData.preisProPackung),
                zigarettenProPackung: Number(formData.zigarettenProPackung),
            };
            await updateUser(updatedData);
            addToast('Profil erfolgreich aktualisiert', 'success');
            setIsEditing(false);
        } catch (error) {
            addToast('Fehler beim Aktualisieren des Profils', 'error');
        }
        setIsLoading(false);
    };

    return (
        <div className='container mx-auto px-4 pt-24 pb-8 space-y-6'>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
            >
                <div className='flex flex-col md:flex-row gap-6 items-center'>
                    {/* Avatar */}
                    <div className='relative'>
                        <div className='w-32 h-32 rounded-full bg-emerald-500/10 border-4 border-emerald-500/20 flex items-center justify-center overflow-hidden'>
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt='Profilbild'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <span className='text-5xl text-emerald-400'>
                                    {user?.username?.charAt(0).toUpperCase()}
                                </span>
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
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {Object.entries({
                                'Tage rauchfrei': stats.rauchfreiTage,
                                Gespart: `${stats.gespartesGeld}€`,
                                Follower: stats.follower,
                                Folgt: stats.following,
                            }).map(([label, value], index) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className='relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700/20 backdrop-blur-xl p-4'
                                >
                                    <div className='text-2xl font-bold text-emerald-400'>
                                        {value}
                                    </div>
                                    <div className='text-sm text-gray-400'>
                                        {label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bearbeitungsformular */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6 space-y-6'
            >
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold text-gray-100'>
                        Profil Einstellungen
                    </h2>
                    <button
                        type='button'
                        onClick={() => setIsEditing(!isEditing)}
                        className='px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors'
                    >
                        {isEditing ? 'Abbrechen' : 'Bearbeiten'}
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {Object.entries({
                        username: 'Benutzername',
                        email: 'E-Mail',
                        rauchfreiSeit: 'Rauchfrei seit',
                        zigarettenProTag: 'Zigaretten pro Tag',
                        preisProPackung: 'Preis pro Packung',
                        zigarettenProPackung: 'Zigaretten pro Packung',
                    }).map(([key, label]) => (
                        <div key={key}>
                            <label className='block text-gray-300 mb-2 font-medium'>
                                {label}
                            </label>
                            <input
                                type={key === 'rauchfreiSeit' ? 'date' : 'text'}
                                name={key}
                                value={formData[key]}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [key]: e.target.value,
                                    })
                                }
                                disabled={!isEditing}
                                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                            />
                        </div>
                    ))}
                </div>

                {isEditing && (
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Speichern...' : 'Speichern'}
                        </button>
                    </div>
                )}
            </motion.form>

            {/* Achievements */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
            >
                <h2 className='text-xl font-semibold text-gray-100 mb-6'>
                    Letzte Erfolge
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className='flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/20'
                        >
                            <span className='text-2xl'>{achievement.icon}</span>
                            <span className='text-gray-300'>
                                {achievement.title}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Aktivitäten */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
            >
                <h2 className='text-xl font-semibold text-gray-100 mb-6'>
                    Aktivitäten
                </h2>
                <div className='space-y-4'>
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className='flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/20'
                        >
                            <span className='text-gray-300'>
                                {activity.text}
                            </span>
                            <span className='text-gray-500 text-sm'>
                                {activity.date}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
