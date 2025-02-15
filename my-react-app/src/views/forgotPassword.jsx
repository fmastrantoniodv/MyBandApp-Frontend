import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { inputsForgotPass } from '../const/constants'
import { useModal } from "../hooks/useModal"
import { Header } from '../components/Header/Header'
import { sendVerifyCode } from '../services/usersServ'
import { routes } from '../const/constants'
import { useUser } from '../contexts/UserContext'

export const ForgotPassword = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useUser()

    const handleSubmit = async (e) => {
      openModal()
      const resSendCode = await sendVerifyCode(e.email)
      if(resSendCode.errorCode === 'USR_NOT_FOUND'){
        setError(true)
      }else{
        setUser({email: e.email})
        closeModal()
        navigate(routes.validateOtc)
      }
    };

    return (
        <div className='register-container'>
            <Header />
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
                            <b>Email inválido</b>
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
