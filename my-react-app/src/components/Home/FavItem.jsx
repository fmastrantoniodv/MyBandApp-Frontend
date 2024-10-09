import React from 'react'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import favButtonIcon from '../../img/favButtonIcon.svg'
import PlaySample from './PlaySample'

export const FavItem = ({ favInfo, onUnfav }) => {
    return (
        <div className='fav-item-container'>
            <span className='fav-item'>{favInfo.sampleName}</span>
            <span className='fav-item'>{favInfo.collectionCode}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <PlaySample sampleInfo={favInfo}/>
                <img className='fav-play-icon' src={favButtonIcon} onClick={onUnfav} />
            </div>
        </div>
    )
}