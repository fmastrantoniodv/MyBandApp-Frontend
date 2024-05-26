import React from 'react'
import {FormButton, FormCard, Header} from '../components/Register/Form'

const Register = () => {

    const inputs = [
        {
            title: 'Nombre',
            name: 'name'
        },
        {
            title: 'Correo electrónico',
            name: 'email',
            type: 'email'
        },
        {
            title: 'Repita correo electrónico',
            name: 'repemail',
            type: 'email'
        },
        {
            title: 'Contraseña',
            name: 'password',
            type: 'password'
        },
        {
            title: 'Repita Contraseña',
            name: 'reppassword',
            type: 'password'
        },
        {
            title: 'Suscripción',
            name: 'suscription',
            type: 'dropdown',
            options: ["Full", "Standard"]
        }
    ]

    return (
        <>
            <div class={'container'}>
                <Header textPrimaryButton={'Iniciar sesión'} textSecondaryButton={'Volver a la página principal'}/>
                <FormCard type={'register'} title={'Registrarse'} inputs={inputs}>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        'flex-direction': 'column',
                        'margin-top':'38px'
                    }}>
                            <FormButton text={'Crear usuario'} type={'primary'}/>
                            <FormButton text={'Volver'} type={'secondary'}/>
                    </div>
                </FormCard>
            </div>
        </>
    )
}

export default Register