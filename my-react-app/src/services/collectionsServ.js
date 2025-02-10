import axios from 'axios'
import { endpointBackend } from '../const/constants'

export const getCollections = async (plan) => {
    try {
        const url = `${endpointBackend}/api/collections/plan/${plan}`
        const response = await axios.get(url)
        console.log("getCollections: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}