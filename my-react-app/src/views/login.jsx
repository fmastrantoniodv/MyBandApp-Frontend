import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { routes, inputsLogin } from '../const/constants'
import { useUser, clearUser } from '../contexts/UserContext'
import { useModal } from "../hooks/useModal"
import { login } from '../services/usersServ'
import { Header } from '../components/Header/Header'

const Login = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)
    const { setUser, clearUser, setCollecToCxt } = useUser()
    const navigate = useNavigate()

    useEffect(()=>{
        clearUser()
    },[])

    const handleLoginSubmit = async (data) => {
        setError(false)
        openModal()
        try {
            const resp = await login(data)
            setUser(resp)
            setCollecToCxt()
            closeModal()
            navigate(routes.home)
        } catch (error) {
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
        }
    }

    return (
        <div className='register-container'>
            <Header />
            <div className={'container'}>
                <FormCard title={'Iniciar sesión'} inputs={inputsLogin} onSubmit={handleLoginSubmit}>
                    <button className='forgot-pass-btn' onClick={() => navigate(routes.forgotPass)} type='button'>
                        Olvidé mi contraseña
                    </button>
                    <div className='btns-container login'>
                        <FormButton text={'Ingresar'} type={'primary'} />
                        <FormButton text={'Registrarse'} type={'secondary'} action={() => navigate(routes.register)} />
                    </div>
                </FormCard>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    {error ? 
                        (<div className='modal-error'>
                            <b>No se pudo iniciar sesión</b>
                            Verifica tu correo electrónico y contraseña.
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

export default Login