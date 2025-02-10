import axios from 'axios'
import { endpointBackend } from '../const/constants'

export const getPlanList = async (plan) => {
    try {
        const response = await axios.get(`${endpointBackend}/api/appConfig/getPlanList`)
        console.log('[appConfigServ.js].getPlanList.response=', response)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}