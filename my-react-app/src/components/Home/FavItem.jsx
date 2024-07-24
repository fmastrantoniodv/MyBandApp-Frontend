import React from 'react'
import playIcon from '../../img/playIcon.svg'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'

export const FavItem = ({ name, pack, onUnfav }) => {
    return (
        <div className='fav-item-container'>
            <span className='fav-item'>{name}</span>
            <span className='fav-item'>{pack}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-play-icon' src={playIcon} />
                <img className='fav-play-icon' src={unFavButtonIcon} onClick={onUnfav} />
            </div>
        </div>
    )
}