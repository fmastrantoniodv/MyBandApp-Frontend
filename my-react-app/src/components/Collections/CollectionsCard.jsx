import React, { useEffect, useState } from 'react'
import LottieAnimation from '../Register/LoadingAnimation'
import { endpointBackend, routes } from '../../const/constants';
import playIcon from '../../img/playIcon.svg'
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const CollectionsCard = () => {
    const [loadingCollections, setLoadingCollections] = useState(false)
    const { collections } = useUser()
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log('[CollectionsCard].useEffect.collections', collections)
        if(collections !== undefined && collections.length <= 0){
            setLoadingCollections(true)
        }else{
            setLoadingCollections(false)
        }
    }, [collections])

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
                        <CollectionCard 
                            key={collection.id} 
                            collectionItem={collection} 
                            onSelect={() => navigate(`${routes.collections}?code=${collection.collectionCode}`)}
                        />
                    ))
                }

            </div>
        </div>
    )
}

export const CollectionCard = ({ collectionItem, onSelect }) => {
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
                <div className='collection-button' onClick={() => onSelect()}>
                    <img className='fav-play-icon' src={playIcon} />
                    Escuchar muestras
                </div>
            </div>
        </div>
    )
}