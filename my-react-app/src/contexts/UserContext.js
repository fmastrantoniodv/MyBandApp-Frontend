import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', {
        usrName: '',
        plan: '',
        id: '',
        email: '',
        password: '',
        projectList: [],
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
            projectList: [],
            registerDate: '',
            expirationPlanDate: '',
            favList: []
        })
        window.localStorage.removeItem('user')
    }

    const [projectInfo, setProjectInfo] = useLocalStorage('project', {
        projectId: '',
        userId: '',
        projectName: '',
        template: '',
        channelList: []
    })

    const clearProject = () => {
        setProjectInfo({
            projectId: '',
            userId: '',
            projectName: '',
            template: '',
            tempo: 100,
            channelList: []
        })
        window.localStorage.removeItem('project')
    }

    const [playingSample, setPlayingSample] = useState(null)

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, projectInfo, setProjectInfo, clearProject, setPlayingSample, playingSample }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)