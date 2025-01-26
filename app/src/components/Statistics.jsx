import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ErrorDisplay from './ErrorDisplay';

const Statistics = () => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:8080/api/statistics',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Empfangene Statistiken:', response.data); // Debug-Ausgabe
                if (!response.data || !response.data.rauchfreiStats) {
                    throw new Error('Ungültige Statistikdaten empfangen');
                }
                setStats(response.data);
                setError(null);
            } catch (err) {
                setError(
                    'Fehler beim Laden der Statistiken. Bitte versuchen Sie es später erneut.'
                );
                console.error('Fehler beim Laden der Statistiken:', err);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    if (error) return <ErrorDisplay message={error} />;
    if (!stats || !stats.rauchfreiStats)
        return (
            <div className='pt-24 text-center text-gray-400'>
                Lade Statistiken...
            </div>
        );

    return (
        <div className='container mx-auto px-4 pt-24 pb-8 space-y-6'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center justify-between mb-8'
            >
                <h1 className='text-3xl font-bold text-gray-100'>
                    Detaillierte Statistiken
                </h1>
            </motion.div>

            {/* Hauptmetriken */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {Object.entries({
                    'Rauchfreie Tage': stats.rauchfreiStats.tage,
                    'Längste Serie': `${stats.rauchfreiStats.längsteSerie} Tage`,
                    'Nicht geraucht': `${stats.rauchfreiStats.durchschnittProTag}/Tag`,
                    Gespart: `${stats.rauchfreiStats.gesamtErsparnis.toFixed(
                        2
                    )}€`,
                }).map(([title, value], index) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
                    >
                        <div className='flex items-center justify-between mb-4'>
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
                                            d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h2 className='text-sm font-medium text-gray-400 mb-1'>
                            {title}
                        </h2>
                        <p className='text-3xl font-bold text-gray-100'>
                            {value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Grafiken */}
            {stats.monatlicheStats && stats.monatlicheStats.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
                    >
                        <h2 className='text-xl font-semibold mb-6 text-gray-100'>
                            Monatliche Entwicklung
                        </h2>
                        <div className='h-64 flex items-end justify-between gap-2'>
                            {stats.monatlicheStats.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col items-center flex-1'
                                >
                                    <div className='w-full bg-emerald-500/10 rounded-t-lg relative h-full'>
                                        <div
                                            className='absolute bottom-0 w-full bg-emerald-400/20 rounded-t transition-all duration-500'
                                            style={{
                                                height: `${
                                                    (item.zigaretten /
                                                        Math.max(
                                                            ...stats.monatlicheStats.map(
                                                                (s) =>
                                                                    s.zigaretten ||
                                                                    0
                                                            )
                                                        )) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                    <span className='text-sm text-gray-400 mt-2'>
                                        {item.monat}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {stats.erfolgsquoten && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
                        >
                            <h2 className='text-xl font-semibold mb-6 text-gray-100'>
                                Erfolgsquoten nach Tageszeit
                            </h2>
                            <div className='space-y-4'>
                                {Object.entries(stats.erfolgsquoten).map(
                                    ([zeit, rate], index) => (
                                        <div key={zeit}>
                                            <div className='flex justify-between mb-2'>
                                                <span className='text-gray-300 capitalize'>
                                                    {zeit}
                                                </span>
                                                <span className='text-emerald-400'>
                                                    {rate}%
                                                </span>
                                            </div>
                                            <div className='h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${rate}%`,
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        delay: index * 0.1,
                                                    }}
                                                    className='h-full bg-emerald-400/50 rounded-full'
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Gesundheitsmetriken */}
            {stats.gesundheitsMetriken &&
                stats.gesundheitsMetriken.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6'
                    >
                        <h2 className='text-xl font-semibold mb-6 text-gray-100'>
                            Gesundheitsmetriken
                        </h2>
                        <div className='space-y-6'>
                            {stats.gesundheitsMetriken.map((metrik, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <div className='flex justify-between mb-2'>
                                        <span className='text-gray-300'>
                                            {metrik.name}
                                        </span>
                                        <span className='text-emerald-400'>
                                            {metrik.wert}%
                                        </span>
                                    </div>
                                    <div className='h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${
                                                    (metrik.wert /
                                                        metrik.maxWert) *
                                                    100
                                                }%`,
                                            }}
                                            transition={{
                                                duration: 1,
                                                delay: index * 0.1,
                                            }}
                                            className='h-full bg-emerald-400/50 rounded-full'
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
        </div>
    );
};

export default Statistics;
