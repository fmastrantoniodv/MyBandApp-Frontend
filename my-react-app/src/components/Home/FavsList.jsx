import React, { useState } from 'react'
import LottieAnimation from '../Register/LoadingAnimation'
import { useUser } from '../../contexts/UserContext';
import { updateFav, getUserFavsServ } from '../../services/usersServ'
import favButtonIcon from '../../img/favButtonIcon.svg'
import PlaySample from './PlaySample'
import playIcon from '../../img/playIcon.svg'

export const FavsList = () => {
    const [loadingFavs, setLoadingFavs] = useState(false)
    const { user, setUser, collections } = useUser()

    const getCollectionsNameByCode = (collectionCode) => {
        console.log('[FavList.jsx].FavsList.getCollectionsNameByCode.collectionCode=', collectionCode)
        var collectionsName = '';
        if(collections !== undefined){
            var collectionsItem = collections.find((collect)=> collect.collectionCode === collectionCode)
            console.log('[FavList.jsx].FavsList.getCollectionsNameByCode.collectionsItem=', collectionsItem)
            if(collectionsItem !== undefined){
                collectionsName = collectionsItem.collectionName
            }
        }
        return collectionsName
    }

    const handleUnfav = async (sampleId) => {
        setLoadingFavs(true)
        await updateFav(user.id, sampleId, 'UNFAV')
        setUser({ ...user, favList: user.favList.filter(fav => fav.id !== sampleId) })
        setLoadingFavs(false)
    }

    return (
        <div className='favs-card'>
            {loadingFavs &&
                (<div className='loading-favs'>
                    <LottieAnimation width={200} height={200} />
                </div>)
            }
            <h3 className='favs-title'>Mis favoritos</h3>
            { user.favList.length < 1 ?
                <span>Aun no agregaste favoritos</span> :
                <div style={{ display: 'flex', margin: '7px 0px 9px 0px' }}>
                    <span className='fav-item'>Nombre de muestra</span>
                    <span className='fav-item'>Pack origen</span>
                </div>
            }
            {
            user.favList &&
                user.favList.map((fav) => (
                    <FavItem key={fav.id} favInfo={fav} onUnfav={() => handleUnfav(fav.id)} collectionName={getCollectionsNameByCode(fav.collectionCode)} />
                ))
            }
        </div>
    )
}

export const FavItem = ({ favInfo, onUnfav, collectionName }) => {
    console.log('[FavItem].favInfo', favInfo)
    const [playPressed, setPlayPressed] = useState(false)
    const { setPlayingSample } = useUser()

    const playBeforeLoad = () => {
        setPlayPressed(true)
        setPlayingSample(favInfo.id)
    }

    return (
        <div className='fav-item-container'>
            <span className='fav-item'>{favInfo.sampleName}</span>
            <span className='fav-item'>{collectionName}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                {!playPressed ?
                    <button className="btn-project-controls" onClick={() => playBeforeLoad()}>
                        <img src={playIcon} alt="icono de reproducir" width="25px" />
                    </button>
                    :
                    <PlaySample sampleInfo={favInfo}/>
                }
                <img className='fav-play-icon' src={favButtonIcon} onClick={onUnfav} />
            </div>
        </div>
    )
}