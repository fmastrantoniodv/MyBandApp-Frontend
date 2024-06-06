import React from 'react'
import logo from '../../img/logo.svg'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Header = ({ textPrimaryButton, textSecondaryButton, route1, route2 }) => {
    return (
        <header class={'main-header'}>
            <img src={logo} class={'logo'}></img>
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
        <button class={'text-btn ' + `${type}`} onClick={handleClick}>{text}</button>
    )
}

export const FormCard = ({ title, children, inputs, url, request }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const onSubmit = handleSubmit((data) => {
        console.log(data);

        const dataHC = {
            "email": "newswdasddUser@kkk.com",
            "usrName": "12fghwwwasdasdsdhsfgds",
            "password": "asda2asadsssssddff",
            "plan": "free"
        }

        fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            body: dataHC
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error !response.ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Salió ok ", data);
        })
        .catch(err => console.error("Error:", err));
    })

    return (
        <form class={'card scale-up-center'} onSubmit={onSubmit}>
            <h1 class={'title'}>{title}</h1>
            <div style={{
                width: '100%',
                gap: '12px',
                display: 'flex',
                'flex-direction': 'column'
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

export const FormButton = ({ text, type }) => {
    return (
        <button class={'form-btn ' + `${type}`} type={(type === 'primary') ? 'submit' : 'button'}>{text}</button>
    )
}

export const FormInput = ({ title, type, name, register, required, validate, errors, watch }) => {

    const inputType = (type === 'email') ? 'email'
        : (type === 'password') ? 'password'  : 'text'

    return (
        <div style={{
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'flex-start',
            width: '100%'
        }}>
            <h3 style={{
                color: '#000000',
                margin: '0px 0px 5px 0px',
                'font-size': '14px',
                'font-family': 'Inter-SemiBold , sans-serif'
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
                <span style={{ color: '#000000', display: 'block', 'font-size': '12px' }}>{errors[name].message}</span>
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
                'font-size': '14px',
                'font-family': 'Inter-SemiBold , sans-serif'
            }}>
                {title}
            </h3>
            <select class={'form-input dropdown'}  {...register(name)}>
                {options.map(option => (
                    <option value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}
