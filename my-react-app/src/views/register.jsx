import React from 'react'
import {FormButton, FormCard, FormInput, Header} from '../components/Register/Form'

const Register = () => {
    return (
        <>
            <div class={'container'}>
                <Header textPrimaryButton={'Iniciar sesión'} textSecondaryButton={'Volver a la página principal'}/>
                <FormCard type={'register'} title={'Registrarse'}>
                    <div style={{
                        width: '100%',
                        gap: '21px',
                        display: 'flex',
                        'flex-direction': 'column'
                    }}>
                            <FormInput title={'Nombre'}/>
                            <FormInput title={'Correo electrónico'}/>
                            <FormInput title={'Repita correo electrónico'}/>
                            <FormInput title={'Contraseña'}/>
                            <FormInput title={'Repita Contraseña'}/>
                            <FormInput title={'Suscripción'}/>
                    </div>
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