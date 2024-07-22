import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', {
        usrName: '',
        plan: '',
        id: '',
        email: '',
        password: '',
        registerDate: '',
        expirationPlanDate: '',
        favList: []
    })

    const clearUser = () => {
        setUser({
            usrName: '',
            plan: '',
            id: '',
            email: '',
            password: '',
            registerDate: '',
            expirationPlanDate: '',
            favList: []
        })
        window.localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)