import axios from "axios";

export const getUserFavs = (userId) => {
    return axios.
    get(`http://localhost:3001/api/users/getUserFavsList/${userId}`)
    .then((response) => {
        const {data} = response
        return data
    })
}