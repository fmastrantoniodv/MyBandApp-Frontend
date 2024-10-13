import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import settingsIcon from '../img/settingsIcon.svg'
import { ButtonText } from '../components/Register/Form'
import { Collection } from '../components/Collections/Collection'
import { routes } from '../const/constants'
import { useUser } from '../contexts/UserContext'
import { getCollections } from '../services/collectionsServ'
import { Header } from '../components/Header/Header'

const Collections = () => {
    const [collections, setCollections] = useState([])
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
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
    }, [searchParams])

    const handleLogout = () => {
        clearUser()
        navigate(routes.login)
    }

    return (
        <div className='collections-container'>
            <Header type='home' textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={handleLogout}>
                <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
            </Header>
            <div className='collections-view-container'>
                <div className='collections-card'>
                    <div className='collections-card-header'>
                        <h3 className='favs-title'>Librerías</h3>
                        <ButtonText type={'secondary'} text='Volver a la home' action={() => navigate(routes.home)} />
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