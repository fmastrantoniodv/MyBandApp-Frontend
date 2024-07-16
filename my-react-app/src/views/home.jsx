import React, { useContext, useEffect, useState } from 'react'
import unFavButtonIcon from '../img/unFavButtonIcon.svg'
import favButtonIcon from '../img/favButtonIcon.svg'
import seeMoreIcon from '../img/seeMoreIcon.svg'
import playIcon from '../img/playIcon.svg'
import projectImg from '../img/projectImg.svg'
import { Header, FormButton, FormInput, InputDropdown } from '../components/Register/Form'
import { routes, inputsNewProject } from '../const/constants'
import { UserContext } from '../contexts/UserContext';
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import LottieAnimation from '../components/Register/LoadingAnimation'

export const CollectionCard = ({ id, name, img, onFavCollection }) => {
    return (
        <div id={id} className='collection-card'>
            <div style={{
                height: '180px',
                width: '180px',
                backgroundColor: '#00FF00'
            }} />
            <span className='collection-name'>{name}</span>
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

export const ProjectCard = ({ id, name, savedDate }) => {

    const fecha = new Date(savedDate);

    // Obtener partes de la fecha   
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const anio = fecha.getFullYear().toString().padStart(4, '0');
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    // Formatear la fecha según el requerimiento
    const fechaFormateada = `${dia}-${mes}-${anio} ${hora}:${minutos}:${segundos}`;

    return (
        <div key={id} className='project-card'>
            <img style={{width: '81px', height: '85px'}} src={projectImg}/>
            <span className='project-name'>{name}</span>
            <span className='project-last-change'>Último cambio: {fechaFormateada}</span>
        </div>
    )
}

export const FavItem = ({ id, name, pack, onUnfav }) => {
    return (
        <div id={id} className='fav-item-container'>
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
        console.log("favlist:" + JSON.stringify(response.data))
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

export const getCollections = async (plan) => {
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

export const getProjects = async (userId) => {
    try {
        const url = `http://localhost:3001/api/project/getUserProjects/${userId}`
        const response = await axios.get(url)
        console.log("getProjects:" + JSON.stringify(response))
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
        console.log(response)
        return response
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
    const [favList, setFavList] = useState([])

    const navigate = useNavigate()

    const { user } = useContext(UserContext);

    const [isOpenModalNewProject, openModalNewProject, closeModalNewProject] = useModal(false)

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

    useEffect(() => {
        setLoadingCollections(true)
        setLoadingProjects(true)

        setFavList(user.favList)

        const fetchData = async () => {
            try {
                const colls = await getCollections(user.plan)
                setCollections(colls)
                setLoadingCollections(false)
            }
            catch (error) {
                console.log("Error al obtener collections")
            }

            try {
                const userProjects = await getProjects(user.id)
                setProjects(userProjects)
                setLoadingProjects(false)
            }
            catch (error) {
                console.log("Error al obtener projects, error: " + error)
            }
        }

        fetchData()
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

    const handleOpenModalNewProject = () => {
        openModalNewProject()
    }

    const handleNewProjectSubmit = async (data) => {
        
        try {
            const resp = await createNewProject(user.id, data.projectName);
            if (resp.status === 200) {
                console.log('Proyecto creado con exito, resp: ' + JSON.stringify(resp.data))
                closeModalNewProject()
                reset()
                navigate(routes.studio)
            } else {
                console.log('http status not ok')
            }
        } catch (error) {
            console.error('Error: ', error)
        }
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
                <div style={{
                    display: 'flex',
                    'gap': '50px',
                    'width': '60%',
                    'flex-direction': 'column'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <h3 className='collections-title'>Últimas librerias</h3>
                        {loadingCollections ?
                            <div className='loading-collections'>
                                <LottieAnimation width={200} height={200} />
                            </div> : null
                        }
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {
                                collections.map(({ id, collectionName }) => (
                                    <CollectionCard
                                        key={id}
                                        id={id}
                                        name={collectionName}
                                        onFavCollection={() => handleFavCollection(id)}
                                    />
                                ))
                            }
                            {
                                collections.length > 3 ?
                                    <div className='collection-card' style={{
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
                    <div>
                        <div className='projects-background'>
                            {loadingProjects ?
                                <div className='loading-collections'>
                                    <LottieAnimation width={200} height={200} />
                                </div> :
                                null
                            }
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '296px' }}>
                            <h3 style={{ marginTop: '15px', zIndex: '10' }} className='favs-title'>Mis proyectos</h3>
                            <div className='projects-container'>
                                {loadingProjects ?
                                    null :
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
                                                id={id}
                                                name={projectName}
                                                savedDate={savedDate}
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
                        <form style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }} onSubmit={handleSubmit(handleNewProjectSubmit)}>
                            <div>
                                <h3 className='favs-title'>Crear proyecto</h3>
                            </div>
                            <div style={{
                                gap: '54px', display: 'flex',
                                flexDirection: 'column',
                                margin: '0px 101px',
                                maxWidth: '664px',
                                minWidth: '354px'
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
                                    <FormButton style={{ maxWidth: '222px', minWidth: '150px' }} text='Cancelar' type='secondary' action={() => closeModalNewProject()} />
                                    <FormButton style={{ maxWidth: '222px', minWidth: '150px' }} text='Crear proyecto' type='primary' />
                                </div>
                            </div>
                        </form>
                    </Modal>
                }
                <div className='favs-card'>
                    {loadingFavs ?
                        <div className='loading-favs'>
                            <LottieAnimation width={200} height={200} />
                        </div> : <div> </div>

                    }
                    <div style={{ padding: "6px 20px 6px 20px" }}>
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