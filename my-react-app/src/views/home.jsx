import React from 'react'
import { FavsList } from '../components/Home/FavsList'
import { routes } from '../const/constants'
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { CollectionsCard } from '../components/Collections/CollectionsCard'
import { ProjectsCard } from '../components/Home/ProjectsCard';

export const Home = () => {    
    const { user } = useUser()
    const navigate = useNavigate()
    return (
        <div className='collections-view-container'>
            <Header type='home' textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={'logout'}/>
            <div className={'home-container'}>
                <section className='home-left-section-container'>
                    <CollectionsCard />
                    <ProjectsCard />
                </section>
                <section className='home-right-section-container'>
                    <FavsList />
                </section>
            </div>
        </div>
    )
}
