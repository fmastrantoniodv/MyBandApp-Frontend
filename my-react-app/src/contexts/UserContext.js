import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState(false)
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
    const [projectInfo, setProjectInfo] = useLocalStorage('project', {
        projectId: '',
        userId: '',
        projectName: '',
        template: '',
        channelList: []
    })

    useEffect(()=>{
        console.log('UserProvider.useEffect.user.id=', user.id)
        if(user.id){
            setSessionState(true)
        }
    }, [user])

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
        setSessionState(false)
    }

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
        <UserContext.Provider value={{ user, setUser, clearUser, projectInfo, setProjectInfo, clearProject, setPlayingSample, playingSample, sessionState }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)