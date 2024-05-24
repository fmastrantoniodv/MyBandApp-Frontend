import React from 'react'
import logo from '../../img/logo.svg'

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

//TODO: Podría recibir un array de inputs en vez de children
export const FormCard = ({ type, title, children }) => {

    const className = 'card ' + `${(type === 'register') ? 'register'
    : (type === 'login') ?  'login' : ''}`

    return (
        <div class={className}>
            <h1 class={'title'}>{title}</h1>
            {children}
        </div>
    )
}

export const FormButton = ({ text, type }) => {
    //TODO: no mg esto, ver algo estilo enum ?
    const className = 'form-btn ' + `${(type === 'primary') ? 'primary'
    : (type === 'secondary') ?  'secondary' : 'secondary'}`

    return (
        <button class={className}>{text}</button>
    )
}

export const FormInput = ({ title, type }) => {

    const className = 'form-input ' + `${(type === 'text') ? 'text'
    : (type === 'password') ?  'password' : 'text'}`

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
            <input class={'form-input'}/>
        </div>
    )
}
