import axios from "axios";

export const getProjectServ = async (projectId) => {
    return axios.
    get(`http://localhost:3001/api/project/${projectId}`)
    .then((response) => {
        const data = response.data
        console.log('[getProject.js].getProject.data=',data)
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status != 200){
        console.log('[studio.jsx].[useEffect].setInitValues.data.status=', data.status)
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.log(e.response)
        return e.response
    })
}