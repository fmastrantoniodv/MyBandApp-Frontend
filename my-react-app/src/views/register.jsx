import React from 'react'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import { routes, inputsRegister } from '../const/constants'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LottieAnimation from '../components/Register/LoadingAnimation';

export const LoadingScreen = ({ loading }) => {
    return (
        <div className="loading-screen" style={{ display: loading ? 'flex' : 'none' }}>
            <div className="loading-overlay">
                <LottieAnimation width={200} height={200} />
                Cargando...
            </div>
        </div>
    );
};

export const postUser = async (data, setLoading) => {
    setLoading(true)
    try {
        const url = 'http://localhost:3001/api/users/register'
        const body = {
            "usrName": data.name,
            "email": data.email,
            "password": data.password,
            "plan": data.suscription
        };
        const response = await axios.post(url, body)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        setLoading(false)
    }
}

const Register = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleRegisterSubmit = async (data) => {
        try {
            const resp = await postUser(data, setLoading);
            if (resp.status === 200) {
                console.log('http status ok, resp: ' + JSON.stringify(resp.data))
                navigate(routes.login)
            } else {
                console.log('http status not ok')
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#262529'
        }}>
            <Header
                textPrimaryButton={'Iniciar sesión'}
                textSecondaryButton={'Volver a la página principal'}
                action1={() => navigate(routes.login)}
                action2={() => navigate(routes.home)}
            />
            <div class={'container'}>
                <LoadingScreen loading={loading} />
                <FormCard title={'Registrarse'} inputs={inputsRegister} onSubmit={handleRegisterSubmit}>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '30px',
                        alignItems: 'center'
                    }}>
                        <FormButton text={'Crear usuario'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(routes.login)} />
                    </div>
                </FormCard>
            </div>
        </div>
    )
}

export default Register