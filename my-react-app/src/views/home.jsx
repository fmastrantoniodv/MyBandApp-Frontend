import React, { useEffect, useState } from 'react'
import { CollectionCard } from '../components/Home/CollectionCard'
import { ProjectCard } from '../components/Home/ProjectCard'
import { FavItem } from '../components/Home/FavItem'
import { Header, FormButton, FormInput, InputDropdown } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import seeMoreIcon from '../img/seeMoreIcon.svg'
import { routes } from '../const/constants'
import { setTemplates } from '../functions/functions'
import { useUser } from '../contexts/UserContext';
import { useModal } from "../hooks/useModal";
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { deleteProject, getProjects, getProjectServ } from '../services/projectsServ'
import { getCollections } from '../services/collectionsServ'
import { updateFav, getUserFavsServ } from '../services/usersServ'
const envCode = process.env.REACT_APP_ENV_CODE;

export const Home = () => {
    const [loadingFavs, setLoadingFavs] = useState(false)
    const [loadingCollections, setLoadingCollections] = useState(false)
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [collections, setCollections] = useState([])
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const { user, setUser, clearUser, setProjectInfo, clearProject } = useUser()

    const [isOpenModalNewProject, openModalNewProject, closeModalNewProject] = useModal(false)

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

    useEffect(() => {
        console.log('[home.jsx].useEffect')
        setLoadingCollections(true)

        const fetchData = async () => {
            try {
                const colls = await getCollections(user.plan)
                if(envCode !== 'DEV'){
                    setCollections(colls.filter(value => value.collectionCode !== 'test'))
                }else{
                    setCollections(colls)
                }
            }
            catch (error) {
                console.log("Error al obtener collections")
            }
            setLoadingCollections(false)
        }

        fetchData()
        refreshUserProjects()
    }, [searchParams])

    const handleUnfav = async (sampleId) => {
        setLoadingFavs(true)
        await updateFav(user.id, sampleId, 'UNFAV', async () => {
            const updatedFavs = await getUserFavsServ(user.id)
            setUser({ ...user, favList: updatedFavs.data })
            setLoadingFavs(false)
        })
    }

    const handleFavCollection = async (collectionItem) => {
        setLoadingFavs(true)

        const { sampleList } = collectionItem

        for (const sample of sampleList) {
            await updateFav(user.id, sample.id, 'FAV', () => {
                return
            })
        }

        const updatedFavs = await getUserFavsServ(user.id)
        setUser({ ...user, favList: updatedFavs.data })
        setLoadingFavs(false)
    }

    const handleOpenModalNewProject = () => {
        openModalNewProject()
    }

    const handleNewProjectSubmit = async (data) => {
        console.log('handleNewProjectSubmit.data',data)
        try {
            const resp = await getProjectServ(data.template)
            console.log('getProject: ', resp)
            setProjectInfo({
                projectId: null,
                userId: user.id,
                projectName: data.projectName,
                template: data.template,
                tempo: resp.tempo,
                channelList: resp.channelList
            })
            closeModalNewProject()
            reset()
            navigate(routes.studio)
        } catch (error) {
            console.error('Error handleNewProjectSubmit: ', error)
        }
    }

    const refreshUserProjects = async () => {
        const updatedProjects = await getProjects(user.id)
        setUser({ ...user, projectList: updatedProjects })
    }

    const handleDeleteProject = async (projectId) => {
        setLoadingProjects(true)

        try {
            await deleteProject(user.id, projectId)
        } catch (error) {
            console.error('Error handleDeleteProject: ', error)
        }

        await refreshUserProjects()
        setLoadingProjects(false)
    }

    const handleOpenProject = async (projectId) => {
        try {
            //const resp = await getProject(projectId)
            setProjectInfo({
                projectId: projectId,
                userId: user.id,
                projectName: 'default',
                template: 'blank'
            })
            navigate(routes.studio)
        } catch (error) {
            console.error('Error handleDeleteProject: ', error)
        }

    }

    const handleLogout = () => {
        clearUser()
        clearProject()
        navigate(routes.login)
    }

    return (

        <div className='collections-view-container'>
            <Modal isOpen={isOpenModalNewProject} closeModal={closeModalNewProject}>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 50px', gap: '25px' }} onSubmit={handleSubmit(handleNewProjectSubmit)}>
                    <h3 className='favs-title'>Crear proyecto</h3>
                    <div style={{ gap: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <FormInput key='projectName' title='Nombre del proyecto' name='projectName' type='text' register={register} errors={errors} required={{ value: true, message: 'Por favor ingrese un nombre para el proyecto' }} watch={watch} />
                        <InputDropdown key='template' title='Template' name='template' options={setTemplates(collections)} register={register} />
                    </div>
                    <div style={{ gap: '18px', display: 'flex' }}>
                        <FormButton text='Cancelar' type='secondary' action={() => closeModalNewProject()} />
                        <FormButton text='Crear proyecto' type='primary' />
                    </div>
                </form>
            </Modal>
            <Header type='home' textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={handleLogout}/>
            <div className={'home-container'}>
                <section className='home-left-section-container'>
                    <div className='collections-section'>
                        <div className='collections-section-header'>
                            <h3 className='collections-title'>Últimas librerias</h3>
                            <button className='seemore-btn' onClick={() => navigate(routes.collections)}>Ver más</button>
                        </div>
                        {loadingCollections &&
                            (<div className='loading-collections'>
                                <LottieAnimation width={200} height={200} />
                            </div>)
                        }
                        <div className='collection-cards-container'>
                            {
                                collections.map((collection) => (
                                    <CollectionCard key={collection.id} collectionItem={collection} onFavCollection={() => handleFavCollection(collection)} />
                                ))
                            }

                        </div>
                    </div>
                    <div className='projects-section'>
                        <h3 className='projects-title'>Mis proyectos</h3>
                        {loadingProjects ?
                            (<div className='loading-collections'>
                                <LottieAnimation width={200} height={200} />
                            </div>) :
                            (<div className='projects-container'>
                                <div className='new-project-btn' onClick={() => handleOpenModalNewProject()}>
                                    <img src={seeMoreIcon} />
                                    <span>Nuevo</span>
                                </div>
                                {user.projectList.map(({ id, projectName, savedDate }) => (
                                    <ProjectCard key={id} name={projectName} savedDate={savedDate} onDelete={() => handleDeleteProject(id)} onOpen={() => handleOpenProject(id)} />
                                ))}
                            </div>)
                        }
                    </div>
                </section>
                <section className='home-right-section-container'>
                    <div className='favs-card'>
                        {loadingFavs &&
                            (<div className='loading-favs'>
                                <LottieAnimation width={200} height={200} />
                            </div>)
                        }
                        <h3 className='favs-title'>Mis favoritos</h3>
                        { user.favList.length < 1 ?
                            <span>Aun no agregaste favoritos</span> :
                            <div style={{ display: 'flex', margin: '7px 0px 9px 0px' }}>
                                <span className='fav-item'>Nombre de muestra</span>
                                <span className='fav-item'>Pack origen</span>
                            </div>
                        }
                        {
                            user.favList.map((fav) => (
                                <FavItem key={fav.id} favInfo={fav} onUnfav={() => handleUnfav(fav.id)} />
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}