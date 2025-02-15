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
        console.error(error)
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
        console.error(error)
        throw error
    }
}

export const getProjects = async (userId) => {
    try {
        const url = `${endpointBackend}/api/project/getUserProjects/${userId}`
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getProjectServ = async (projectId) => {
    return axios.
    get(`${endpointBackend}/api/project/${projectId}`)
    .then((response) => {
        const data = response.data
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status != 200){
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.error(e.response)
        return e.response
    })
}

export const saveProjectServ = async (projectData) => {
    return axios.
    post(`${endpointBackend}/api/project/save`, projectData)
    .then((response) => {
        const data = response.data
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status != 200){
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.error(e.response)
        return 'ERROR'
    })
}