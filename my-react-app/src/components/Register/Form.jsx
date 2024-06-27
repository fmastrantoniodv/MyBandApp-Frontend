import React from 'react'
import logo from '../../img/logo.svg'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Header = ({ textPrimaryButton, textSecondaryButton, route1, route2 }) => {
    return (
        <header class={'main-header'}>
            <img src={logo} alt='my band app logo' class={'logo'}></img>
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    position: 'relative',
                    left: '80%',
                    transform: 'translateX(-80%)'
                }}
            >
                <ButtonText type={'secondary'} text={textSecondaryButton} route={route2} />
                <ButtonText type={'primary'} text={textPrimaryButton} route={route1} />
            </div>
        </header>
    )
}

export const ButtonText = ({ text, type, route }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(route);
    }

    return (
        <button class={`text-btn ${type}`} onClick={handleClick}>{text}</button>
    )
}

export const FormCard = ({ title, children, inputs, onSubmit }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    return (
        <form class={'card scale-up-center'} onSubmit={handleSubmit(onSubmit)}>
            <h1 class={'title'}>{title}</h1>
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
                                title={title}
                                name={name}
                                options={options}
                                register={register}
                            />
                        ) : <FormInput
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

            <input class={'form-input'} type={inputType} {...register(name,
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
            <select class={'form-input dropdown'}  {...register(name)}>
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}
