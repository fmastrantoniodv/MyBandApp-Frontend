import React, { useEffect, useState } from 'react'
import LottieAnimation from '../Register/LoadingAnimation'
import { endpointBackend, routes, envCode } from '../../const/constants';
import favButtonIcon from '../../img/favButtonIcon.svg'
import playIcon from '../../img/playIcon.svg'
import { useUser } from '../../contexts/UserContext';
import { updateFav, getUserFavsServ } from '../../services/usersServ'
import { useNavigate } from 'react-router-dom';

export const CollectionsCard = () => {
    const [loadingCollections, setLoadingCollections] = useState(false)
    const { user, setUser, collections } = useUser()
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log('[CollectionsCard].useEffect.collections', collections)
    }, [collections])

    const handleFavCollection = async (collectionItem) => {
        const { sampleList } = collectionItem
        for (const sample of sampleList) {
            await updateFav(user.id, sample.id, 'FAV', () => {
                return
            })
        }
        const updatedFavs = await getUserFavsServ(user.id)
        setUser({ ...user, favList: updatedFavs.data })
    }

    return (
        <div className='collections-section'>
            <div className='collections-section-header'>
                <h3 className='collections-title'>Últimas librerias</h3>
                <button className='seemore-btn' onClick={() => navigate(routes.collections)}>Ver más</button>
            </div>
            {loadingCollections &&
                (<div className='loading-collections'>
                    <LottieAnimation width={200} height={200} />
                </div>)
            }
            <div className='collection-cards-container'>
                {
                    collections.map((collection) => (
                        <CollectionCard key={collection.id} collectionItem={collection} onFavCollection={() => handleFavCollection(collection)} />
                    ))
                }

            </div>
        </div>
    )
}

export const CollectionCard = ({ collectionItem, onFavCollection }) => {
    const { collectionName, collectionCode } = collectionItem

    return (
        <div className='collection-card'>
            <img 
                className='collection-cover' 
                src={`${endpointBackend}/api/collections/src/${collectionCode}`} 
                alt={`imagen de libreria ${collectionName}`} 
            />
            <span className='collection-name'>{collectionName}</span>
            <div className='collection-btn-container'>
                <div className='collection-button'>
                    <img className='fav-play-icon' src={playIcon} />
                    Escuchar muestra
                </div>
                <div className='collection-button' onClick={onFavCollection}>
                    <img className='fav-play-icon' src={favButtonIcon} />
                    Marcar Favorito
                </div>
            </div>
        </div>
    )
}