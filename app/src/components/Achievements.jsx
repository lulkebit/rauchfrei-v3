import { useState } from 'react';

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
        <div className='container mx-auto space-y-6'>
            <h1 className='text-3xl font-bold mb-8 text-gray-100'>
                Meine Erfolge
            </h1>

            {/* Achievement Stats */}
            <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6 mb-8'>
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='text-xl font-semibold text-gray-100'>
                                Fortschritt
                            </h2>
                            <p className='text-gray-400 mt-1'>
                                Nächster Erfolg:{' '}
                                {mockData.stats.nextAchievement}
                            </p>
                        </div>
                        <div className='text-emerald-400 text-xl font-bold'>
                            {mockData.stats.unlockedAchievements}/
                            {mockData.stats.totalAchievements}
                        </div>
                    </div>
                    <div className='mt-4 h-2 bg-gray-700 rounded-full'>
                        <div
                            className='h-full bg-emerald-400 rounded-full transition-all duration-500'
                            style={{
                                width: `${
                                    (mockData.stats.unlockedAchievements /
                                        mockData.stats.totalAchievements) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Achievement Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {mockData.achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={`relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6 transition-all duration-300
                            ${
                                achievement.unlocked
                                    ? 'border border-emerald-500/20'
                                    : 'border border-gray-700/20'
                            }`}
                    >
                        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                        <div className='relative'>
                            <div className='flex items-start justify-between'>
                                <div className='text-4xl mb-4'>
                                    {achievement.icon}
                                </div>
                                {achievement.unlocked && (
                                    <svg
                                        className='w-6 h-6 text-emerald-400'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                )}
                            </div>
                            <h3 className='text-lg font-semibold text-gray-100 mb-2'>
                                {achievement.title}
                            </h3>
                            <p className='text-gray-400 text-sm mb-4'>
                                {achievement.description}
                            </p>
                            <div className='h-2 bg-gray-700 rounded-full'>
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        achievement.unlocked
                                            ? 'bg-emerald-400'
                                            : 'bg-emerald-400/50'
                                    }`}
                                    style={{
                                        width: `${achievement.progress}%`,
                                    }}
                                />
                            </div>
                            <div className='mt-2 text-right text-sm text-gray-400'>
                                {achievement.progress}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
