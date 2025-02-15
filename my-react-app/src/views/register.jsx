import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormCard } from '../components/Register/Form'
import Modal from '../components/Modals/Modal'
import LottieAnimation from '../components/Register/LoadingAnimation';
import { routes, inputsRegister } from '../const/constants'
import { useModal } from '../hooks/useModal'
import { createNewUser } from '../services/usersServ';
import { Header } from '../components/Header/Header';
import { useSettings } from '../contexts/SettingsContext';

export const Register = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { currentSettings } = useSettings()
    const [inputsRegisterComplete, setInputsRegisterComplete] = useState(null)

    useEffect(()=> {
        var inputsRegisterWithPlanList = inputsRegister
        inputsRegisterWithPlanList[5].options = currentSettings.planList
        setInputsRegisterComplete(inputsRegisterWithPlanList)
    },[currentSettings])

    const handleRegisterSubmit = async (data) => {
        setError(false)
        openModal()
        try {
            await createNewUser(data)
            closeModal()
            navigate(routes.login)
        } catch (error) {
            console.error('Error handleRegisterSubmit: ', error)
            setError(true)
        }
    }

    return (
        <div className='register-container'>
            <Header />
            <div className={'container'}>
                {
                    inputsRegisterComplete && <FormCard title={'Registrarse'} inputs={inputsRegisterComplete} onSubmit={handleRegisterSubmit}>
                    <div className='btns-container register'>
                        <FormButton text={'Crear usuario'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(routes.login)} />
                    </div>
                </FormCard>
                }
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    {error ? 
                        (<div className='modal-error'>
                            <b>No se pudo completar el registro</b>
                            El nombre de usuario ya está en uso.
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
