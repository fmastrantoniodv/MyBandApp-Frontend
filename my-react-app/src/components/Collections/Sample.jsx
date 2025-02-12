import React, { useState } from 'react'
import { getUserFavsServ, updateFav } from '../../services/usersServ'
import PlaySample from '../Home/PlaySample'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import favButtonIcon from '../../img/favButtonIcon.svg'
import { useUser } from '../../contexts/UserContext'
import playIcon from '../../img/playIcon.svg'

export const Sample = ({ user, sampleInfo, setUser, libAvailable }) => {
    
    const { favList, } = user
    const [isFav, setIsFav] = useState(favList.some(fav => fav.id === sampleInfo.id))
    const [playPressed, setPlayPressed] = useState(false)
    const { setPlayingSample } = useUser()

    const handleUpdateFav = async (sampleId) => {
        updateFav(user.id, sampleId, isFav ? 'UNFAV' : 'FAV')
        setUser({ ...user, favList: favList.filter(fav => fav.id !== sampleId) })
        setIsFav(!isFav)
    }

    const playBeforeLoad = () => {
        setPlayPressed(true)
        setPlayingSample(sampleInfo.id)
    }

    return (
        <div className='sample-container'>
            <span className='sample-name'>{sampleInfo.sampleName}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                {!playPressed ?
                    <button className="btn-project-controls" onClick={() => playBeforeLoad()}>
                        <img src={playIcon} alt="icono de reproducir" width="25px" />
                    </button>
                    :
                <PlaySample sampleInfo={sampleInfo}/>
                }
                {libAvailable && <img className='fav-play-icon' src={isFav ? favButtonIcon : unFavButtonIcon} onClick={() => handleUpdateFav(sampleInfo.id)} alt='boton de agregar sample a favoritos'/>}
            </div>
        </div>
    )
}