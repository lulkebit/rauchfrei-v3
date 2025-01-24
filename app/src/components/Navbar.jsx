import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    // Berechne die Statistiken für die Profilkarte
    const rauchfreiSeit = user?.rauchfreiSeit
        ? new Date(user.rauchfreiSeit)
        : new Date();
    const heute = new Date();
    const rauchfreiTage = Math.floor(
        (heute - rauchfreiSeit) / (1000 * 60 * 60 * 24)
    );
    const gespartesGeld =
        ((rauchfreiTage * user?.zigarettenProTag || 0) /
            user?.zigarettenProPackung || 1) * (user?.preisProPackung || 0);

    const defaultAvatar = (
        <div className='w-9 h-9 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center'>
            <span className='text-emerald-400 text-sm font-semibold'>
                {user?.username?.charAt(0).toUpperCase()}
            </span>
        </div>
    );

    // Profile Card Component
    const ProfileCard = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className='absolute right-0 top-12 mt-2 w-80 rounded-xl overflow-hidden z-50'
            style={{ filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))' }}
        >
            <div className='relative overflow-hidden bg-gray-800/95 backdrop-blur-xl shadow-xl border border-gray-700/50'>
                {/* Header mit Hintergrundbild */}
                <div className='h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 relative'>
                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                        <div className='w-20 h-20 rounded-full border-4 border-gray-800/95 overflow-hidden'>
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.username}
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <div className='w-full h-full bg-emerald-500/20 flex items-center justify-center'>
                                    <span className='text-3xl text-emerald-400'>
                                        {user?.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profil Info */}
                <div className='pt-12 p-6 space-y-4'>
                    <div className='text-center'>
                        <h3 className='text-lg font-semibold text-gray-100'>
                            {user?.username}
                        </h3>
                        <p className='text-sm text-gray-400'>{user?.email}</p>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-2 gap-4 py-2'>
                        <div className='text-center p-2 rounded-lg bg-gray-700/30'>
                            <div className='text-emerald-400 font-bold'>
                                {rauchfreiTage}
                            </div>
                            <div className='text-xs text-gray-400'>
                                Tage rauchfrei
                            </div>
                        </div>
                        <div className='text-center p-2 rounded-lg bg-gray-700/30'>
                            <div className='text-emerald-400 font-bold'>
                                {gespartesGeld.toFixed(2)}€
                            </div>
                            <div className='text-xs text-gray-400'>gespart</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='space-y-2'>
                        <button
                            onClick={handleProfileClick}
                            className='w-full py-2 px-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors text-sm'
                        >
                            Profil anzeigen
                        </button>
                        <button
                            onClick={handleLogout}
                            className='w-full py-2 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-sm'
                        >
                            Ausloggen
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const NavLink = ({ href, text, icon }) => {
        const location = useLocation();
        const isActive = location.pathname === href;
        return (
            <Link
                to={href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5'
                }`}
            >
                {icon && <span className='w-5 h-5'>{icon}</span>}
                <span className='font-medium'>{text}</span>
            </Link>
        );
    };

    return (
        <div className='fixed top-0 left-0 right-0 z-50 px-4 py-3'>
            <nav className='relative overflow-visible rounded-2xl shadow-xl bg-gray-800/70 border border-gray-700/20 backdrop-blur-xl'>
                <div className='relative container mx-auto px-4 h-16'>
                    <div className='flex justify-between items-center h-full'>
                        {/* Logo */}
                        <Link
                            to='/'
                            className='flex items-center space-x-3 group'
                        >
                            <div className='p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 group-hover:bg-emerald-500/15'>
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
                            </div>
                            <span className='text-emerald-400 font-bold text-xl tracking-tight transition-colors group-hover:text-emerald-300'>
                                Rauchfrei
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className='hidden md:flex items-center space-x-2'>
                            {user ? (
                                <>
                                    <NavLink
                                        href='/'
                                        text='Dashboard'
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
                                                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                                />
                                            </svg>
                                        }
                                    />
                                    <NavLink
                                        href='/statistics'
                                        text='Statistiken'
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
                                                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                                                />
                                            </svg>
                                        }
                                    />
                                    <NavLink
                                        href='/achievements'
                                        text='Erfolge'
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
                                                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                                                />
                                            </svg>
                                        }
                                    />
                                    <div
                                        className='relative pl-2'
                                        ref={profileRef}
                                    >
                                        <button
                                            onMouseEnter={() =>
                                                setShowProfileCard(true)
                                            }
                                            onMouseLeave={() =>
                                                setShowProfileCard(false)
                                            }
                                            className='flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-emerald-500/5 transition-colors'
                                        >
                                            {user.profileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt={user.username}
                                                    className='w-9 h-9 rounded-full object-cover border-2 border-emerald-500/20'
                                                />
                                            ) : (
                                                defaultAvatar
                                            )}
                                            <span className='text-gray-300 font-medium'>
                                                {user.username}
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {showProfileCard && (
                                                <div
                                                    onMouseEnter={() =>
                                                        setShowProfileCard(true)
                                                    }
                                                    onMouseLeave={() =>
                                                        setShowProfileCard(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <ProfileCard />
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <NavLink href='/login' text='Login' />
                                    <NavLink href='/register' text='Register' />
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='md:hidden p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors'
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                ) : (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className='md:hidden border-t border-gray-700/20'
                        >
                            <div className='p-4 space-y-3'>
                                {user ? (
                                    <>
                                        <NavLink href='/' text='Dashboard' />
                                        <NavLink
                                            href='/statistics'
                                            text='Statistiken'
                                        />
                                        <NavLink
                                            href='/achievements'
                                            text='Erfolge'
                                        />
                                        <button
                                            onClick={handleProfileClick}
                                            className='w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors'
                                        >
                                            {user.profileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt={user.username}
                                                    className='w-9 h-9 rounded-full object-cover border-2 border-emerald-500/20'
                                                />
                                            ) : (
                                                defaultAvatar
                                            )}
                                            <span className='font-medium'>
                                                {user.username}
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className='w-full text-left px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/5 transition-colors font-medium'
                                        >
                                            Ausloggen
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink href='/login' text='Login' />
                                        <NavLink
                                            href='/register'
                                            text='Register'
                                        />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
