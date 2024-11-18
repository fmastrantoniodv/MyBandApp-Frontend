import React, { useState, useEffect } from 'react'
import logo from '../../img/logo.svg'
import menuIcon from '../../img/menuIcon.svg'
import settingsIcon from '../../img/settingsIcon.svg'
import { useModal } from "../../hooks/useModal"
import Modal from '../Modals/Modal'
import { suscriptions } from '../../const/constants'
import { updatePlan } from '../../services/usersServ'
import { useUser } from '../../contexts/UserContext'
import { useLoader } from '../../hooks/useLoader'
import GenericMsg from '../Modals/GenericMsg'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { InputDropdown, FormButton, ButtonText } from '../Register/Form'
import { routes } from '../../const/constants'

export const Header = ({ type, textPrimaryButton, textSecondaryButton, action1, action2 }) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()
    const [isOpenModalChangePlan, openModalChangePlan, closeModalChangePlan] = useModal(false)
    const { user, setUser, clearUser, clearProject } = useUser()
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const {showLoader, hideLoader, LoaderModal} = useLoader()
    
    const btnRequestError = {
        positiveAction: () => setError(false),
        positiveTextBtn: 'Aceptar'
    }

    useEffect(() => {
        if (searchParams.get('refresh')) {
            navigate(location.pathname, { replace: true });
          }
      }, [searchParams]);

    const handleLogout = () => {
        clearUser()
        clearProject()
        navigate(routes.login)
    }

    if(action1 === 'logout'){
        action1 = () => handleLogout()
    }
    if(action2 === 'logout'){
        action2 = () => handleLogout()
    }

    const handleUpdatePlanSubmit = async (data) => {
        setError(false)
        closeModalChangePlan()
        try {
            showLoader()
            await updatePlan(user.id, data.Plan)
            setUser({ ...user, plan: data.Plan })
            reset();
            hideLoader()
            navigate(`${location.pathname}?refresh=${Date.now()}`, { replace: true })
        } catch (error) {
            hideLoader()
            setError(true)
            console.error('Error handleRegisterSubmit: ', error)
        }
    }
    return (
        <>
        <Modal isOpen={isOpenModalChangePlan} closeModal={closeModalChangePlan}>
            <form className='form-card-update-plan' onSubmit={handleSubmit(handleUpdatePlanSubmit)}>
                <h3 className='favs-title'>Cambiar plan</h3>
                <div style={{ gap: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <InputDropdown key='planType' title='Plan' name='Plan' options={suscriptions} register={register} />
                </div>
                <div style={{ gap: '18px', display: 'flex' }}>
                    <FormButton text='Cancelar' type='secondary' action={() => closeModalChangePlan()} />
                    <FormButton text='Cambiar plan' type='primary' />
                </div>
            </form>
        </Modal>
        <GenericMsg type='ERROR' msg='No se pudo completar el cambio de plan' buttonsConfig={btnRequestError} open={error} />
        <LoaderModal />
        <header className={'main-header'}>
            <img src={logo} alt='my band app logo' className='logo'></img>
                {type == 'home' && (
            <div className='header-content'>
                <ButtonText type={'secondary'} text={textSecondaryButton} action={action2} />
                <span className='text-btn primary'>{textPrimaryButton}</span>
                <div className='settings-wrapper'>
                    <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
                    <div className='settings-container'>
                        <button className='settings-btns' onClick={()=> navigate(routes.changePass)}>Cambiar contraseña</button>
                        <button className='settings-btns' onClick={()=> openModalChangePlan()}>Cambiar plan</button>
                    </div>
                </div>
            </div>
                )}
            <div className='menu-wrapper'>
                <button style={{ background: `url(${menuIcon})` }} className='menu-icon' />
                {type == 'home' ? 
                (<div className='menu-container'>
                    <span className='menu-title'>{textPrimaryButton}</span>
                    <button className='settings-btns'>Cambiar contraseña</button>
                    <button className='settings-btns' onClick={()=> openModalChangePlan()}>Cambiar plan</button>
                    <button className='logout-menu-btn' onClick={action2}>{textSecondaryButton}</button>
                </div>) : 
                (<div className='menu-container'>
                    <button className='settings-btns' onClick={action1}>{textPrimaryButton}</button>
                    <button className='logout-menu-btn' onClick={action2}>{textSecondaryButton}</button>
                </div>)
                }
            </div>
        </header>
        </>
    )

}
