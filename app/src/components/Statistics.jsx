import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ErrorDisplay from './ErrorDisplay';

const Statistics = () => {
    const [healthData, setHealthData] = useState(null);
    const [error, setError] = useState(null);
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                if (!token) {
                    setError(
                        'Nicht authentifiziert. Bitte melden Sie sich an.'
                    );
                    return;
                }

                const response = await axios.get(
                    'http://localhost:8080/api/health/progress',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.data) {
                    throw new Error('Keine Daten empfangen');
                }

                setHealthData(response.data);
                setError(null);
            } catch (err) {
                console.error('Fehler beim Laden der Gesundheitsdaten:', err);
                if (err.response) {
                    // Server antwortet mit Fehlerstatus
                    setError(
                        err.response.data ||
                            'Fehler beim Laden der Gesundheitsdaten'
                    );
                } else if (err.request) {
                    // Keine Antwort vom Server
                    setError(
                        'Server nicht erreichbar. Bitte versuchen Sie es später erneut.'
                    );
                } else {
                    // Sonstiger Fehler
                    setError('Ein unerwarteter Fehler ist aufgetreten.');
                }
            }
        };

        if (user && token) {
            fetchHealthData();
        }
    }, [user, token]);

    if (error) return <ErrorDisplay message={error} />;
    if (!healthData)
        return (
            <div className='pt-24 text-center text-gray-400'>
                Lade Gesundheitsdaten...
            </div>
        );

    const renderHealthMetric = (metric) => {
        const progress = (metric.currentValue / metric.maxValue) * 100;
        const statusColor = metric.isPermanentDamage ? 'red' : 'emerald';

        return (
            <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='relative overflow-hidden rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl p-6 mb-4'
            >
                <div className='flex justify-between items-start mb-4'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-100'>
                            {metric.metricName}
                        </h3>
                        <p className='text-sm text-gray-400 mt-1'>
                            {metric.description}
                        </p>
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full bg-${statusColor}-500/10 text-${statusColor}-400 text-sm`}
                    >
                        {metric.isPermanentDamage
                            ? 'Dauerhaft'
                            : 'Regenerierbar'}
                    </div>
                </div>

                <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-400'>Fortschritt</span>
                        <span className='text-gray-300'>
                            {metric.currentValue.toFixed(1)} /{' '}
                            {metric.maxValue.toFixed(1)} {metric.unit}
                        </span>
                    </div>
                    <div className='h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                        <div
                            className={`h-full bg-${statusColor}-400/50 rounded-full transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {!metric.isPermanentDamage && metric.expectedRecoveryDate && (
                    <div className='mt-4 text-sm text-gray-400'>
                        Erwartete vollständige Erholung:{' '}
                        {new Date(
                            metric.expectedRecoveryDate
                        ).toLocaleDateString()}
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className='container mx-auto px-4 pt-24 pb-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-8'
            >
                <h1 className='text-3xl font-bold text-gray-100 mb-2'>
                    Gesundheitlicher Fortschritt
                </h1>
                <p className='text-gray-400'>
                    Verfolgen Sie Ihre körperliche Regeneration nach dem
                    Rauchstopp
                </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Kurzfristige Verbesserungen */}
                <div>
                    <h2 className='text-xl font-semibold text-gray-100 mb-4'>
                        Kurzfristige Verbesserungen
                    </h2>
                    {healthData.shortTerm?.map(renderHealthMetric)}
                </div>

                {/* Langfristige Verbesserungen */}
                <div>
                    <h2 className='text-xl font-semibold text-gray-100 mb-4'>
                        Langfristige Verbesserungen
                    </h2>
                    {healthData.longTerm?.map(renderHealthMetric)}
                </div>
            </div>

            {/* Permanente Schäden */}
            {healthData.permanentDamage &&
                healthData.permanentDamage.length > 0 && (
                    <div className='mt-8'>
                        <h2 className='text-xl font-semibold text-gray-100 mb-4'>
                            Potenzielle dauerhafte Auswirkungen
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            {healthData.permanentDamage.map(renderHealthMetric)}
                        </div>
                    </div>
                )}

            {/* Persönliche Gesundheitsdaten */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-8 p-6 rounded-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl'
            >
                <h2 className='text-xl font-semibold text-gray-100 mb-4'>
                    Ihre Gesundheitsdaten
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div className='p-4 rounded-lg bg-gray-700/30'>
                        <span className='text-sm text-gray-400'>Alter</span>
                        <p className='text-lg font-semibold text-gray-100'>
                            {healthData.userStats?.alter} Jahre
                        </p>
                    </div>
                    <div className='p-4 rounded-lg bg-gray-700/30'>
                        <span className='text-sm text-gray-400'>
                            Rauchhistorie
                        </span>
                        <p className='text-lg font-semibold text-gray-100'>
                            {healthData.userStats?.rauchdauerJahre} Jahre
                        </p>
                    </div>
                    <div className='p-4 rounded-lg bg-gray-700/30'>
                        <span className='text-sm text-gray-400'>
                            Sportliche Aktivität
                        </span>
                        <p className='text-lg font-semibold text-gray-100'>
                            {healthData.userStats?.sportAktivitaet}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Statistics;
