import axios from 'axios'
const endpointBackend = process.env.REACT_APP_ENDPOINT_BACKEND;

export const createNewUser = async (data) => {
    try {
        const url = `${endpointBackend}/api/users/register`
        const body = {
            "usrName": data.name,
            "email": data.email,
            "password": data.password,
            "plan": data.suscription
        }
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const login = async (data) => {
    try {
        const url = `${endpointBackend}/api/users/login`
        const body = {
            "email": data.email,
            "password": data.password
        }
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUserFavsServ = async (userId) => {
    return await axios.
    get(`${endpointBackend}/api/users/getUserFavsList/${userId}`)
    .then((response) => {
        const data = response
        return data
    }).catch((e) => {
        return e.response
    })
}

export const updateFav = async (userId, sampleId, action, callback) => {
    try {
        const url = `${endpointBackend}/api/users/updateFav`
        const body = {
            "userId": userId,
            "sampleId": sampleId,
            "actionCode": action
        }
        const response = await axios.post(url, body)
        callback()
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updatePlan = async (userId, newPlan) => {
    try {
        const url = `${endpointBackend}/api/users/updatePlan`
        const body = {
            "userId": userId,
            "newPlan": newPlan
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}