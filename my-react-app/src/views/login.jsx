import React from 'react'
import googleIcon from '../img/googleIcon.svg'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import { routes, inputsLogin } from '../const/constants'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#262529',
            minHeight: '100vh'
        }}>
            <Header
                textPrimaryButton={'Registrarse'}
                textSecondaryButton={'Volver a la página principal'}
                route1={routes.register}
                route2={routes.home}
            />
            <div class={'container'}>
                <FormCard title={'Iniciar sesión'} inputs={inputsLogin} urlForm={routes.home}>
                    <button style={{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        fontSize: '14px',
                        border: '0px',
                        marginTop: '9px'
                    }}>
                        Olvidé mi contraseña
                    </button>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '38px',
                        alignItems: 'center'
                    }}>
                        <FormButton text={'Ingresar'} type={'primary'} />
                        <FormButton text={'Registrarse'} type={'secondary'} action={() => navigate(routes.register)} />
                    </div>
                    <button class='form-btn secondary icon' type='button'>
                        Iniciar con google
                        <img alt='google icon' src={googleIcon} />
                    </button>
                </FormCard>
            </div>
        </div>
    )
}

export default Login