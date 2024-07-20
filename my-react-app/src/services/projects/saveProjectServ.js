import axios from "axios";

export const saveProjectServ = async (projectData) => {
    return axios.
    post(`http://localhost:3001/api/project/save`, projectData)
    .then((response) => {
        const data = response.data
        console.log('[saveProject.js].saveProject.data=',data)
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status != 200){
        console.log('[saveProject.js].data.status=', data.status)
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.log(e.response)
        return e.response
    })
}