import axios from 'axios'

export const deleteProject = async (userId, projectId) => {
    try {
        const url = 'http://localhost:3001/api/project/delete'
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