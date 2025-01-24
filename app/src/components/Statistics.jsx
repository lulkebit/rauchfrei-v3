import { motion } from 'framer-motion';

const Statistics = () => {
    const mockData = {
        // Erweiterte Statistikdaten
        rauchfreiStats: {
            tage: 15,
            längsteSerie: 20,
            durchschnittProTag: 12,
            gesamtErsparnis: 75.5,
        },
        monatlicheStats: [
            { monat: 'Jan', zigaretten: 300, ausgaben: 90 },
            { monat: 'Feb', zigaretten: 280, ausgaben: 84 },
            { monat: 'Mär', zigaretten: 250, ausgaben: 75 },
            { monat: 'Apr', zigaretten: 200, ausgaben: 60 },
            { monat: 'Mai', zigaretten: 150, ausgaben: 45 },
            { monat: 'Jun', zigaretten: 0, ausgaben: 0 },
        ],
        gesundheitsMetriken: [
            { name: 'Lungenfunktion', wert: 85, maxWert: 100 },
            { name: 'Energielevel', wert: 75, maxWert: 100 },
            { name: 'Stressresistenz', wert: 70, maxWert: 100 },
        ],
        erfolgsquoten: {
            morgens: 85,
            mittags: 75,
            abends: 90,
            nachts: 95,
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
                    Detaillierte Statistiken
                </h1>
            </motion.div>

            {/* Hauptmetriken */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {Object.entries({
                    'Rauchfreie Tage': mockData.rauchfreiStats.tage,
                    'Längste Serie': `${mockData.rauchfreiStats.längsteSerie} Tage`,
                    'Nicht geraucht': `${mockData.rauchfreiStats.durchschnittProTag}/Tag`,
                    Gespart: `${mockData.rauchfreiStats.gesamtErsparnis}€`,
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
                        {mockData.monatlicheStats.map((item, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center flex-1'
                            >
                                <div className='w-full bg-emerald-500/10 rounded-t-lg relative h-full'>
                                    <div
                                        className='absolute bottom-0 w-full bg-emerald-400/20 rounded-t transition-all duration-500'
                                        style={{
                                            height: `${
                                                (item.zigaretten / 300) * 100
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
                        {Object.entries(mockData.erfolgsquoten).map(
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
                                            animate={{ width: `${rate}%` }}
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
            </div>

            {/* Gesundheitsmetriken */}
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
                    {mockData.gesundheitsMetriken.map((metrik, index) => (
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
                                            (metrik.wert / metrik.maxWert) * 100
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
        </div>
    );
};

export default Statistics;
