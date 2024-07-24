import axios from 'axios'

export const login = async (data) => {
    try {
        const url = 'http://localhost:3001/api/users/login';
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