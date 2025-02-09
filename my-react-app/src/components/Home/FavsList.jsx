import React, { useState } from 'react'
import LottieAnimation from '../Register/LoadingAnimation'
import { useUser } from '../../contexts/UserContext';
import { updateFav, getUserFavsServ } from '../../services/usersServ'
import favButtonIcon from '../../img/favButtonIcon.svg'
import PlaySample from './PlaySample'

export const FavsList = () => {
    const [loadingFavs, setLoadingFavs] = useState(false)
    const { user, setUser, collections } = useUser()

    const getCollectionsNameByCode = (collectionCode) => {
        return collections.find((collect)=> collect.collectionCode === collectionCode).collectionName
    }

    const handleUnfav = async (sampleId) => {
        setLoadingFavs(true)
        await updateFav(user.id, sampleId, 'UNFAV', async () => {
            const updatedFavs = await getUserFavsServ(user.id)
            setUser({ ...user, favList: updatedFavs.data })
            setLoadingFavs(false)
        })
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
                user.favList.map((fav) => (
                    <FavItem key={fav.id} favInfo={fav} onUnfav={() => handleUnfav(fav.id)} collectionName={getCollectionsNameByCode(fav.collectionCode)} />
                ))
            }
        </div>
    )
}

export const FavItem = ({ favInfo, onUnfav, collectionName }) => {
    console.log('[FavItem].favInfo', favInfo)

    return (
        <div className='fav-item-container'>
            <span className='fav-item'>{favInfo.sampleName}</span>
            <span className='fav-item'>{collectionName}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <PlaySample sampleInfo={favInfo}/>
                <img className='fav-play-icon' src={favButtonIcon} onClick={onUnfav} />
            </div>
        </div>
    )
}