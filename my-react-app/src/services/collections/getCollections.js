import axios from 'axios'

export const getCollections = async (plan) => {
    try {
        const url = `http://localhost:3001/api/collections/plan/${plan}`
        const response = await axios.get(url)
        console.log("getCollections: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}