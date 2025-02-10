export const envCode = process.env.REACT_APP_ENV_CODE;
export const endpointBackend = process.env.REACT_APP_ENDPOINT_BACKEND;

export const routes = {
    login: '/',
    register: '/register',
    home: '/home',
    studio: '/studio',
    collections: '/collections',
    changePass: '/changePass',
    forgotPass: '/forgotPass',
    validateOtc: '/validateOtc'
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^[a-zA-Z0-9]{8,}$/
const numberRegex = /^[0-9]{8}$/
export const suscriptions = [
    { "key": "free", "value": "Free" },
    { "key": "trial", "value": "Trial" },
    { "key": "pro", "value": "Pro" }
]

export const inputsLogin = [
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

export const inputsRegister = [
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
        validate: (value) => passwordRegex.test(value) || 'La contraseña debe ser alfanumérica de al menos 8 caracteres'
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
        type: 'dropdown'
    }
]

export const inputsChangePass = [
    {
        title: 'Contraseña actual',
        name: 'currentPassword',
        type: 'password',
        required: {
            value: true,
            message: 'Por favor ingrese su contraseña actual'
        },
        validate: (value) => passwordRegex.test(value) || 'La contraseña no tiene un formato valido',
        autoComplete: 'new-password'
    },
    {
        title: 'Ingrese contraseña',
        name: 'firstPassword',
        type: 'password',
        required: {
            value: true,
            message: 'El campo no puede ser vacío'
        },
        validate: (value) => passwordRegex.test(value) || 'La contraseña debe ser alfanumérica de al menos 8 caracteres',
        autoComplete: 'new-password'
    },
    {
        title: 'Repita su contraseña',
        name: 'secondPassword',
        type: 'password',
        required: {
            value: true,
            message: 'El campo no puede ser vacío'
        },
        validate: (value) => passwordRegex.test(value) || 'La contraseña debe ser alfanumérica de al menos 8 caracteres',
        autoComplete: 'new-password'
    }
];

export const inputsForgotPass = [
    {
        title: 'Correo electrónico',
        name: 'email',
        type: 'email',
        required: {
            value: true,
            message: 'El campo correo electrónico no puede ser vacío'
        },
        validate: (value) => emailRegex.test(value) || 'El formato del correo electrónico no es válido'
    }
]

export const inputValidateOtc = [
    {
        title: 'Código de verificación recibido',
        name: 'verify_code',
        type: 'number',
        required: {
            value: true,
            message: 'El campo no puede estar vacío'
        },
        validate: (value) => numberRegex.test(value) || 'El código no tiene un formato válido',
        autocomplete: 'off'
    }
]

export const isAvailableWithUserPlan = (userPlan, libPlan, planList) => {
    var userPlanOrder = planList.find((item) => item.value === userPlan).order
    var libPlanOrder = planList.find((item) => item.value === libPlan).order
    return userPlanOrder >= libPlanOrder ? true : false
}

export function capitalizeFirstLetter(word) {
    if (!word) return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
}
