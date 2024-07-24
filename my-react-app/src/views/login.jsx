import React, { useState } from 'react'
import googleIcon from '../img/googleIcon.svg'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import { routes, inputsLogin } from '../const/constants'
import { useNavigate } from 'react-router-dom'
import LottieAnimation from '../components/Register/LoadingAnimation';
import { useUser } from '../contexts/UserContext';
import { login } from '../services/users/login'

export const LoadingScreen = ({ loading }) => { //TODO
    return (
        <div className="loading-screen" style={{ display: loading ? 'flex' : 'none' }}>
            <div className="loading-overlay">
                <LottieAnimation width={200} height={200} />
                Cargando...
            </div>
        </div>
    )
}

const Login = () => {

    const [loading, setLoading] = useState(false);

    const { setUser } = useUser()

    const navigate = useNavigate()

    const handleLoginSubmit = async (data) => {
        setLoading(true)
        try {
            const resp = await login(data)
            setUser(resp)
            setLoading(false)
            navigate(routes.home)
        } catch (error) {
            console.error('Error handleLoginSubmit: ', error);
            setLoading(false)
        }
    }

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
                action1={() => navigate(routes.register)}
                action2={() => navigate(routes.home)}
            />
            <div className={'container'}>
                <LoadingScreen loading={loading} />
                <FormCard title={'Iniciar sesión'} inputs={inputsLogin} onSubmit={handleLoginSubmit}>
                    <button style={{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        fontSize: '14px',
                        border: '0px',
                        marginTop: '9px'
                    }} onClick={() => navigate(routes.register)}>
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
                    <button className='form-btn secondary icon' type='button'>
                        Iniciar con google
                        <img alt='google icon' src={googleIcon} />
                    </button>
                </FormCard>
            </div>
        </div>
    )
}

export default Login