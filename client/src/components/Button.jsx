import { FiArrowRightCircle } from 'react-icons/fi'

const Button = ({ children, className = '', ...props }) => {
    return (
        <button className={`${className} bg-primary hover:bg-primary/80 cursor-pointer shadow-brutal border-2 border-border py-1 px-2 my-2 flex items-center justify-center`} {...props}>
            <p className='w-full text-center'>{children}</p>
            <FiArrowRightCircle />
        </button>
    )
}

export default Button
