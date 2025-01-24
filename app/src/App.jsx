import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';
import Achievements from './components/Achievements';

function App() {
    return (
        <Router>
            <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 text-gray-100'>
                {/* Große, asymmetrische Glow Orbs */}
                <div className='fixed inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.07] animate-glow-slow' />
                    <div className='absolute -bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-[0.05] animate-glow-slower' />
                </div>

                <div className='max-w-7xl mx-auto relative'>
                    <div className='mb-6'>
                        <Navbar />
                    </div>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/statistics' element={<Statistics />} />
                        <Route
                            path='/achievements'
                            element={<Achievements />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
