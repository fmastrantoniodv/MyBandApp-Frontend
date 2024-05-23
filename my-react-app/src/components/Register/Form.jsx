import React from 'react'
import logo from '../../img/logo.svg'

export const FormButton = ({ text, type }) => {
    
    const className = 'form-btn ' + `${(type === 'primary') ? 'primary'
    : (type === 'secondary') ?  'secondary' : 'secondary'}`

    return (
        <>
            <button class={className}>{text}</button>
        </>
    )
}

export const FormCard = ({ title, children }) => {
    return (
        <div class={'card'}>
            <h1 class={'title'}>{title}</h1>
            {children}
        </div>
    )
}

export const ButtonText = ({ text, type })  => {

    const className = 'text-btn ' + `${(type === 'primary') ? 'primary'
    : (type === 'secondary') ?  'secondary' : 'secondary'}`

    return (
        <button class={className}>{text}</button>
    )
}

export const Header = ({ type, children }) => {

    const className = 'main-header ' + `${(type === 'home') ? 'home'
    : (type === 'register') ?  'register' : 'register'}`

    return (
        <header class={className}>
                <img src={logo}></img>
                {children}
        </header>
    )
}


