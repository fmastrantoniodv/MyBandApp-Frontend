import React from 'react'
import { getUserFavsServ, updateFav } from '../../services/usersServ'
import playIcon from '../../img/playIcon.svg'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import favButtonIcon from '../../img/favButtonIcon.svg'

export const Sample = ({ user, id, name, setUser }) => {
    
    const { favList } = user

    const isFav = favList.some(fav => fav.id === id)

    const action = isFav ? 'UNFAV' : 'FAV'

    const handleUpdateFav = async (sampleId, action) => {
        await updateFav(user.id, sampleId, action, async () => {
            const updatedFavs = await getUserFavsServ(user.id)
            setUser({ ...user, favList: updatedFavs.data })
        })
    }

    return (
        <div className='sample-container'>
            <span className='sample-name'>{name}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-play-icon' src={playIcon} alt='boton de reproducir sample'/>
                <img className='fav-play-icon' src={isFav ? favButtonIcon : unFavButtonIcon} onClick={() => handleUpdateFav(id, action)} alt='boton de agregar sample a favoritos'/>
            </div>
        </div>
    )
}