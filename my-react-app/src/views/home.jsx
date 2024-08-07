import React, { useEffect, useState } from 'react'
import { CollectionCard } from '../components/Home/CollectionCard'
import { ProjectCard } from '../components/Home/ProjectCard'
import { FavItem } from '../components/Home/FavItem'
import { Header, FormButton, FormInput, InputDropdown } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import seeMoreIcon from '../img/seeMoreIcon.svg'
import settingsIcon from '../img/settingsIcon.svg'
import { routes } from '../const/constants'
import { setTemplates } from '../functions/functions'
import { useUser } from '../contexts/UserContext';
import { useModal } from "../hooks/useModal";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { deleteProject } from '../services/projects/deleteProject'
import { getProjects } from '../services/projects/getProjects'
import { getProjectServ } from '../services/projects/getProjectServ'
import { createNewProject } from '../services/projects/createNewProject'
import { getCollections } from '../services/collections/getCollections'
import { updateFav } from '../services/users/updateFav'
import { getUserFavsServ } from '../services/users/getUserFavsServ'

export const Home = () => {

    const [loadingFavs, setLoadingFavs] = useState(false)
    const [loadingCollections, setLoadingCollections] = useState(false)
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [collections, setCollections] = useState([])
    const [projects, setProjects] = useState([])

    const navigate = useNavigate()

    const { user, setUser, clearUser, setProjectInfo } = useUser()

    const [isOpenModalNewProject, openModalNewProject, closeModalNewProject] = useModal(false)

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

    useEffect(() => {
        setProjects(user.projectList)

        setLoadingCollections(true)

        const fetchData = async () => {
            try {
                const colls = await getCollections(user.plan)
                setCollections(colls)
            }
            catch (error) {
                console.log("Error al obtener collections")
            }
            setLoadingCollections(false)
        }

        fetchData()
    }, [])

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
        try {
            const resp = await createNewProject(user.id, data.projectName)
            setProjectInfo({
                projectId: null,
                userId: user.id,
                projectName: resp.projectName,
                template: data.template
            })
            closeModalNewProject()
            reset()
            navigate(routes.studio)
        } catch (error) {
            console.error('Error handleNewProjectSubmit: ', error)
        }

    }
    const handleDeleteProject = async (projectId) => {
        setLoadingProjects(true)

        try {
            await deleteProject(user.id, projectId)
        } catch (error) {
            console.error('Error handleDeleteProject: ', error)
        }

        const updatedProjects = await getProjects(user.id)  //TODO
        setProjects(updatedProjects) //TODO
        setLoadingProjects(false)
    }

    const handleOpenProject = async (projectId) => {
        try {
            //const resp = await getProject(projectId)
            setProjectInfo({
                projectId: projectId,
                userId: user.id,
                projectName: 'elproject',
                template: 'blank'
            })
            navigate(routes.studio)
        } catch (error) {
            console.error('Error handleDeleteProject: ', error)
        }

    }

    const handleLogout = () => {
        clearUser()
        navigate(routes.login)
    }

    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#262529'
        }}>
            <Header textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={handleLogout}>
                <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
            </Header>
            <div className={'home-container'}>
                <div className='home-left-section-container'>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <h3 className='collections-title'>Últimas librerias</h3>
                        {loadingCollections &&
                            (<div className='loading-collections'>
                                <LottieAnimation width={200} height={200} />
                            </div>)
                        }
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {
                                collections.map((collection) => (
                                    <CollectionCard key={collection.id} collectionItem={collection} onFavCollection={() => handleFavCollection(collection)}/>
                                ))
                            }
                            <div className='seemore-btn' onClick={() => navigate(routes.collections)}>
                                <img src={seeMoreIcon} />
                                <span style={{ fontFamily: 'Inter-Regular', fontSize: '16px' }}>Ver más</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='projects-background'>
                            {loadingProjects &&
                                (<div className='loading-collections'>
                                    <LottieAnimation width={200} height={200} />
                                </div>)
                            }
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '296px' }}>
                            <h3 className='projects-title'>Mis proyectos</h3>
                            <div className='projects-container'>
                                {!loadingProjects &&
                                    (<>
                                        <div className='new-project-btn' onClick={() => handleOpenModalNewProject()}>
                                            <img src={seeMoreIcon} />
                                            <span>Nuevo</span>
                                        </div>
                                        {projects.map(({ id, projectName, savedDate }) => (
                                            <ProjectCard key={id} name={projectName} savedDate={savedDate} onDelete={() => handleDeleteProject(id)} onOpen={() => handleOpenProject(id)}/>
                                        ))}
                                    </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isOpenModalNewProject} closeModal={closeModalNewProject}>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 50px', gap: '25px'}} onSubmit={handleSubmit(handleNewProjectSubmit)}>
                        <h3 className='favs-title'>Crear proyecto</h3>
                        <div style={{ gap: '18px', display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <FormInput key='projectName' title='Nombre del proyecto' name='projectName' type='text' register={register}  errors={errors} required={{value: true, message: 'Por favor ingrese un nombre para el proyecto'}} watch={watch}/>
                            <InputDropdown key='template' title='Template' name='template' options={setTemplates(collections)} register={register}/>
                        </div>
                        <div style={{ gap: '18px', display: 'flex'}}>
                            <FormButton text='Cancelar' type='secondary' action={() => closeModalNewProject()} />
                            <FormButton text='Crear proyecto' type='primary' />
                        </div>
                    </form>
                </Modal>
                <div className='favs-card'>
                    {loadingFavs &&
                        (<div className='loading-favs'>
                            <LottieAnimation width={200} height={200} />
                        </div>)
                    }
                    <div style={{ padding: '6px 20px' }}>
                        <h3 className='favs-title'>Mis favoritos</h3>
                        <div style={{ display: 'flex', margin: '7px 0px 9px 0px' }}>
                            <span className='fav-item'>Nombre de muestra</span>
                            <span className='fav-item'>Pack origen</span>
                        </div>
                        {
                            user.favList.map(({ id, sampleName, collectionCode }) => (
                                <FavItem key={id} name={sampleName} pack={collectionCode} onUnfav={() => handleUnfav(id)}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}