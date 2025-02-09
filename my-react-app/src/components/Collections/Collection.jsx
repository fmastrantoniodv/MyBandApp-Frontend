import React, { useState } from 'react'
import { Sample } from './Sample'
import arrow from '../../img/arrow.svg'
import { endpointBackend } from '../../const/constants'

export const Collection = ({ user, collectionItem, setUser, initialState }) => {
    const { collectionCode, collectionName, tags, sampleList } = collectionItem
    const [isOpen, setOpen] = useState(initialState)
    const sampleListClass = isOpen ? 'abierto' : 'cerrado'

    return (
        <div className='collection-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className='collection-img' src={`${endpointBackend}/api/collections/src/${collectionCode}`} alt={`imagen de libreria ${collectionName}`}/>
                    <span className='collection-name' style={{textAlign: 'left', marginLeft: '10px', marginTop: '0px'}}>{collectionName}</span>
                </div>
                <div className='tags-container'>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className='tag'>{tag.toLowerCase()}</span>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button style={{ background: `url(${arrow})` }} className={`arrow-btn ${sampleListClass}`} onClick={() => setOpen(!isOpen)} />
                </div>
            </div>
            <div className={`collection-samples-${sampleListClass}`}>
                {
                    sampleList.map((sample) => (
                        <Sample key={sample.id} user={user} sampleInfo={sample} setUser={setUser}/>
                    ))
                }
            </div>
        </div>
    )
}