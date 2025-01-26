import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ErrorDisplay from './ErrorDisplay';

const calculateNextMilestone = (days) => {
    const milestones = [1, 3, 7, 14, 30, 60, 90, 180, 365];
    return `${milestones.find((m) => m > days) || 'Über 365'} Tage`;
};

const calculateHealthImprovements = (days) => {
    return [
        'Puls und Blutdruck normalisieren sich',
        'Verbesserte Durchblutung',
        'Regeneration der Lungenfunktion',
        'Mehr Energie im Alltag',
    ];
};

const calculateDailyProgress = (days) => {
    // Basis-Verlangen startet bei 8 und nimmt langsamer ab
    const baseStärke = Math.min(8, Math.max(3, 8 - days / 14));
    const varianz = 2; // Erhöhte Varianz für mehr Schwankungen

    return Array.from({ length: 7 }, (_, i) => ({
        tag: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][i],
        stärke: Math.min(
            10,
            Math.max(1, baseStärke + (Math.random() * 2 - 1) * varianz)
        ).toFixed(1),
    }));
};

const Dashboard = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Kein Authentifizierungs-Token gefunden');
                }

                const response = await fetch(
                    'http://localhost:8080/api/dashboard/stats',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Fehler beim Laden der Dashboard-Daten'
                    );
                }

                setDashboardData({
                    rauchfreeTage: data.rauchfreiTage,
                    vermiedeneZigaretten: data.vermiedeneZigaretten,
                    gespartesGeld: data.gespartesGeld,
                    naechsterMeilenstein: calculateNextMilestone(
                        data.rauchfreiTage
                    ),
                    gesundheitsVerbesserungen: calculateHealthImprovements(
                        data.rauchfreiTage
                    ),
                    tagesVerlauf: calculateDailyProgress(data.rauchfreiTage),
                    naechsteMeilensteine: [
                        1, 3, 7, 14, 30, 60, 90, 180, 365,
                    ].filter((m) => m > data.rauchfreiTage),
                });
            } catch (err) {
                setError({
                    message: err.message,
                    type: 'error',
                });
                addToast(err.message, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user, addToast]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500'></div>
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay errors={error} />;
    }

    if (!dashboardData) {
        return null;
    }

    return (
        <div className='container mx-auto px-4 pt-24 pb-8 space-y-6'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center justify-between mb-8'
            >
                <h1 className='text-3xl font-bold text-gray-100'>
                    Mein Fortschritt
                </h1>
                <span className='text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20'>
                    {dashboardData.naechsterMeilenstein}
                </span>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <StatCard
                    title='Rauchfreie Tage'
                    value={dashboardData.rauchfreeTage}
                    subtitle='Tage'
                    icon={
                        <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                        </svg>
                    }
                />

                <StatCard
                    title='Gespartes Geld'
                    value={dashboardData.gespartesGeld}
                    subtitle='Euro'
                    icon={
                        <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                    }
                />

                <StatCard
                    title='Vermiedene Zigaretten'
                    value={dashboardData.vermiedeneZigaretten}
                    subtitle='Stück'
                    icon={
                        <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                            />
                        </svg>
                    }
                />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
                >
                    <h2 className='text-xl font-semibold mb-4'>
                        Tageszeit-Aktivitäts-Analyse
                    </h2>
                    <TimeAnalysis
                        data={{
                            morgen: 65,
                            mittag: 45,
                            abend: 80,
                            nacht: 30,
                        }}
                    />
                </motion.div>
                <MilestoneTracker
                    current={dashboardData.rauchfreeTage}
                    milestones={dashboardData.naechsteMeilensteine}
                />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <MotivationCard />
                <HealthImprovements
                    improvements={dashboardData.gesundheitsVerbesserungen}
                />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, subtitle, icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl'
    >
        <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
                <div className='p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20'>
                    <div className='text-emerald-400'>{icon}</div>
                </div>
            </div>
            <h2 className='text-sm font-medium text-gray-400 mb-1'>{title}</h2>
            <div className='flex items-baseline space-x-2'>
                <p className='text-3xl font-bold text-gray-100'>{value}</p>
                <span className='text-sm text-gray-400'>{subtitle}</span>
            </div>
        </div>
    </motion.div>
);

const TimeAnalysis = ({ data }) => {
    const timeSlots = [
        { id: 'morgen', label: 'Morgens (6-12)', color: 'bg-sky-500' },
        { id: 'mittag', label: 'Mittags (12-18)', color: 'bg-amber-500' },
        { id: 'abend', label: 'Abends (18-24)', color: 'bg-indigo-500' },
        { id: 'nacht', label: 'Nachts (0-6)', color: 'bg-purple-500' },
    ];

    return (
        <div className='space-y-4'>
            {timeSlots.map((slot) => (
                <div key={slot.id} className='space-y-2'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-400'>
                            {slot.label}
                        </span>
                        <span className='text-sm text-gray-300'>
                            {data[slot.id]}% Aktivität
                        </span>
                    </div>
                    <div className='h-3 bg-gray-700/30 rounded-full overflow-hidden'>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data[slot.id]}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full ${slot.color}/50 rounded-full`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const MilestoneTracker = ({ current, milestones }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
    >
        <h2 className='text-xl font-semibold mb-6 text-gray-100'>
            Nächste Meilensteine
        </h2>
        <div className='space-y-6'>
            {milestones.map((milestone, index) => (
                <div key={index}>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-gray-300 font-medium'>
                            {milestone.belohnung}
                        </span>
                        <span className='text-sm text-emerald-400'>
                            {Math.round((current / milestone.tage) * 100)}%
                        </span>
                    </div>
                    <div className='h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${Math.min(
                                    (current / milestone.tage) * 100,
                                    100
                                )}%`,
                            }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className='h-full bg-emerald-400/50 rounded-full'
                        />
                    </div>
                    <div className='mt-1 text-xs text-gray-500'>
                        {milestone.tage} Tage Ziel
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

const MotivationCard = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
    >
        <div className='flex items-start space-x-4'>
            <div className='p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20'>
                <svg
                    className='w-5 h-5 text-emerald-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                </svg>
            </div>
            <div>
                <h2 className='text-xl font-semibold text-gray-100 mb-3'>
                    Tägliche Motivation
                </h2>
                <p className='text-gray-400 leading-relaxed'>
                    "Jeder Tag ohne Zigarette ist ein Gewinn für deine
                    Gesundheit. Du hast bereits bewiesen, dass du stärker bist
                    als die Sucht. Bleib auf diesem Weg!"
                </p>
            </div>
        </div>
    </motion.div>
);

const HealthImprovements = ({ improvements }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
    >
        <h2 className='text-xl font-semibold mb-4 text-gray-100'>
            Gesundheitsverbesserungen
        </h2>
        <div className='space-y-4'>
            {improvements.map((improvement, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex items-center space-x-3'
                >
                    <div className='p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20'>
                        <svg
                            className='w-4 h-4 text-emerald-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                            />
                        </svg>
                    </div>
                    <span className='text-gray-300'>{improvement}</span>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

TimeAnalysis.propTypes = {
    data: PropTypes.shape({
        morgen: PropTypes.number.isRequired,
        mittag: PropTypes.number.isRequired,
        abend: PropTypes.number.isRequired,
        nacht: PropTypes.number.isRequired,
    }).isRequired,
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subtitle: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

MilestoneTracker.propTypes = {
    current: PropTypes.number.isRequired,
    milestones: PropTypes.arrayOf(
        PropTypes.shape({
            tage: PropTypes.number.isRequired,
            belohnung: PropTypes.string.isRequired,
        })
    ).isRequired,
};

MotivationCard.propTypes = {
    // No specific prop types for this component
};

HealthImprovements.propTypes = {
    improvements: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Dashboard;
