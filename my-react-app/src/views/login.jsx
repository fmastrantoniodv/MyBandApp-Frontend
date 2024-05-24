import React from 'react'
import googleIcon from '../img/googleIcon.svg'
import {FormButton, FormCard, FormInput, Header} from '../components/Register/Form'

const Login = () => {
    return (
        <>
            <Header textPrimaryButton={'Registrarse'} textSecondaryButton={'Volver a la página principal'}/>
            <div class={'container'}>
                <FormCard title={'Iniciar sesión'}>
                    <div style={{
                        width: '100%',
                        gap: '21px',
                        display: 'flex',
                        'flex-direction': 'column'
                    }}>
                            <FormInput title={'Correo electrónico'}/>
                            <FormInput title={'Contraseña'}/>
                    </div>
                    <button style={{
                        'background-color':'rgba(0, 0, 0, 0)',
                        'font-size': '20px',
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
                        'margin-top':'38px'
                    }}>
                            <FormButton text={'Ingresar'} type={'primary'}/>
                            <FormButton text={'Registrarse'} type={'secondary'}/>
                    </div>
                    <button class='form-btn secondary icon'>
                        Iniciar con google
                        <img src={googleIcon}/>
                    </button>
                </FormCard>
            </div>
        </>
    )
}

export default Login