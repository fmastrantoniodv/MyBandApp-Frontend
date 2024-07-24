import axios from 'axios'

export const createNewUser = async (data) => {
    try {
        const url = 'http://localhost:3001/api/users/register'
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