import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const loadUserData = async () => {
        try {
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
            if (
                error.message.includes('401') ||
                error.message.includes('403')
            ) {
                // Token ist ungültig oder abgelaufen
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            if (!token) {
                throw new Error('Nicht authentifiziert');
            }

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
            if (
                error.message.includes('401') ||
                error.message.includes('403')
            ) {
                logout();
            }
            throw error;
        }
    };

    useEffect(() => {
        loadUserData();
    }, [token]);

    const login = (userData) => {
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('username', userData.username);
        if (userData.profileImage) {
            localStorage.setItem('profileImage', userData.profileImage);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('profileImage');
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, loading, updateUser }}
        >
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
