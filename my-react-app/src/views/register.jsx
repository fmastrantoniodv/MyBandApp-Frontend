import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import Modal from '../components/Modals/Modal'
import LottieAnimation from '../components/Register/LoadingAnimation';
import { routes, inputsRegister } from '../const/constants'
import { useModal } from '../hooks/useModal'
import { createNewUser } from '../services/users/createNewUser'

const Register = () => {

    const [isOpenModal, openModal, closeModal] = useModal(false)

    const navigate = useNavigate()

    const handleRegisterSubmit = async (data) => {
        openModal()
        try {
            await createNewUser(data)
            closeModal()
            navigate(routes.login)
        } catch (error) {
            console.error('Error handleRegisterSubmit: ', error)
            closeModal()
        }
    }

    return (
        <div className='register-container'>
            <Header textPrimaryButton={'Iniciar sesión'} textSecondaryButton={'Volver a la página principal'} action1={() => navigate(routes.login)} action2={() => navigate(routes.home)}/>
            <div className={'container'}>
                <FormCard title={'Registrarse'} inputs={inputsRegister} onSubmit={handleRegisterSubmit}>
                    <div className='btns-container register'>
                        <FormButton text={'Crear usuario'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(routes.login)} />
                    </div>
                </FormCard>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    <div className='loading'>
                        <LottieAnimation width={200} height={200} />
                        Cargando...
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Register