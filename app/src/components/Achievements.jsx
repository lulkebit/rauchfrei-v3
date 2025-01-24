import { motion } from 'framer-motion';

const Achievements = () => {
    const mockData = {
        achievements: [
            {
                id: 1,
                title: 'Erste Schritte',
                description: '24 Stunden rauchfrei',
                icon: '🌱',
                progress: 100,
                unlocked: true,
            },
            {
                id: 2,
                title: 'Eine Woche geschafft',
                description: '7 Tage rauchfrei',
                icon: '🌿',
                progress: 100,
                unlocked: true,
            },
            {
                id: 3,
                title: 'Durchhalter',
                description: '14 Tage rauchfrei',
                icon: '🌳',
                progress: 80,
                unlocked: false,
            },
            {
                id: 4,
                title: 'Gesundheits-Champion',
                description: '30 Tage rauchfrei',
                icon: '🏆',
                progress: 40,
                unlocked: false,
            },
            {
                id: 5,
                title: 'Geld gespart',
                description: '100€ gespart',
                icon: '💰',
                progress: 75,
                unlocked: false,
            },
            {
                id: 6,
                title: 'Lungenreiniger',
                description: '500 Zigaretten vermieden',
                icon: '🫁',
                progress: 60,
                unlocked: false,
            },
        ],
        stats: {
            unlockedAchievements: 2,
            totalAchievements: 6,
            nextAchievement: 'Durchhalter - noch 3 Tage',
        },
    };

    return (
        <div className='container mx-auto px-4 pt-24 pb-8 space-y-6'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center justify-between mb-8'
            >
                <h1 className='text-3xl font-bold text-gray-100'>
                    Meine Erfolge
                </h1>
                <span className='text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20'>
                    {mockData.stats.unlockedAchievements} von{' '}
                    {mockData.stats.totalAchievements} freigeschaltet
                </span>
            </motion.div>

            {/* Achievement Progress Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
            >
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-100'>
                            Gesamtfortschritt
                        </h2>
                        <p className='text-gray-400 mt-1'>
                            Nächster Erfolg: {mockData.stats.nextAchievement}
                        </p>
                    </div>
                    <div className='p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20'>
                        <div className='text-emerald-400'>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M5 13l4 4L19 7'
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${
                                (mockData.stats.unlockedAchievements /
                                    mockData.stats.totalAchievements) *
                                100
                            }%`,
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className='h-full bg-emerald-400/50 rounded-full'
                    />
                </div>
            </motion.div>

            {/* Achievements Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {mockData.achievements.map((achievement, index) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative overflow-hidden rounded-xl bg-gray-800/70 border backdrop-blur-xl p-6 
                            ${
                                achievement.unlocked
                                    ? 'border-emerald-500/20'
                                    : 'border-gray-700/20'
                            }`}
                    >
                        <div className='flex items-start justify-between mb-4'>
                            <div
                                className={`p-3 rounded-lg ${
                                    achievement.unlocked
                                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                                        : 'bg-gray-700/30 border border-gray-600/20'
                                }`}
                            >
                                <span className='text-2xl'>
                                    {achievement.icon}
                                </span>
                            </div>
                            {achievement.unlocked && (
                                <div className='text-emerald-400'>
                                    <svg
                                        className='w-5 h-5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M5 13l4 4L19 7'
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <h3 className='text-lg font-semibold text-gray-100 mb-1'>
                            {achievement.title}
                        </h3>
                        <p className='text-gray-400 text-sm mb-4'>
                            {achievement.description}
                        </p>
                        <div className='space-y-2'>
                            <div className='h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${achievement.progress}%`,
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.1,
                                    }}
                                    className={`h-full rounded-full ${
                                        achievement.unlocked
                                            ? 'bg-emerald-400/50'
                                            : 'bg-gray-600/50'
                                    }`}
                                />
                            </div>
                            <div className='flex justify-between text-sm'>
                                <span
                                    className={`${
                                        achievement.unlocked
                                            ? 'text-emerald-400'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {achievement.progress}%
                                </span>
                                {!achievement.unlocked && (
                                    <span className='text-gray-500'>
                                        In Bearbeitung
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
