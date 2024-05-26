import React from 'react'
import logo from '../../img/logo.svg'
import { useForm } from 'react-hook-form'

export const Header = ({ type, textPrimaryButton, textSecondaryButton }) => {
    
    //TODO: revisar, comentario en FormButton
    const className = 'main-header ' + `${(type === 'home') ? 'home'
    : (type === 'register') ?  'register' : 'register'}`
    
    return (
        <header class={className}>
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
                    <ButtonText type={'secondary'} text={textSecondaryButton}/>
                    <ButtonText type={'primary'} text={textPrimaryButton}/>
                </div>
        </header>
    )
}

export const ButtonText = ({ text, type })  => {

    const className = 'text-btn ' + `${(type === 'primary') ? 'primary'
    : (type === 'secondary') ?  'secondary' : 'secondary'}`

    return (
        <button class={className}>{text}</button>
    )
}

export const FormCard = ({ type, title, children, inputs }) => {

    const { register, handleSubmit } = useForm()

    const className = 'card ' + `${(type === 'register') ? 'register'
    : (type === 'login') ?  'login' : ''}`

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return (
        <form class={className} onSubmit={onSubmit}>
            <h1 class={'title'}>{title}</h1>
            <div style={{
                width: '100%',
                gap: '21px',
                display: 'flex',
                'flex-direction': 'column'
            }}>
                {
                    inputs.map(({ title, options, name, type }) => (
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
                        />
                    ))
                }
            </div>
            {children}
        </form>
    )
}

export const FormButton = ({ text, type }) => {
    //TODO: no mg esto, ver algo estilo enum ?
    const className = 'form-btn ' + `${(type === 'primary') ? 'primary'
    : (type === 'secondary') ?  'secondary' : 'secondary'}`

    return (
        <button class={className} type={(type === 'primary') ? 'submit' : 'button'}>{text}</button>
    )
}

export const FormInput = ({ title, type, name, register }) => {

    const inputType = (type === 'email') ? 'email'
    : (type === 'password') ?  'password' : (type === 'list') ?  'list' : 'text'

    return (
        <div style={{
            display: 'flex',
            'flex-direction': 'column',
            'align-items':'flex-start',
            width: '100%'
        }}>
            <h3 style={{
            color: '#000000',
            margin: '0px 0px 7px 0px',
            'font-size': '20px',
            'font-style': 'normal'
            }}>{title}
            </h3>
            
            <input class={'form-input'} type={inputType} { ...register(name) }/>
        </div>
    )
}

export const InputDropdown = ({ title, name, options, register}) => {
    return (
        <div>
            <h3 style={{
            color: '#000000',
            margin: '0px 0px 7px 0px',
            'font-size': '20px',
            'font-style': 'normal'
            }}>{title}
            </h3>
            <select class={'form-input dropdown'}  { ...register(name) }>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
