import axios from 'axios'

export const createNewProject = async (userId, projectName) => {
    try {
        const url = 'http://localhost:3001/api/project/create'
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