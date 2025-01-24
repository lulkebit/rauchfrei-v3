import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to='/' />;
    }

    return children;
};

export default RedirectIfAuthenticated;
