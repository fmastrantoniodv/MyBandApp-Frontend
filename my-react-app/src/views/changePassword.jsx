import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { routes, inputsChangePass } from '../const/constants'
import { useUser } from '../contexts/UserContext'
import { useModal } from "../hooks/useModal"
import { Header } from '../components/Header/Header'
import { changePassService } from '../services/usersServ'

export const ChangePassword = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)

    const { setUser, user } = useUser()

    const navigate = useNavigate()

    const handleChangePass = async (data) => {
        setError(false)
        openModal()
        console.log('handleChangePass.data=', data)
        if(data.firstPassword !== data.secondPassword){
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
            return
        }

        try {
            const resp = await changePassService(user.email, data.currentPassword, data.firstPassword)
            //setUser(resp)
            console.log(resp)
            closeModal()
            navigate(routes.home)
        } catch (error) {
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
        }
    }

    return (
        <div className='register-container'>
            <Header type='home' textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={'logout'}/>
            <div className={'container'}>
                <FormCard title={'Cambiar contraseña'} inputs={inputsChangePass} onSubmit={handleChangePass}>
                    <button className='forgot-pass-btn' onClick={() => navigate(routes.register)} type='button'>
                        Olvidé mi contraseña
                    </button>
                    <div className='btns-container login'>
                        <FormButton text={'Cambiar contraseña'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(routes.register)} />
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
