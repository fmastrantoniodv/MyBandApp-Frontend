import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCollections } from '../services/collectionsServ';
import { envCode } from '../const/constants';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [playingSample, setPlayingSample] = useState(null)
    const [availableTemplates, setAvailableTemplates] = useState([])
    const [sessionState, setSessionState] = useLocalStorage('session',false)
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
        if(!sessionState){
            clearLocalStorage()
        }
    }, [sessionState])

    const clearLocalStorage = () => {
        clearUser()
        clearCollections()
        clearProject()
    }

    const initSession = async (userData) => {
        await setUser(userData)
        await setCollecToCxt()
        setSessionState(true)
    }

    const closeSession = () => {
        setSessionState(false)
    }

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

    const [collections, setCollections] = useLocalStorage('collections', {
        collections: []
    })

    const clearCollections = () => {
        setCollections({collections: []})
        window.localStorage.removeItem('collections')
    }

    const setCollecToCxt = async () => {
        console.log("[UserContext].setCollecToCxt.init")
        try {
            const colls = await getCollections('pro')
            if(envCode !== 'DEV'){
                setCollections(colls.filter(value => value.collectionCode !== 'test'))
            }else{
                setCollections(colls)
            }
        } catch (error) {
            console.log("[UserContext].setCollecToCxt.catch=Error al obtener collections")
            return []
        }
    }
    
    const setTemplates = async () => {
        console.log('[UserContext].setTemplates.init')
        const templates = [
        { key: "blank", value: "En blanco" }
        ]
        console.log('[UserContext].setTemplates.collections=',collections)
        for (const collection of collections) {
            console.log('[UserContext].setTemplates.collection=', collection)
            if ('templateId' in collection) {
                templates.push({ key: collection.templateId, value: collection.templateName })
            }
        }
        setAvailableTemplates(templates)
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, projectInfo, setProjectInfo, clearProject, setPlayingSample, playingSample, sessionState, availableTemplates, collections, setTemplates, initSession, closeSession }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)