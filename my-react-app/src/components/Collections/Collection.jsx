import React, { useState } from 'react'
import { Sample } from './Sample'
import arrow from '../../img/arrow.svg'
import PlaySample from '../Home/PlaySample'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import { getUserFavsServ, updateFav } from '../../services/usersServ'

export const Collection = ({ user, collectionItem, setUser }) => {

    const { collectionCode, collectionName, tags, sampleList } = collectionItem

    const [isOpen, setOpen] = useState(false)

    const sampleListClass = isOpen ? 'abierto' : 'cerrado'

    const handleFavCollection = async () => {
        for (const sample of sampleList) {
            await updateFav(user.id, sample.id, 'FAV', () => {
                return
            })
        }
        const updatedFavs = await getUserFavsServ(user.id)
        setUser({ ...user, favList: updatedFavs.data })
    }

    return (
        <div className='collection-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <img className='collection-img' src={`http://localhost:3001/api/collections/src/${collectionCode}`} alt={`imagen de libreria ${collectionName}`}/>
                <span className='collection-name'>{collectionName}</span>
                <div className='tags-container'>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className='tag'>{tag.toLowerCase()}</span>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <PlaySample sampleInfo={sampleList[0]}/>
                    <img className='fav-play-icon' src={unFavButtonIcon} onClick={() => handleFavCollection()} alt='boton de agregar collection a favoritos'/>
                </div>
                <button style={{ background: `url(${arrow})` }} className={`arrow-btn ${sampleListClass}`} onClick={() => setOpen(!isOpen)} />
            </div>
            <div className={`collection-samples-${sampleListClass}`}>
                <span className='samples-title'>Samples</span>
                {
                    sampleList.map((sample) => (
                        <Sample key={sample.id} user={user} sampleInfo={sample} setUser={setUser}/>
                    ))
                }
            </div>
        </div>
    )
}