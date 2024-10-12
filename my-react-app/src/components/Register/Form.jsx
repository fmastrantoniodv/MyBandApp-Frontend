import React, { useState, useEffect } from 'react'
import logo from '../../img/logo.svg'
import menuIcon from '../../img/menuIcon.svg'
import settingsIcon from '../../img/settingsIcon.svg'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useModal } from "../../hooks/useModal"
import Modal from '../Modals/Modal'
import { routes, suscriptions } from '../../const/constants'
import LottieAnimation from './LoadingAnimation'
import { updatePlan } from '../../services/usersServ'
import { useUser } from '../../contexts/UserContext'
import { useLoader } from '../../hooks/useLoader'
import GenericMsg from '../Modals/GenericMsg'

export const Header = ({ type, textPrimaryButton, textSecondaryButton, action1, action2 }) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()
    const [isOpenModalChangePlan, openModalChangePlan, closeModalChangePlan] = useModal(false)
    const { user, setUser } = useUser()
    const [isOpenModal, openModal, closeModal] = useModal(false)
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
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 50px', gap: '25px' }} onSubmit={handleSubmit(handleUpdatePlanSubmit)}>
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
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <div className='modal-error'>
                <b>No se pudo completar el cambio de plan</b>
                <FormButton text={'Volver'} type={'secondary'} action={() => closeModal()}/>
            </div>
        </Modal>
            <GenericMsg type='ERROR' msg='genericMsg' buttonsConfig={btnRequestError} open={error} />
        <LoaderModal />
        <header className={'main-header'}>
            <img src={logo} alt='my band app logo' className='logo'></img>
            <div className='header-content'>
                <ButtonText type={'secondary'} text={textSecondaryButton} action={action2} />
                <span className='text-btn primary'>{textPrimaryButton}</span>
                {type == 'home' && (
                <div className='settings-wrapper'>
                    <button style={{ background: `url(${settingsIcon})` }} className='settings-btn' />
                    <div className='settings-container'>
                        <button className='settings-btns'>Cambiar contraseña</button>
                        <button className='settings-btns' onClick={()=> openModalChangePlan()}>Cambiar plan</button>
                    </div>
                </div>
                )}
            </div>
            <div className='menu-wrapper'>
                <button style={{ background: `url(${menuIcon})` }} className='menu-icon' />
                {type == 'home' ? 
                (<div className='menu-container'>
                    <span className='menu-title'>{textPrimaryButton}</span>
                    <button className='settings-btns'>Cambiar contraseña</button>
                    <button className='settings-btns'>Cambiar plan</button>
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

export const ButtonText = ({ text, type, action }) => {

    return (
        <button className={`text-btn ${type}`} onClick={action} type='button'>{text}</button>
    )
}

export const FormCard = ({ title, children, inputs, onSubmit }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    return (
        <form className={'card scale-up-center'} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={'title'}>{title}</h1>
            <div style={{
                width: '100%',
                gap: '12px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {
                    inputs.map(({ title, options, name, type, required, validate }) => (
                        type === 'dropdown' ? (
                            <InputDropdown
                                key={name}
                                title={title}
                                name={name}
                                options={options}
                                register={register}
                            />
                        ) : <FormInput
                            key={name}
                            title={title}
                            name={name}
                            type={type}
                            register={register}
                            errors={errors}
                            required={required}
                            validate={validate}
                            watch={watch}
                        />
                    ))
                }
            </div>
            {children}
        </form>
    )
}

export const FormButton = ({ text, type, action }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (typeof action === 'string') {
            navigate(action);
        } else if (typeof action === 'function') {
            action();
        }
    };

    return (
        <button
            className={`form-btn ${type}`}
            type={type === 'primary' ? 'submit' : 'button'}
            onClick={type === 'secondary' ? handleClick : null}
        >
            {text}
        </button>
    );
}

export const FormInput = ({ title, type, name, register, required, validate, errors, watch }) => {

    const inputType = (type === 'email') ? 'email'
        : (type === 'password') ? 'password' : 'text'

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
        }}>
            <h3 style={{
                color: '#000000',
                margin: '0px 0px 5px 0px',
                fontSize: '14px',
                fontFamily: 'Inter-SemiBold , sans-serif'
            }}>{title}
            </h3>

            <input className={'form-input'} type={inputType} {...register(name,
                {
                    required: required ? {
                        value: required.value,
                        message: required.message
                    } : false,
                    validate: validate ? {
                        validate: (value) => validate(value, watch)
                    } : undefined
                }
            )} />
            {errors[name] && (
                <span style={{ color: '#000000', display: 'block', fontSize: '12px' }}>{errors[name].message}</span>
            )}
        </div>
    )
}

export const InputDropdown = ({ title, name, options, register }) => {
    return (
        <div>
            <h3 style={{
                color: '#000000',
                margin: '0px 0px 5px 0px',
                fontSize: '14px',
                fontFamily: 'Inter-SemiBold , sans-serif'
            }}>
                {title}
            </h3>
            <select className={'form-input dropdown'}  {...register(name)}>
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}

