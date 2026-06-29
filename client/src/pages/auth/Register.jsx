import { authPage, formCard } from '../../utils/class'

import NormalCard from '../../components/NormalCard'
import BrutalCard from '../../components/BrutalCard'
import { registerPage } from '../../utils/inputFields'
import InputCard from '../../components/InputCard'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'

const Register = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await API.post("/auth/register", data);
            const { success, message } = response.data;

            if (!success) {
                toast.error(message || "Register Failed");
                return;
            }

            toast.success(message);
            localStorage.setItem('email', data.email)
            navigate('/verify-otp')
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Register Failed"
            );
        }
    }

    return (
        <div className={authPage}>

            {isSubmitting && <Loading />}

            <form className={formCard} onSubmit={handleSubmit(onSubmit)}>

                <div className='flex justify-between items-center'>
                    <NormalCard className={'w-fit text-center bg-primary'}>TRACK <br /> HIRE</NormalCard>
                    <BrutalCard className={'w-fit text-center bg-secondary'}>CREATE ACCOUNT</BrutalCard>
                </div>

                <div>
                    <p className='text-4xl mt-2'>CREATE</p>
                    <p className='text-2xl'>YOUR ACCOUNT.</p>
                </div>

                {registerPage.map((item) => (
                    <InputCard
                        key={item.name}
                        item={item}
                        register={register}
                        errors={errors}
                        setFocus={setFocus}
                    />
                ))}

                <Button type={"submit"}>Register</Button>

                <p className='text-xs text-center font-medium'>
                    ALREADY HAVE AN ACCOUNT? {" "}
                    <Link to={'/'} className='text-secondary font-bold hover:underline'>LOGIN</Link>
                </p>
            </form>

        </div>
    )
}

export default Register
