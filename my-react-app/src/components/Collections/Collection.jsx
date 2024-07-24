import React, { useState } from 'react'
import { Sample } from './Sample'
import arrow from '../../img/arrow.svg'
import playIcon from '../../img/playIcon.svg'
import unFavButtonIcon from '../../img/unFavButtonIcon.svg'
import { getFavList } from '../../views/home' //TODO .data
import { updateFav } from '../../services/users/updateFav'

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
        const updatedFavs = await getFavList(user.id)
        setUser({ ...user, favList: updatedFavs })
    }

    return (
        <div className='collection-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <img style={{ width: '41px', height: '41px', backgroundColor: '#00FF00', borderRadius: '5px' }} src={`http://localhost:3001/api/collections/src/${collectionCode}`} alt={`imagen de libreria ${collectionName}`}/>
                <span className='collection-name'>{collectionName}</span>
                <div className='tags-container'>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className='tag'>{tag.toLowerCase()}</span>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <img className='fav-play-icon' src={playIcon} />
                    <img className='fav-play-icon' src={unFavButtonIcon} onClick={() => handleFavCollection()}/>
                </div>
                <button style={{ background: `url(${arrow})` }} className={`arrow-btn ${sampleListClass}`} onClick={() => setOpen(!isOpen)} />
            </div>
            <div className={`collection-samples-${sampleListClass}`}>
                <div style={{ borderBottom: '1px solid #262529', width: '570px' }}>
                    <span className='sample-name' style={{ marginLeft: '21px' }}>Samples</span>
                </div>
                {
                    sampleList.map((sample) => (
                        <Sample
                            user={user}
                            id={sample.id}
                            name={sample.sampleName}
                            setUser={setUser}
                        />
                    ))
                }
            </div>
        </div>
    )
}