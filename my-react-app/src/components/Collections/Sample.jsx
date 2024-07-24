import React from 'react'
import { getFavList } from '../../views/home' //TODO .data
import { updateFav } from '../../services/users/updateFav'
import playIcon from '../../img/playIcon.svg'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import favButtonIcon from '../../img/favButtonIcon.svg'

export const Sample = ({ user, id, name, setUser }) => {
    const isFav = user.favList.some(fav => fav.id === id)

    const action = isFav ? 'UNFAV' : 'FAV'

    const handleUpdateFav = async (sampleId, action) => {
        await updateFav(user.id, sampleId, action, async () => {
            const updatedFavs = await getFavList(user.id)
            setUser({ ...user, favList: updatedFavs })
        })
    }

    return (
        <div id={id} className='sample-container'>
            <span className='sample-name'>{name}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-play-icon' src={playIcon} />
                <img className='fav-play-icon' src={isFav ? favButtonIcon : unFavButtonIcon} onClick={() => handleUpdateFav(id, action)} />
            </div>
        </div>
    )
}