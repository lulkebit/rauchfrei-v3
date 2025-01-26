import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch(
                'http://localhost:8080/api/user/profile',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Fehler beim Laden der Benutzerdaten');
            }

            const userData = await response.json();

            // Konvertiere die Werte in die richtigen Typen
            const normalizedUserData = {
                ...userData,
                zigarettenProTag: Number(userData.zigarettenProTag),
                preisProPackung: Number(userData.preisProPackung),
                zigarettenProPackung: Number(
                    userData.zigarettenProPackung || 20
                ),
                rauchfreiSeit: userData.rauchfreiSeit,
            };

            setUser(normalizedUserData);
        } catch (error) {
            console.error('Fehler beim Laden der Benutzerdaten:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:8080/api/user/profile',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                throw new Error('Fehler beim Aktualisieren der Benutzerdaten');
            }

            const userData = await response.json();
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Fehler beim Aktualisieren:', error);
            throw error;
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('username', userData.username);
        if (userData.profileImage) {
            localStorage.setItem('profileImage', userData.profileImage);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('profileImage');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuth muss innerhalb eines AuthProviders verwendet werden'
        );
    }
    return context;
};
