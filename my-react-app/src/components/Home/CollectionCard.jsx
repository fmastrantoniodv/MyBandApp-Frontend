import React from 'react'
import favButtonIcon from '../../img/favButtonIcon.svg'
import playIcon from '../../img/playIcon.svg'

export const CollectionCard = ({ collectionItem, onFavCollection }) => {

    const { collectionName, collectionCode } = collectionItem

    return (
        <div className='collection-card'>
            <img style={{ height: '180px', width: '180px', backgroundColor: '#00FF00' }} src={`http://localhost:3001/api/collections/src/${collectionCode}`} alt={`imagen de libreria ${collectionName}`} />
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