import PropTypes from 'prop-types';

const Dashboard = () => {
    const mockData = {
        rauchfreeTage: 15,
        gespartesGeld: 75.5,
        vermiedeneZigaretten: 300,
        naechsterMeilenstein: '20 Tage rauchfrei',
        gesundheitsVerbesserungen: [
            'Verbesserte Durchblutung',
            'Normalisierter Blutdruck',
            'Besserer Geschmackssinn',
        ],
        tagesVerlauf: [
            { tag: 'Mo', stärke: 8 },
            { tag: 'Di', stärke: 6 },
            { tag: 'Mi', stärke: 7 },
            { tag: 'Do', stärke: 4 },
            { tag: 'Fr', stärke: 3 },
            { tag: 'Sa', stärke: 2 },
            { tag: 'So', stärke: 1 },
        ],
        naechsteMeilensteine: [
            { tage: 20, belohnung: 'Kinobesuch' },
            { tage: 30, belohnung: 'Neues Buch' },
            { tage: 50, belohnung: 'Restaurant' },
        ],
    };

    return (
        <div className='container mx-auto space-y-6'>
            <h1 className='text-3xl font-bold mb-8 text-gray-100'>
                Mein Fortschritt
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <StatCard
                    title='Rauchfreie Tage'
                    value={mockData.rauchfreeTage}
                    color='emerald'
                    icon={
                        <svg
                            className='w-6 h-6'
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
                    value={`${mockData.gespartesGeld}€`}
                    color='green'
                    icon={
                        <svg
                            className='w-6 h-6'
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
                    value={mockData.vermiedeneZigaretten}
                    color='teal'
                    icon={
                        <svg
                            className='w-6 h-6'
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
                <CravingChart data={mockData.tagesVerlauf} />

                <MilestoneTracker
                    current={mockData.rauchfreeTage}
                    milestones={mockData.naechsteMeilensteine}
                />
            </div>

            <MotivationCard />

            <div className='mt-8 relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800/50'>
                <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />

                <div className='relative p-6'>
                    <h2 className='text-xl font-semibold mb-4 text-gray-100'>
                        Gesundheitsverbesserungen
                    </h2>
                    <ul className='space-y-3'>
                        {mockData.gesundheitsVerbesserungen.map(
                            (verbesserung, index) => (
                                <li
                                    key={index}
                                    className='flex items-center space-x-3 text-gray-300'
                                >
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
                                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                    <span>{verbesserung}</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color, icon }) => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-0.5 bg-gray-800/50'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />

        <div className='relative p-6'>
            <div className='flex items-center justify-between mb-4'>
                <div
                    className={`p-2 bg-gray-800/50 rounded-lg border border-gray-700/50`}
                >
                    <div className={`text-${color}-400`}>{icon}</div>
                </div>
            </div>
            <h2 className={`text-lg font-semibold text-gray-300 mb-2`}>
                {title}
            </h2>
            <p className={`text-4xl font-bold text-${color}-400`}>{value}</p>
        </div>
    </div>
);

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

const CravingChart = ({ data }) => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
        <div className='relative'>
            <h2 className='text-xl font-semibold mb-4 text-gray-100'>
                Verlauf des Verlangens
            </h2>
            <div className='h-48 flex items-end justify-between gap-2'>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center flex-1'
                    >
                        <div
                            className='w-full bg-emerald-400/20 rounded-t'
                            style={{ height: `${(item.stärke / 10) * 100}%` }}
                        >
                            <div
                                className='w-full bg-emerald-400/40 rounded-t transition-all duration-500'
                                style={{
                                    height: `${
                                        100 - (item.stärke / 10) * 100
                                    }%`,
                                }}
                            />
                        </div>
                        <span className='text-gray-400 mt-2'>{item.tag}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

CravingChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.string.isRequired,
            stärke: PropTypes.number.isRequired,
        })
    ).isRequired,
};

const MilestoneTracker = ({ current, milestones }) => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
        <div className='relative'>
            <h2 className='text-xl font-semibold mb-4 text-gray-100'>
                Nächste Meilensteine
            </h2>
            <div className='space-y-4'>
                {milestones.map((milestone, index) => (
                    <div key={index} className='relative'>
                        <div className='flex justify-between items-center mb-2'>
                            <span className='text-gray-300'>
                                {milestone.tage} Tage - {milestone.belohnung}
                            </span>
                            <span className='text-emerald-400'>
                                {Math.round((current / milestone.tage) * 100)}%
                            </span>
                        </div>
                        <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-emerald-400 rounded-full transition-all duration-500'
                                style={{
                                    width: `${Math.min(
                                        (current / milestone.tage) * 100,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

MilestoneTracker.propTypes = {
    current: PropTypes.number.isRequired,
    milestones: PropTypes.arrayOf(
        PropTypes.shape({
            tage: PropTypes.number.isRequired,
            belohnung: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const MotivationCard = () => (
    <div className='relative overflow-hidden rounded-2xl shadow-lg bg-gray-800/50 p-6'>
        <div className='absolute inset-0 backdrop-blur-md bg-gray-900/40' />
        <div className='relative'>
            <div className='flex items-start space-x-4'>
                <div className='p-3 bg-emerald-400/10 rounded-lg'>
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
                            d='M13 10V3L4 14h7v7l9-11h-7z'
                        />
                    </svg>
                </div>
                <div>
                    <h2 className='text-xl font-semibold text-gray-100 mb-2'>
                        Tägliche Motivation
                    </h2>
                    <p className='text-gray-300'>
                        "Jeder Tag ohne Zigarette ist ein Gewinn für deine
                        Gesundheit. Du hast bereits bewiesen, dass du stärker
                        bist als die Sucht. Bleib auf diesem Weg!"
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;
