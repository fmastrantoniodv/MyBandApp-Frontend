import React, { useState } from 'react'
import { getUserFavsServ, updateFav } from '../../services/usersServ'
import PlaySample from '../Home/PlaySample'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import favButtonIcon from '../../img/favButtonIcon.svg'

export const Sample = ({ user, sampleInfo, setUser }) => {
    
    const { favList } = user
    const [isFav, setIsFav] = useState(favList.some(fav => fav.id === sampleInfo.id))

    const handleUpdateFav = async (sampleId) => {
        updateFav(user.id, sampleId, isFav ? 'UNFAV' : 'FAV')
        setUser({ ...user, favList: favList.filter(fav => fav.id !== sampleId) })
        setIsFav(!isFav)
    }

    return (
        <div className='sample-container'>
            <span className='sample-name'>{sampleInfo.sampleName}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <PlaySample sampleInfo={sampleInfo}/>
                <img className='fav-play-icon' src={isFav ? favButtonIcon : unFavButtonIcon} onClick={() => handleUpdateFav(sampleInfo.id)} alt='boton de agregar sample a favoritos'/>
            </div>
        </div>
    )
}