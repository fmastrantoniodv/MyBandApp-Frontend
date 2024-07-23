import React, { useEffect, useState } from 'react'
import unFavButtonIcon from '../img/unFavButtonIcon.svg'
import favButtonIcon from '../img/favButtonIcon.svg'
import seeMoreIcon from '../img/seeMoreIcon.svg'
import playIcon from '../img/playIcon.svg'
import deleteIcon from '../img/deleteIcon.svg'
import projectImg from '../img/projectImg.svg'
import openIcon from '../img/openIcon.svg'
import settingsIcon from '../img/settingsIcon.svg'
import { routes, inputsNewProject } from '../const/constants'
import { Header, FormButton, FormInput, InputDropdown } from '../components/Register/Form'
import { useUser } from '../contexts/UserContext';
import { useModal } from "../hooks/useModal";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Modal from "../components/Modals/Modal"
import LottieAnimation from '../components/Register/LoadingAnimation'
import axios from 'axios'

export const CollectionCard = ({ collectionItem, onFavCollection }) => {

    const { collectionName, collectionCode } = collectionItem

    return (
        <div className='collection-card'>
            <img style={{ height: '180px', width: '180px', backgroundColor: '#00FF00' }} src={`http://localhost:3001/api/collections/src/${collectionCode}`} alt={`imagen de libreria ${collectionName}`} />
            <span className='collection-name'>{collectionName}</span>
            <div className='collection-btn-container'>
                <div className='collection-button'>
                    <img className='fav-play-icon' src={playIcon} />
                    Escuchar muestra
                </div>
                <div className='collection-button' onClick={onFavCollection}>
                    <img className='fav-play-icon' src={favButtonIcon} />
                    Marcar Favorito
                </div>
            </div>
        </div>
    )
}

export const ProjectCard = ({ name, savedDate, onDelete, onOpen }) => {

    const fecha = new Date(savedDate);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString().padStart(4, '0');
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${dia}-${mes}-${anio} ${hora}:${minutos}:${segundos}`;

    return (
        <div className='project-card'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img style={{ width: '81px', height: '85px' }} src={projectImg} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className='project-btn delete' style={{ backgroundImage: `url(${deleteIcon})` }} onClick={onDelete} />
                    <button className='project-btn open' style={{ backgroundImage: `url(${openIcon})` }} onClick={onOpen} />
                </div>
            </div>
            <span className='project-name'>{name}</span>
            <span className='project-last-change'>Último cambio: {fechaFormateada}</span>
        </div>
    )
}

export const FavItem = ({ name, pack, onUnfav }) => {
    return (
        <div className='fav-item-container'>
            <span className='fav-item'>{name}</span>
            <span className='fav-item'>{pack}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
                <img className='fav-play-icon' src={playIcon} />
                <img className='fav-play-icon' src={unFavButtonIcon} onClick={onUnfav} />
            </div>
        </div>
    )
}

export const getFavList = async (userId) => {
    try {
        const url = `http://localhost:3001/api/users/getUserFavsList/${userId}`
        const response = await axios.get(url)
        console.log("getFavList: ", response.data)
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
        const response = await axios.post(url, body)
        callback()
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getCollections = async (plan) => {
    try {
        const url = `http://localhost:3001/api/collections/plan/${plan}`
        const response = await axios.get(url)
        console.log("getCollections: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProjects = async (userId) => {
    try {
        const url = `http://localhost:3001/api/project/getUserProjects/${userId}`
        const response = await axios.get(url)
        console.log("getProjects: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createNewProject = async (userId, projectName) => {
    try {
        const url = 'http://localhost:3001/api/project/create'
        const body = {
            "userId": userId,
            "projectName": projectName
        };
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteProject = async (userId, projectId) => {
    try {
        const url = 'http://localhost:3001/api/project/delete'
        const body = {
            "userId": userId,
            "projectId": projectId
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProject = async (projectId) => {
    try {
        const url = `http://localhost:3001/api/project/${projectId}`
        const response = await axios.get(url)
        console.log("getProject: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const Home = () => {

    const [loadingFavs, setLoadingFavs] = useState(false)
    const [loadingCollections, setLoadingCollections] = useState(false)
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [collections, setCollections] = useState([])
    const [projects, setProjects] = useState([])

    const navigate = useNavigate()

    const { user, setUser, clearUser } = useUser()

    const [isOpenModalNewProject, openModalNewProject, closeModalNewProject] = useModal(false)

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

    useEffect(() => {
        setLoadingCollections(true)
        setLoadingProjects(true)

        const fetchData = async () => {
            try {
                const colls = await getCollections(user.plan)
                setCollections(colls)
            }
            catch (error) {
                console.log("Error al obtener collections")
            }
            setLoadingCollections(false)

            try {
                const userProjects = await getProjects(user.id)
                setProjects(userProjects)
            }
            catch (error) {
                console.log("Error al obtener projects, error: " + error)
            }
            setLoadingProjects(false)
        }

        fetchData()
    }, [])

    const handleUnfav = async (sampleId) => {
        setLoadingFavs(true)
        await updateFav(user.id, sampleId, 'UNFAV', async () => {
            const updatedFavs = await getFavList(user.id)
            setUser({ ...user, favList: updatedFavs })
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

        const updatedFavs = await getFavList(user.id)
        setUser({ ...user, favList: updatedFavs })
        setLoadingFavs(false)
    }

    const handleOpenModalNewProject = () => {
        openModalNewProject()
    }

    const handleNewProjectSubmit = async (data) => {
        try {
            const resp = await createNewProject(user.id, data.projectName)
            console.log('Proyecto creado con exito: ', resp.data)
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

        const updatedProjects = await getProjects(user.id)
        setProjects(updatedProjects)
        setLoadingProjects(false)
    }

    const handleOpenProject = async (projectId) => {
        try {
            await getProject(projectId)
        } catch (error) {
            console.error('Error handleDeleteProject: ', error)
        }

        navigate(routes.studio)
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
            <Header
                textPrimaryButton={`Hola ${user.usrName}`}
                textSecondaryButton={'Cerrar sesión'}
                action1={() => navigate(routes.home)}
                action2={handleLogout}
            >
                <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
            </Header>
            <div className={'home-container'}>
                <div style={{
                    display: 'flex',
                    gap: '50px',
                    width: '60%',
                    flexDirection: 'column'
                }}>
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
                                    <CollectionCard
                                        key={collection.id}
                                        collectionItem={collection}
                                        onFavCollection={() => handleFavCollection(collection)}
                                    />
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
                            <h3 style={{ marginTop: '15px', zIndex: '10' }} className='favs-title'>Mis proyectos</h3>
                            <div className='projects-container'>
                                {!loadingProjects &&
                                    (<>
                                        <div className='new-project-btn' onClick={() => handleOpenModalNewProject()}>
                                            <img src={seeMoreIcon} />
                                            <span style={{
                                                fontFamily: 'Inter-Regular',
                                                fontSize: '16px'
                                            }}>
                                                Nuevo
                                            </span>
                                        </div>

                                        {projects.map(({ id, projectName, savedDate }) => (
                                            <ProjectCard
                                                key={id}
                                                name={projectName}
                                                savedDate={savedDate}
                                                onDelete={() => handleDeleteProject(id)}
                                                onOpen={() => handleOpenProject(id)}
                                            />
                                        ))}
                                    </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {
                    <Modal isOpen={isOpenModalNewProject} closeModal={closeModalNewProject}>
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit(handleNewProjectSubmit)}>
                            <h3 className='favs-title' style={{ marginTop: '14px' }}>Crear proyecto</h3>
                            <div style={{
                                gap: '54px', display: 'flex',
                                flexDirection: 'column',
                                margin: '30px 28px 30px'
                            }}>
                                <div style={{ gap: '18px', display: 'flex', flexDirection: 'column' }}>
                                    {
                                        inputsNewProject.map(({ title, options, name, type, required, validate }) => (
                                            type === 'dropdown' ? (
                                                <InputDropdown
                                                    title={title}
                                                    name={name}
                                                    options={options}
                                                    register={register}
                                                />
                                            ) : <FormInput
                                                title={title}
                                                name={name}
                                                type={type}
                                                register={register}
                                                errors={errors}
                                                required={required}
                                                validate={validate}
                                                watch={watch}
                                            />
                                        ))
                                    }
                                </div>
                                <div style={{ gap: '18px', display: 'flex' }}>
                                    <FormButton text='Cancelar' type='secondary' action={() => closeModalNewProject()} />
                                    <FormButton text='Crear proyecto' type='primary' />
                                </div>
                            </div>
                        </form>
                    </Modal>
                }
                <div className='favs-card'>
                    {loadingFavs &&
                        (<div className='loading-favs'>
                            <LottieAnimation width={200} height={200} />
                        </div>)
                    }
                    <div style={{ padding: "6px 20px 6px 20px" }}>
                        <h3 className='favs-title'>Mis favoritos</h3>
                        <div style={{ display: 'flex', margin: '7px 0px 9px 0px' }}>
                            <span className='fav-item'>Nombre de muestra</span>
                            <span className='fav-item'>Pack origen</span>
                        </div>
                        {
                            user.favList.map(({ id, sampleName, collectionCode }) => (
                                <FavItem
                                    key={id}
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