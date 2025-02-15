import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { routes, inputsChangePass } from '../const/constants'
import { useUser } from '../contexts/UserContext'
import { useModal } from "../hooks/useModal"
import { Header } from '../components/Header/Header'
import { changePassService, updatePassService } from '../services/usersServ'

export const ChangePassword = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)
    const { user, sessionState } = useUser()
    const navigate = useNavigate()
    
    const handleChangePass = async (data) => {
        setError(false)
        openModal()
        if(data.firstPassword !== data.secondPassword){
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
            return
        }

        try {
            const resp = await changePassService(user.email, data.currentPassword, data.firstPassword)
            closeModal()
            navigate(routes.home)
        } catch (error) {
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
        }
    }

    const handleUpdatePass = async (data) => {
        setError(false)
        openModal()
        if(data.firstPassword !== data.secondPassword){
            console.error('Error handleUpdatePass: ', error)
            setError(true)
            return
        }

        try {
            const resp = await updatePassService(user.email, data.firstPassword)            
            closeModal()
            navigate(routes.login)
        } catch (error) {
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
        }
    }

    return (
        <div className='register-container'>
            <Header type={!user.id ? '' :'home'} textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={'logout'}/>
            <div className={'container'}>
                <FormCard 
                    title={'Cambiar contraseña'} 
                    inputs={!user.id? inputsChangePass.filter(item => item.name !== 'currentPassword') : inputsChangePass} 
                    onSubmit={!user.id? handleUpdatePass : handleChangePass}
                >
                    {
                        user.id ? 
                        <button className='forgot-pass-btn' onClick={() => navigate(routes.forgotPass)} type='button'>
                            Olvidé mi contraseña
                        </button>
                        :
                        null
                    }
                    
                    <div className='btns-container login'>
                        <FormButton text={'Cambiar contraseña'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(-1)} />
                    </div>
                </FormCard>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    {error ? 
                        (<div className='modal-error'>
                            <b>No se pudo cambiar la contraseña</b>
                            Verificar los datos ingresados y volver a intentar
                            <FormButton text={'Volver'} type={'secondary'} action={() => closeModal()}/>
                        </div>) : 
                        (<div className='loading'>
                            <LottieAnimation width={200} height={200} />
                            Cargando...
                        </div>)
                    }
                </Modal>
            </div>
        </div>
    )
}
