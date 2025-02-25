import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormButton } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { useModal } from "../hooks/useModal"
import logo from '../img/logo.svg'
import { MainSection } from '../components/Landing/MainSection'
import { AboutUs } from '../components/Landing/AboutUs'
import { HeaderLanding } from '../components/Landing/HeaderLanding'

export const Landing = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    return (<>
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
                <HeaderLanding />
                <div className='landing-container'>
                    <MainSection />
                    <AboutUs />
                </div>
            </>
    )
}