import React, { useEffect, useState } from 'react'
import { FormButton, FormInput, InputDropdown } from '../Register/Form'
import LottieAnimation from '../Register/LoadingAnimation'
import Modal from "../Modals/Modal"
import { routes } from '../../const/constants'
import { useUser } from '../../contexts/UserContext';
import { useModal } from "../../hooks/useModal";
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { deleteProject, getProjects, getProjectServ } from '../../services/projectsServ'
import seeMoreIcon from '../../img/seeMoreIcon.svg'
import deleteIcon from '../../img/deleteIcon.svg'
import projectImg from '../../img/projectImg.svg'
import openIcon from '../../img/openIcon.svg'

export const ProjectsCard = () => {
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isOpenModalNewProject, openModalNewProject, closeModalNewProject] = useModal(false)
    const { user, setUser, availableTemplates, setTemplates, setProjectInfo } = useUser()
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

    useEffect(() => {
        console.log('[home.jsx].useEffect')
        refreshUserProjects()
        setTemplates()
    }, [searchParams])

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
    
    return (
        <>
            <Modal isOpen={isOpenModalNewProject} closeModal={closeModalNewProject}>
                <form className='form-card-new-project' onSubmit={handleSubmit(handleNewProjectSubmit)}>
                    <h3 className='favs-title'>Crear proyecto</h3>
                    <div style={{ gap: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <FormInput key='projectName' title='Nombre del proyecto' name='projectName' type='text' register={register} errors={errors} required={{ value: true, message: 'Por favor ingrese un nombre para el proyecto' }} watch={watch} />
                        <InputDropdown key='template' title='Template' name='template' options={availableTemplates} register={register} />
                    </div>
                    <div style={{ gap: '18px', display: 'flex' }}>
                        <FormButton text='Cancelar' type='secondary' action={() => closeModalNewProject()} />
                        <FormButton text='Crear proyecto' type='primary' />
                    </div>
                </form>
            </Modal>
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
        </>
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
                <img src={projectImg} className='project-img'/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className='project-btn delete' style={{ backgroundImage: `url(${deleteIcon})` }} onClick={onDelete} />
                    <button className='project-btn open' style={{ backgroundImage: `url(${openIcon})` }} onClick={onOpen} />
                </div>
            </div>
            <div className='project-description'>
                <span className='project-name'>{name}</span>
                <span className='project-last-change'>Último cambio: {fechaFormateada}</span>
            </div>
        </div>
    )
}