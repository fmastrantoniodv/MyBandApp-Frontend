import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { routes, inputsForgotPass } from '../const/constants'
import { useUser } from '../contexts/UserContext'
import { useModal } from "../hooks/useModal"
import { Header } from '../components/Header/Header'
import { sendVerifyCode } from '../services/usersServ'

export const ForgotPassword = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
      const resSendCode = await sendVerifyCode(e.email)
      console.log(`[forgotPassword.jsx].ForgotPassword.handleSubmit.resSendCode=`,resSendCode)
      console.log(`[forgotPassword.jsx].ForgotPassword.handleSubmit.resSendCode.data=`,resSendCode.response)
      /**
       * controlar el error para manejar el mensaje de que el mail no está registrado
       */
    };

    const { user } = useUser()

    const navigate = useNavigate()

    return (
        <div className='register-container'>
            <Header type='home' textPrimaryButton={`Hola ${user.usrName}`} textSecondaryButton={'Cerrar sesión'} action1={() => navigate(routes.home)} action2={'logout'}/>
            <div className={'container'}>
                <FormCard title={'Olvidé mi contraseña'} inputs={inputsForgotPass} onSubmit={handleSubmit}>
                    <div className='btns-container login'>
                        <FormButton text={'Enviar código'} type={'primary'} />
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
