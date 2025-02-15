import axios from 'axios'
import { endpointBackend } from '../const/constants'

export const getPlanList = async (plan) => {
    try {
        const response = await axios.get(`${endpointBackend}/api/appConfig/getPlanList`)
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}