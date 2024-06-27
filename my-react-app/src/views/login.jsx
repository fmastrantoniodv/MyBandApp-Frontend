import React, { useContext } from 'react'
import googleIcon from '../img/googleIcon.svg'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import { routes, inputsLogin } from '../const/constants'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LottieAnimation from '../components/Register/LoadingAnimation';
import { UserContext } from '../contexts/UserContext';

export const LoadingScreen = ({ loading }) => {
    return (
        <div className="loading-screen" style={{ display: loading ? 'flex' : 'none' }}>
            <div className="loading-overlay">
                <LottieAnimation width={200} height={200} />
                Cargando...
            </div>
        </div>
    )
}

export const loginPOST = async (data, setLoading, setUser) => {
    setLoading(true);
    try {
        const url = 'http://localhost:3001/api/users/login';
        const body = {
            "email": data.email,
            "password": data.password
        };
        console.log("loginPOST:" + body)
        const response = await axios.post(url, body);
        console.log(response);
        setUser(response.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        setLoading(false);
    }
}

const Login = () => {

    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate()

    const handleLoginSubmit = async (data) => {
        try {
            const resp = await loginPOST(data, setLoading, setUser);
            if (resp.status === 200) {
                console.log('http status ok, resp: ' + JSON.stringify(resp.data));
                navigate(routes.home);
            } else {
                console.log('http status not ok');
            }
        } catch (error) {
            console.error('Error: ', error);
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
                route1={routes.register}
                route2={routes.home}
            />
            <div class={'container'}>
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