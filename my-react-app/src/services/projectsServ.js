import axios from 'axios'
const endpointBackend = process.env.REACT_APP_ENDPOINT_BACKEND;

export const createNewProject = async (userId, projectName) => {
    try {
        const url = `${endpointBackend}/api/project/create`
        const body = {
            "userId": userId,
            "projectName": projectName
        };
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteProject = async (userId, projectId) => {
    try {
        const url = `${endpointBackend}/api/project/delete`
        const body = {
            "userId": userId,
            "projectId": projectId
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProjects = async (userId) => {
    try {
        const url = `${endpointBackend}/api/project/getUserProjects/${userId}`
        const response = await axios.get(url)
        console.log("getProjects: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProjectServ = async (projectId) => {
    return axios.
    get(`${endpointBackend}/api/project/${projectId}`)
    .then((response) => {
        const data = response.data
        console.log('[getProject.js].getProject.data=',data)
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status != 200){
        console.log('[studio.jsx].[useEffect].setInitValues.data.status=', data.status)
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.log(e.response)
        return e.response
    })
}

export const saveProjectServ = async (projectData) => {
    return axios.
    post(`${endpointBackend}/api/project/save`, projectData)
    .then((response) => {
        const data = response.data
        console.log('[saveProject.js].saveProject.data=',data)
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status != 200){
        console.log('[saveProject.js].data.status=', data.status)
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.log(e.response)
        return 'ERROR'
    })
}