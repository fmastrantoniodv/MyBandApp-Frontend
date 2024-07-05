import axios from "axios";

export const getUserFavs = async (userId) => {
    return await axios.
    get(`http://localhost:3001/api/users/getUserFavsList/${userId}`)
    .then((response) => {
        const data = response
        return data
    }).catch((e) => {
        return e.response
    })
}