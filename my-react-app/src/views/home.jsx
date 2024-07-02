import React, { useContext, useEffect, useState } from 'react'
import unFavButtonIcon from '../img/unFavButtonIcon.svg'
import seeMoreIcon from '../img/seeMoreIcon.svg'
import playIcon from '../img/playIcon.svg'
import { Header } from '../components/Register/Form'
import { routes } from '../const/constants'
import { UserContext } from '../contexts/UserContext';
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal"
import axios from 'axios'

export const LibCard = ({ name, img }) => {
    return (
        <div className='libs-card'>

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
                <img className='fav-item-icon' src={unFavButtonIcon} onClick={onUnfav}/>
            </div>
        </div>
    )
}

export const getFavList = async (userId) => {
    try {
        const url = `http://localhost:3001/api/users/getUserFavsList/${userId}`
        const response = await axios.get(url)
        console.log("favlist:"+ JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateFav = async (userId, sampleId, action, callback) => {
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

export const Home = () => {

    const { user } = useContext(UserContext);

    const [isOpenModalFavs, openModalFavs, closeModalFavs] = useModal(false)

    const [favList, setFavList] = useState([])

    useEffect(() => {
        const fetchFavList = async () => {
            try {
                const favs = await getFavList(user.id);
                setFavList(favs)
            } catch (error) {
                console.error('Error fetchFavList:', error)
            }
        };

        fetchFavList();
    }, [])

    const handleUnfav = async (sampleId) => {
        await updateFav(user.id, sampleId, 'UNFAV', async () => {
            const updatedFavs = await getFavList(user.id)
            setFavList(updatedFavs)
        })
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className='libs-title'>Últimas librerias</h3>
                    <div style={{ display: 'flex' }}>
                        <div className='libs-card' style={{
                            padding: '11px 16px 11px 16px',
                            gap: '5px'
                        }}>
                            <img src={seeMoreIcon} />
                            <span style={{
                                fontFamily: 'Inter-Regular',
                                fontSize: '16px'
                            }}>
                                Ver más
                            </span>
                        </div>
                    </div>
                </div>
                <div className='favs-card'>
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
    )
}