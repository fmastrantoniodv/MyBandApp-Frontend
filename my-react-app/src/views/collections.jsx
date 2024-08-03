import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import settingsIcon from '../img/settingsIcon.svg'
import { Header, ButtonText } from '../components/Register/Form'
import { Collection } from '../components/Collections/Collection'
import { routes } from '../const/constants'
import { useUser } from '../contexts/UserContext'
import { getCollections } from '../services/collectionsServ'

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
            <Header textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={handleLogout}>
                <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
            </Header>
            <div className={'container'}>
                <div className='collections-card'>
                    <div className='collections-card-header'>
                        <h3 className='favs-title'>Librerías</h3>
                        <ButtonText type={'secondary'} text='Volver a la home' action={() => navigate(routes.home)} />
                    </div>
                    <div className='collections-header'>
                        <span style={{width: '170px'}}>Nombre de pack</span>
                        <span>Tags</span>
                    </div>
                    {
                        collections.map((collection) =>
                            <Collection key={collection.id} user={user} collectionItem={collection} setUser={setUser}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Collections