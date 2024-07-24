import axios from 'axios'

export const updateFav = async (userId, sampleId, action, callback) => {
    try {
        const url = 'http://localhost:3001/api/users/updateFav'
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