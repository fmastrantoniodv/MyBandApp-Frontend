import axios from "axios";

export const getProject = (projectId) => {
    return axios.
    get(`http://localhost:3001/api/project/${projectId}`)
    .then((response) => {
        const {data} = response
        return data
    })
}