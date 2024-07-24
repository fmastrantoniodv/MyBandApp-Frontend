import axios from 'axios'

export const getProjects = async (userId) => {
    try {
        const url = `http://localhost:3001/api/project/getUserProjects/${userId}`
        const response = await axios.get(url)
        console.log("getProjects: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}