import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCollections } from '../services/collectionsServ';
import { envCode } from '../const/constants';

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

    const [collections, setCollections] = useState([])
    const [availableTemplates, setAvailableTemplates] = useState([])

    const setCollecToCxt = async () => {
        try {
            const colls = await getCollections('pro')
            if(envCode !== 'DEV'){
                setCollections(colls.filter(value => value.collectionCode !== 'test'))
            }else{
                setCollections(colls)
            }
            setTemplates()
        } catch (error) {
            console.log("[UserContext].setCollecToCxt.catch=Error al obtener collections")
            return []
        }
    }
    
    const setTemplates = async () => {
        const templates = [
        { key: "blank", value: "En blanco" }
        ]
        for (const collection of collections) {
            if ('templateId' in collection) {
                templates.push({ key: collection.templateId, value: collection.templateName })
            }
        }
        setAvailableTemplates(templates)
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, projectInfo, setProjectInfo, clearProject, setPlayingSample, playingSample, sessionState, availableTemplates, setCollecToCxt, collections }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)