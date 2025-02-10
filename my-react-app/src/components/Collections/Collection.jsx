import React, { useState } from 'react'
import { Sample } from './Sample'
import arrow from '../../img/arrow.svg'
import { capitalizeFirstLetter, endpointBackend, isAvailableWithUserPlan } from '../../const/constants'
import { useSettings } from '../../contexts/SettingsContext'

export const Collection = ({ user, collectionItem, setUser, initialState }) => {
    const { collectionCode, collectionName, tags, sampleList, plan } = collectionItem
    const [isOpen, setOpen] = useState(initialState)
    const sampleListClass = isOpen ? 'abierto' : 'cerrado'
    const { currentSettings } = useSettings()
    const libAvailable = isAvailableWithUserPlan(user.plan, plan, currentSettings.planList)

    return (
        <div className='collection-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className='collection-img' src={`${endpointBackend}/api/collections/src/${collectionCode}`} alt={`imagen de libreria ${collectionName}`}/>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', marginTop: '0px', textAlign: 'left', width: '200px'}}>
                        <span className='collection-item-name'>{collectionName}</span>
                        <span className='collection-item-plan'>{capitalizeFirstLetter(plan)}
                            
                        </span>
                        {!libAvailable && <span className='collection-item-error-msg'>Tu plan no incluye esta libreria</span>}
                    </div>
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
                        <Sample key={sample.id} user={user} sampleInfo={sample} setUser={setUser} libAvailable={libAvailable}/>
                    ))
                }
            </div>
        </div>
    )
}