import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const defaultAvatar = (
        <div className='w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center'>
            <span className='text-emerald-400 text-sm font-medium'>
                {user?.username?.charAt(0).toUpperCase()}
            </span>
        </div>
    );

    return (
        <nav className='relative h-20 overflow-hidden rounded-2xl shadow-xl bg-gray-800/50 border border-gray-700/20'>
            {/* Glass Effect Container */}
            <div className='absolute inset-0 backdrop-blur-lg bg-gray-900/40' />

            {/* Content */}
            <div className='relative container mx-auto px-6 h-full'>
                <div className='flex justify-between items-center h-full'>
                    {/* Logo und Titel */}
                    <div className='flex items-center space-x-4'>
                        <div className='p-3 bg-gray-800/70 border border-gray-700/50 rounded-xl backdrop-blur-sm shadow-lg'>
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
                        </div>
                        <span className='text-emerald-400 font-bold text-2xl tracking-tight'>
                            Rauchfrei
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        {user ? (
                            <>
                                <NavLink href='/' text='Dashboard' />
                                <NavLink
                                    href='/statistics'
                                    text='Statistiken'
                                />
                                <NavLink href='/achievements' text='Erfolge' />
                                <NavLink href='/profile' text='Profil' />
                                <div className='flex items-center space-x-4'>
                                    <div className='flex items-center space-x-3'>
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt={user.username}
                                                className='w-8 h-8 rounded-full object-cover border border-emerald-500/30'
                                            />
                                        ) : (
                                            defaultAvatar
                                        )}
                                        <span className='text-emerald-400'>
                                            {user.username}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className='text-gray-300 hover:text-emerald-400 transition-colors'
                                    >
                                        Logout
                                    </button>
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
                        className='md:hidden p-2 rounded-lg bg-gray-800/70 text-emerald-400 focus:outline-none'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <svg
                                className='h-6 w-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        ) : (
                            <svg
                                className='h-6 w-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className='absolute top-full left-0 right-0 mt-2 md:hidden'>
                        <div className='mx-4 rounded-xl backdrop-blur-lg bg-gray-800/70 p-3 border border-gray-700/30 shadow-xl'>
                            {user ? (
                                <>
                                    <div className='flex items-center space-x-3 px-4 py-2 border-b border-gray-700/30 mb-2'>
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt={user.username}
                                                className='w-8 h-8 rounded-full object-cover border border-emerald-500/30'
                                            />
                                        ) : (
                                            defaultAvatar
                                        )}
                                        <span className='text-emerald-400'>
                                            {user.username}
                                        </span>
                                    </div>
                                    <MobileNavLink href='/' text='Dashboard' />
                                    <MobileNavLink
                                        href='/statistics'
                                        text='Statistiken'
                                    />
                                    <MobileNavLink
                                        href='/achievements'
                                        text='Erfolge'
                                    />
                                    <MobileNavLink
                                        href='/profile'
                                        text='Profil'
                                    />
                                    <button
                                        onClick={handleLogout}
                                        className='w-full text-left px-4 py-2 text-gray-300 hover:text-emerald-400 transition-colors'
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <MobileNavLink href='/login' text='Login' />
                                    <MobileNavLink
                                        href='/register'
                                        text='Register'
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

const NavLink = ({ href, text }) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            to={href}
            className={`text-gray-300 transition-colors duration-300 font-medium relative group
                ${isActive ? 'text-emerald-400' : 'hover:text-emerald-400'}`}
        >
            {text}
            <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/50 transform transition-transform duration-300
                ${
                    isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
        </Link>
    );
};

const MobileNavLink = ({ href, text }) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            to={href}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300
                ${
                    isActive
                        ? 'text-emerald-400 bg-gray-800/70'
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50'
                }`}
        >
            {text}
        </Link>
    );
};

export default Navbar;
