import React from 'react'
import googleIcon from '../img/googleIcon.svg'
import {FormButton, FormCard, FormInput, Header} from '../components/Register/Form'
import { routes } from '../const/constants'

const Login = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const inputs = [
        {
            title: 'Correo electrónico',
            name: 'email',
            type: 'email',
            required: {
                value: true,
                message: 'Por favor ingrese su correo electrónico'
            },
            validate: (value) => emailRegex.test(value) || 'El formato del correo electrónico no es válido'
        },
        {
            title: 'Contraseña',
            name: 'password',
            type: 'password',
            required: {
                value: true,
                message: 'Por favor ingrese su contraseña'
            }
        }
    ];

    return (
        <div style={{
            display: 'flex',
            'flex-direction': 'column',
            'background-color':'#262529',
            'min-height': '100vh'
        }}>
            <Header 
                textPrimaryButton={'Registrarse'} 
                textSecondaryButton={'Volver a la página principal'}
                route1 = {routes.register}
                route2 = {routes.home}
            />
            <div class={'container'}>
                <FormCard title={'Iniciar sesión'} inputs={inputs}>
                    <button style={{
                        'background-color':'rgba(0, 0, 0, 0)',
                        'font-size': '14px',
                        border: '0px',
                        'margin-top':'9px'
                    }}>
                        Olvidé mi contraseña
                    </button>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        'flex-direction': 'column',
                        'margin-top':'38px',
                        'align-items':'center'
                    }}>
                            <FormButton text={'Ingresar'} type={'primary'}/>
                            <FormButton text={'Registrarse'} type={'secondary'}/>
                    </div>
                    <button class='form-btn secondary icon' type='button'>
                        Iniciar con google
                        <img src={googleIcon}/>
                    </button>
                </FormCard>
            </div>
        </div>
    )
}

export default Login