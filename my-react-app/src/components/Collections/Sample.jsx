import React from 'react'
import { getUserFavsServ, updateFav } from '../../services/usersServ'
import PlaySample from '../Home/PlaySample'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import favButtonIcon from '../../img/favButtonIcon.svg'

export const Sample = ({ user, sampleInfo, setUser }) => {
    
    const { favList } = user

    const isFav = favList.some(fav => fav.id === sampleInfo.id)

    const action = isFav ? 'UNFAV' : 'FAV'

    const handleUpdateFav = async (sampleId, action) => {
        await updateFav(user.id, sampleId, action, async () => {
            const updatedFavs = await getUserFavsServ(user.id)
            setUser({ ...user, favList: updatedFavs.data })
        })
    }

    return (
        <div className='sample-container'>
            <span className='sample-name'>{sampleInfo.sampleName}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <PlaySample sampleInfo={sampleInfo}/>
                <img className='fav-play-icon' src={isFav ? favButtonIcon : unFavButtonIcon} onClick={() => handleUpdateFav(sampleInfo.id, action)} alt='boton de agregar sample a favoritos'/>
            </div>
        </div>
    )
}