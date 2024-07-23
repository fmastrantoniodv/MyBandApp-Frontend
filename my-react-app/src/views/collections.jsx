import React, { useEffect } from 'react'
import { Header, ButtonText } from '../components/Register/Form'
import { routes } from '../const/constants'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import unFavButtonIcon from '../img/unFavButtonIcon.svg'
import favButtonIcon from '../img/favButtonIcon.svg'
import playIcon from '../img/playIcon.svg'
import arrow from '../img/arrow.svg'
import settingsIcon from '../img/settingsIcon.svg'
import { updateFav, getCollections, getFavList } from './home'

export const Collection = ({ user, collectionItem, setUser }) => {

    const { collectionCode, collectionName, tags, id, sampleList } = collectionItem

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
        <div id={id} className='collection-container'>
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

export const Sample = ({ user, id, name, setUser }) => {
    const isFav = user.favList.some(fav => fav.id === id)

    const action = isFav ? 'UNFAV' : 'FAV'

    const handleUpdateFav = async (sampleId, action) => {
        await updateFav(user.id, sampleId, action, async () => {
            const updatedFavs = await getFavList(user.id)
            setUser({ ...user, favList: updatedFavs })
        })
    }

    return (
        <div id={id} className='sample-container'>
            <span className='sample-name'>{name}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-play-icon' src={playIcon} />
                <img className='fav-play-icon' src={isFav ? favButtonIcon : unFavButtonIcon} onClick={() => handleUpdateFav(id, action)} />
            </div>
        </div>
    )
}

const Collections = () => {
    
    const [collections, setCollections] = useState([])

    const navigate = useNavigate()

    const { user, setUser, clearUser } = useUser()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const colls = await getCollections(user.plan)
                setCollections(colls)
            }
            catch (error) {
                console.log("Error al obtener collections")
            }
        }

        fetchData()
    }, [])

    const handleLogout = () => {
        clearUser()
        navigate(routes.login)
    }

    return (
        <div className='collections-container'>
            <Header
                textPrimaryButton={`Hola ${user.usrName}`}
                textSecondaryButton={'Cerrar sesión'}
                action1={() => navigate(routes.home)}
                action2={handleLogout}
            >
                <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
            </Header>
            <div class={'container'}>
                <div className='collections-card'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 className='favs-title'>Librerías</h3>
                        <ButtonText type={'secondary'} text='Volver a la home' action={() => navigate(routes.home)} />
                    </div>
                    {
                        collections.map((collection) =>
                            <Collection
                                user={user}
                                collectionItem={collection}
                                setUser={setUser}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Collections