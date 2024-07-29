import axios from "axios";

export const getUserFavsServ = async (userId) => {
    return await axios.
    get(`http://localhost:3001/api/users/getUserFavsList/${userId}`)
    .then((response) => {
        const data = response
        return data
    }).catch((e) => {
        return e.response
    })
}