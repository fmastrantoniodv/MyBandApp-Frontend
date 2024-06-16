import React from 'react'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import { routes } from '../const/constants'
import axios from 'axios'


export const postUser = async (data) => {
    try {
        const url = 'http://localhost:3001/api/users/register'   
        const body = {
            "usrName": data.name,
            "email": data.email,
            "password": data.password,
            "plan": data.suscription
        }
        const response = await axios.post(url, body)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

const Register = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^[a-zA-Z0-9]+$/
    const suscriptions = [
        { "key": "free", "value": "Free" },
        { "key": "trial", "value": "Trial" },
        { "key": "pro", "value": "Pro" }
    ]

    const inputs = [
        {
            title: 'Nombre',
            name: 'name',
            type: 'text',
            required: {
                value: true,
                message: 'El campo nombre no puede ser vacío'
            }
        },
        {
            title: 'Correo electrónico',
            name: 'email',
            type: 'email',
            required: {
                value: true,
                message: 'El campo correo electrónico no puede ser vacío'
            },
            validate: (value) => emailRegex.test(value) || 'El formato del correo electrónico no es válido'
        },
        {
            title: 'Repita correo electrónico',
            name: 'repemail',
            type: 'email',
            required: {
                value: true,
                message: 'El campo correo electrónico no puede ser vacío'
            },
            validate: (value, watch) => value === watch('email') || 'Los correos electrónicos no coinciden'
        },
        {
            title: 'Contraseña',
            name: 'password',
            type: 'password',
            required: {
                value: true,
                message: 'El campo contraseña no puede ser vacío'
            },
            validate: (value) => passwordRegex.test(value) || 'La contraseña debe ser alfanumérica'
        },
        {
            title: 'Repita Contraseña',
            name: 'reppassword',
            type: 'password',
            required: {
                value: true,
                message: 'Campo obligatorio'
            },
            validate: (value, watch) => value === watch('password') || 'Las contraseñas no coinciden'
        },
        {
            title: 'Suscripción',
            name: 'suscription',
            type: 'dropdown',
            options: suscriptions
        }
    ]

    return (
        <div style={{
            display: 'flex',
            'flex-direction': 'column',
            'background-color':'#262529'
        }}>
            <Header
                textPrimaryButton={'Iniciar sesión'}
                textSecondaryButton={'Volver a la página principal'}
                route1={routes.login}
                route2={routes.home}
            />
            <div class={'container register'}>
                <FormCard title={'Registrarse'} inputs={inputs} url={'http://localhost:3001/api/users/register'} request={postUser}>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        'flex-direction': 'column',
                        'margin-top': '30px',
                        'align-items': 'center'
                    }}>
                        <FormButton text={'Crear usuario'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} />
                    </div>
                </FormCard>
            </div>
        </div>
    )
}

export default Register