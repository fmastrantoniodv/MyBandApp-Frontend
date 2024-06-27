import React, { useContext } from 'react'
import unFavButtonIcon from '../img/unFavButtonIcon.svg'
import seeMoreIcon from '../img/seeMoreIcon.svg'
import playIcon from '../img/playIcon.svg'
import { Header } from '../components/Register/Form'
import { routes } from '../const/constants'
import { UserContext } from '../contexts/UserContext';

export const LibCard = ({ name, img }) => {
    return (
        <div className='libs-card'>

        </div>
    )
}

export const FavItem = ({ name, pack }) => {
    return (
        <div className='fav-item-container'>
            <span className='fav-item'>{name}</span>
            <span className='fav-item'>{pack}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-item-icon' src={playIcon} />
                <img className='fav-item-icon' src={unFavButtonIcon} />
            </div>
        </div>
    )
}

export const Home = () => {

    const { user } = useContext(UserContext);

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
                    <FavItem name='salsa-timbal' pack='salsa pack' />
                    <FavItem name='salsa-maraca' pack='salsa pack' />
                    <FavItem name='salsa-bongo' pack='salsa pack' />
                    <FavItem name='jazz-bombo' pack='jazz pack' />
                    <FavItem name='jazz-saxo' pack='jazz pack' />
                </div>
            </div>
        </div>
    )
}