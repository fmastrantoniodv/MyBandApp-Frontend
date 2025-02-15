import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { inputValidateOtc } from '../const/constants'
import { useModal } from "../hooks/useModal"
import { Header } from '../components/Header/Header'
import { checkVerifyCode } from '../services/usersServ'
import { useUser } from '../contexts/UserContext'
import { routes } from '../const/constants'

export const ValidateOtc = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const { user } = useUser()

    const handleSubmit = async (e) => {
      openModal()
      const resSendCode = await checkVerifyCode(user.email, e.verify_code)
      if(resSendCode.errorCode === 'CODE_ERROR'){
        setError(true)
        setErrorMsg('El código ingresado es incorrecto')
      }else if(resSendCode.errorCode === 'VERIFY_CODE_EXPIRATED'){
        setError(true)
        setErrorMsg('El código ingresado está vencido, se debe generar uno nuevo.')
      }else{
        navigate(routes.changePass)
        closeModal()
    }
    };

    const navigate = useNavigate()

    return (
        <div className='register-container'>
            <Header />
            <div className={'container'}>
                <FormCard title={'Ingresar código de verificación'} inputs={inputValidateOtc} onSubmit={handleSubmit}>
                    <div className='btns-container login'>
                        <FormButton text={'Validar'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(-1)} />
                    </div>
                </FormCard>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    {error ? 
                        (<div className='modal-error'>
                            <b>Código inválido</b>
                            {errorMsg}
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
