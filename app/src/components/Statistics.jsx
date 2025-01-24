import { useState } from 'react';

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
        <div className='container mx-auto space-y-6'>
            <h1 className='text-3xl font-bold mb-8 text-gray-100'>
                Detaillierte Statistiken
            </h1>

            {/* Hauptmetriken */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <MetricCard
                    title='Rauchfreie Tage'
                    value={mockData.rauchfreiStats.tage}
                    subtitle='Aktuell'
                />
                <MetricCard
                    title='Längste Serie'
                    value={mockData.rauchfreiStats.längsteSerie}
                    subtitle='Tage'
                />
                <MetricCard
                    title='Nicht geraucht'
                    value={mockData.rauchfreiStats.durchschnittProTag}
                    subtitle='Ø pro Tag'
                />
                <MetricCard
                    title='Gespart'
                    value={`${mockData.rauchfreiStats.gesamtErsparnis}€`}
                    subtitle='Insgesamt'
                />
            </div>

            {/* Grafiken */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <MonthlyChart data={mockData.monatlicheStats} />
                <SuccessRateChart data={mockData.erfolgsquoten} />
            </div>

            {/* Gesundheitsmetriken */}
            <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
                <div className='relative'>
                    <h2 className='text-xl font-semibold mb-6 text-gray-100'>
                        Gesundheitsmetriken
                    </h2>
                    <div className='space-y-6'>
                        {mockData.gesundheitsMetriken.map((metrik, index) => (
                            <div key={index}>
                                <div className='flex justify-between mb-2'>
                                    <span className='text-gray-300'>
                                        {metrik.name}
                                    </span>
                                    <span className='text-emerald-400'>
                                        {metrik.wert}%
                                    </span>
                                </div>
                                <div className='h-2 bg-gray-700 rounded-full'>
                                    <div
                                        className='h-full bg-emerald-400 rounded-full transition-all duration-500'
                                        style={{
                                            width: `${
                                                (metrik.wert / metrik.maxWert) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, subtitle }) => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
        <div className='relative'>
            <h3 className='text-gray-400 text-sm font-medium'>{title}</h3>
            <p className='text-3xl font-bold text-emerald-400 mt-2'>{value}</p>
            <p className='text-gray-500 text-sm mt-1'>{subtitle}</p>
        </div>
    </div>
);

const MonthlyChart = ({ data }) => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
        <div className='relative'>
            <h2 className='text-xl font-semibold mb-4 text-gray-100'>
                Monatliche Entwicklung
            </h2>
            <div className='h-64 flex items-end justify-between gap-2'>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center flex-1'
                    >
                        <div className='w-full bg-emerald-400/20 rounded-t h-full relative'>
                            <div
                                className='absolute bottom-0 w-full bg-emerald-400/40 rounded-t transition-all duration-500'
                                style={{
                                    height: `${(item.zigaretten / 300) * 100}%`,
                                }}
                            />
                        </div>
                        <span className='text-gray-400 mt-2'>{item.monat}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const SuccessRateChart = ({ data }) => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
        <div className='relative'>
            <h2 className='text-xl font-semibold mb-4 text-gray-100'>
                Erfolgsquoten nach Tageszeit
            </h2>
            <div className='space-y-4'>
                {Object.entries(data).map(([zeit, rate]) => (
                    <div key={zeit}>
                        <div className='flex justify-between mb-2'>
                            <span className='text-gray-300 capitalize'>
                                {zeit}
                            </span>
                            <span className='text-emerald-400'>{rate}%</span>
                        </div>
                        <div className='h-2 bg-gray-700 rounded-full'>
                            <div
                                className='h-full bg-emerald-400 rounded-full transition-all duration-500'
                                style={{ width: `${rate}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Statistics;
