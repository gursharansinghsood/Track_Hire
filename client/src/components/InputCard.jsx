import { useState } from 'react'
import { errorField, inputBox } from '../utils/class'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const InputCard = ({ item, register, setFocus, errors, ...props }) => {
    const [show, setShow] = useState(false)

    const isPassword = item.type === "password"


    const Icon = item.icon
    return (
        <div className='relative grid grid-cols-1'>
            <label className='text-sm'>{item.label}</label>
            <div className={inputBox(errors[item.name])}>
                <input
                    className='w-full outline-none pr-2'
                    type={isPassword ? show ? 'text' : 'password' : item.type}
                    placeholder={item.placeholder}
                    {...register(item.name, item.validation)}
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return

                        if (!isPassword && item.setFocus) {
                            e.preventDefault()
                            setFocus(item.setFocus)
                        }
                    }}
                    {...props}
                />
                {isPassword ?
                    <button className='cursor-pointer' type='button' onClick={() => setShow(prev => !prev)}>
                        {show ? <FiEyeOff /> : <FiEye />}
                    </button>
                    : <Icon />}
            </div>
            {errors[item.name] && <p className={errorField}>{errors[item.name]?.message}</p>}
        </div>
    )
}

export default InputCard
