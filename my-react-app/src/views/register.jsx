import React from 'react'
import {FormButton, FormCard, Header, InputDropdown} from '../components/Register/Form'
import { Input, InputOptions } from '../components/Register/Input'
import { routes } from '../const/constants'

const Register = () => {
    
    const inputs = [
        new Input('Nombre',
            'name',
            undefined,
            {
                value: true,
                message: 'El campo nombre no puede ser vacío' 
            }
        ),
        new Input('Correo electrónico',
            'email',
            'email',
            {
                value: true,
                message: 'El campo correo electrónico no puede ser vacío' 
            }
        ),
        new Input('Repita correo electrónico',
            'repemail',
            'email',
            {
                value: true,
                message: 'El campo correo electrónico no puede ser vacío' 
            },
        ),
        new Input('Contraseña',
            'password',
            'password',
            {
                value: true,
                message: 'El campo contraseña no puede ser vacío' 
            }
        ),
        new Input('Repita Contraseña',
            'reppassword',
            'password',
            {
                value: true,
                message: 'Las contraseñas no coinciden' 
            }
        ),
        new InputOptions('Suscripción',
            'suscription',
            ["Full", "Standard"]
        )
    ]

    return (
        <>
            <div class={'container'}>
                <Header 
                    textPrimaryButton={'Iniciar sesión'} 
                    textSecondaryButton={'Volver a la página principal'}
                    route1 = {routes.login}
                    route2 = {routes.home}
                />
                <FormCard type={'register'} title={'Registrarse'} inputs={inputs}>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        'flex-direction': 'column',
                        'margin-top':'38px',
                        'align-items': 'center'
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