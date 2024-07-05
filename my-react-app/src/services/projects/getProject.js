import axios from "axios";

export const getProject = (projectId) => {
    return axios.
    get(`http://localhost:3001/api/project/${projectId}`)
    .then((response) => {
        const data = response
        console.log(data)
        return data
    }).catch((e) =>{
        console.log(e.response)
        return e.response
    })
}