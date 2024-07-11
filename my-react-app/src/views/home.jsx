import React, { useContext, useEffect, useState } from 'react'
import unFavButtonIcon from '../img/unFavButtonIcon.svg'
import favButtonIcon from '../img/favButtonIcon.svg'
import seeMoreIcon from '../img/seeMoreIcon.svg'
import playIcon from '../img/playIcon.svg'
import { Header } from '../components/Register/Form'
import { routes } from '../const/constants'
import { UserContext } from '../contexts/UserContext';
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal"
import axios from 'axios'
import LottieAnimation from '../components/Register/LoadingAnimation'

export const LibCard = ({ id, name, img, onFavCollection }) => {
    return (
        <div id={id} className='lib-card'>
            <div style={{
                height: '180px',
                width: '180px',
                backgroundColor: '#00FF00'
            }}/>
            <span style={{width: '100%', fontFamily: 'Inter-Medium, sans-serif', fontSize: '14px'}}>{name}</span>
            <div style={{display: 'flex', width: '180px', height: '67px', gap: '10px', fontSize: '12px', textAlign: 'center', marginTop:'13px', fontFamily: 'Inter-Regular, sans-serif'}}>
                <div className='fav-item-container' style={{width: '100%', flexDirection: 'column', justifyContent: 'center'}}>
                    <img className='fav-item-icon' src={playIcon} />
                    Escuchar muestra
                </div>
                <div className='fav-item-container' style={{width: '100%', flexDirection: 'column', justifyContent: 'center'}} onClick={onFavCollection}>
                    <img className='fav-item-icon' src={favButtonIcon} />
                    Marcar Favorito
                </div>
            </div>
        </div>
    )
}

export const FavItem = ({ id, name, pack, onUnfav }) => {
    return (
        <div id={id} className='fav-item-container'>
            <span className='fav-item'>{name}</span>
            <span className='fav-item'>{pack}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-item-icon' src={playIcon} />
                <img className='fav-item-icon' src={unFavButtonIcon} onClick={onUnfav} />
            </div>
        </div>
    )
}

export const getFavList = async (userId) => {
    try {
        const url = `http://localhost:3001/api/users/getUserFavsList/${userId}`
        const response = await axios.get(url)
        console.log("favlist:" + JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateFav = async ( userId, sampleId, action, callback ) => {
    try {
        const url = 'http://localhost:3001/api/users/updateFav'
        const body = {
            "userId": userId,
            "sampleId": sampleId,
            "actionCode": action
        }
        console.log("updateFav:" + body)
        const response = await axios.post(url, body)
        console.log(response)
        callback()
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getCollections = async ( plan ) => {
    try {
        const url = `http://localhost:3001/api/collections/plan/${plan}`
        const response = await axios.get(url)
        console.log("getCollections:" + JSON.stringify(response))
        return response.data
    } catch (error) {   
        console.log(error)
        throw error
    }
}

export const Home = () => {

    const [loadingFavs, setLoadingFavs] = useState(false)
    const [loadingCollections, setLoadingCollections] = useState(false)

    const { user } = useContext(UserContext);

    const [isOpenModalFavs, openModalFavs, closeModalFavs] = useModal(false)

    const [favList, setFavList] = useState([])

    const [collections, setCollections] = useState([])

    useEffect(() => {
        setLoadingCollections(true)
        setFavList(user.favList)
        const fetchCollections = async () => {
            try {
                const colls = await getCollections(user.plan)
                setCollections(colls)
                setLoadingCollections(false)
            }
            catch (error) {
                console.log("Error al obtener collections")
            }
        }
        fetchCollections()
    }, [])

    const handleUnfav = async (sampleId) => {
        setLoadingFavs(true)
        await updateFav(user.id, sampleId, 'UNFAV', async () => {
            const updatedFavs = await getFavList(user.id)
            setFavList(updatedFavs)
            setLoadingFavs(false)
        })
    }

    const handleFavCollection = async (collectionId) => {
        setLoadingFavs(true)

        const collection = collections.find(collection => collection.id === collectionId)

        for (const sample of collection.sampleList) {
            await updateFav(user.id, sample.id, 'FAV', () => {
                return
            })
        }

        const updatedFavs = await getFavList(user.id)
        setFavList(updatedFavs)
        setLoadingFavs(false)
    }

    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#262529'
        }}>
            <Header
                textPrimaryButton={`Hola ${user.usrName}`}
                textSecondaryButton={'Cerrar sesión'}
                route1={routes.home}
                route2={routes.login}
            />
            <div className={'home-container'}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                    <h3 className='libs-title'>Últimas librerias</h3>
                    {loadingCollections ?
                        <div className='loading-collections'>
                            <LottieAnimation width={200} height={200} />
                        </div> : null
                    }
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        {
                            collections.map(({ id, collectionName }) => (
                                <LibCard
                                    key={id}
                                    id={id}
                                    name={collectionName}
                                    onFavCollection={() => handleFavCollection(id)}
                                />
                            ))
                        }
                        {
                            collections.length > 3 ? 
                            <div className='lib-card' style={{
                                padding: '11px 16px 11px 16px',
                                gap: '5px',
                                height: 'fit-content'
                            }}>
                                <img src={seeMoreIcon} />
                                <span style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: '16px'
                                }}>
                                    Ver más
                                </span>
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className='favs-card'>
                        {loadingFavs ?
                            <div className='loading-favs'>
                                <LottieAnimation width={200} height={200} />
                            </div> : <div> </div>

                        }
                        <div style={{padding: "6px 20px 6px 20px"}}>
                            <h3 className='favs-title'>Mis favoritos</h3>
                            <div style={{
                                display: 'flex',
                                margin: '7px 0px 9px 0px'
                            }}>
                                <span className='fav-item'>Nombre de muestra</span>
                                <span className='fav-item'>Pack origen</span>
                            </div>
                            {
                                favList.map(({ id, sampleName, collectionCode }) => (
                                    <FavItem
                                        key={id}
                                        id={id}
                                        name={sampleName}
                                        pack={collectionCode}
                                        onUnfav={() => handleUnfav(id)}
                                    />
                                ))
                            }
                        </div>
                </div>
            </div>
        </div>
    )
}