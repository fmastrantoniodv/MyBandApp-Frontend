import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate} from 'react-router-dom'

export const ButtonText = ({ text, type, action }) => {
    return (
        <button className={`text-btn ${type}`} onClick={action} type='button'>{text}</button>
    )
}

export const FormCard = ({ title, children, inputs, onSubmit, autoComplete = 'on'}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    console.log('[Form.jsx].FormCard.inputs', inputs)

    return (
        <form className={'card scale-up-center'} onSubmit={handleSubmit(onSubmit)} autoComplete={autoComplete}>
            <h1 className={'title'}>{title}</h1>
            <div style={{
                width: '100%',
                gap: '12px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {
                    inputs.map(({ title, options, name, type, required, validate, autoComplete}) => (
                        type === 'dropdown' ? (
                            name === 'suscription' ?
                            <PlanDropdown
                                key={name}
                                title={title}
                                name={name}
                                options={options}
                                register={register}
                            />
                            :
                            <InputDropdown
                                key={name}
                                title={title}
                                name={name}
                                options={options}
                                register={register}
                            />
                        ) : <FormInput
                            key={name}
                            title={title}
                            name={name}
                            type={type}
                            register={register}
                            errors={errors}
                            required={required}
                            validate={validate}
                            watch={watch}
                            autoComplete={autoComplete}
                        />
                    ))
                }
            </div>
            {children}
        </form>
    )
}

export const FormButton = ({ text, type, action }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (typeof action === 'string') {
            navigate(action);
        } else if (typeof action === 'function') {
            action();
        }
    };

    return (
        <button
            className={`form-btn ${type}`}
            type={type === 'primary' ? 'submit' : 'button'}
            onClick={type === 'secondary' ? handleClick : null}
        >
            {text}
        </button>
    );
}

export const FormInput = ({ title, type, name, register, required, validate, errors, watch }) => {
    const inputType = (type === 'email') ? 'email'
        : (type === 'password') ? 'password' : 'text'

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
        }}>
            <h3 style={{
                color: '#000000',
                margin: '0px 0px 5px 0px',
                fontSize: '14px',
                fontFamily: 'Inter-SemiBold , sans-serif'
            }}>{title}
            </h3>

            <input className={'form-input'} type={inputType} {...register(name,
                {
                    required: required ? {
                        value: required.value,
                        message: required.message
                    } : false,
                    validate: validate ? {
                        validate: (value) => validate(value, watch)
                    } : undefined
                }
            )} />
            {errors[name] && (
                <span style={{ color: '#000000', display: 'block', fontSize: '12px' }}>{errors[name].message}</span>
            )}
        </div>
    )
}

export const InputDropdown = ({ title, name, options, register }) => {
    return (
        <div>
            <h3 style={{
                color: '#000000',
                margin: '0px 0px 5px 0px',
                fontSize: '14px',
                fontFamily: 'Inter-SemiBold , sans-serif'
            }}>
                {title}
            </h3>
            <select className={'form-input dropdown'}  {...register(name)}>
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}

export const PlanDropdown = ({ title, name, options, register }) => {
    return (
        <div>
            <h3 style={{
                color: '#000000',
                margin: '0px 0px 5px 0px',
                fontSize: '14px',
                fontFamily: 'Inter-SemiBold , sans-serif'
            }}>
                {title}
            </h3>
            <select className={'form-input dropdown'}  {...register(name)}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label} ${formatNumberAndSplit(option.price)[0]},{formatNumberAndSplit(option.price)[1]}{option.description !== null && ` (${option.description})`}</option>
                ))}
            </select>
        </div>
    )
}

function formatNumberAndSplit(number) {
    const formatted = number
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    const [integers, decimals] = formatted.split(',');

    return [integers, decimals]
}