import { useEffect, useState } from 'react'
import { authPage, formCard } from '../../utils/class'
import NormalCard from '../../components/NormalCard'
import BrutalCard from '../../components/BrutalCard'
import { otpPage } from '../../utils/inputFields'
import InputCard from '../../components/InputCard'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'

const VerifyOtp = () => {
    const [timer, setTimer] = useState(60)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const email = localStorage.getItem('email')

    useEffect(() => {
        if (timer <= 0) return;

        const timeout = setTimeout(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [timer]);

    const {
        register,
        handleSubmit,
        setFocus,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await API.post("/auth/verify-otp", {
                email,
                otp: data.otp
            });
            const { success, message } = response.data;

            if (!success) {
                toast.error(message || "OTP verification failed");
                return;
            }

            toast.success(message);
            navigate('/')
        } catch (error) {
            toast.error(
                error.response?.data?.message || "OTP verification failed"
            );
        }
    }

    const sendOtp = async () => {
        try {
            setIsLoading(true)
            const response = await API.post('/auth/send-otp', { email })
            const { success, message } = response.data;

            if (!success) {
                toast.error(message || "Resend OTP Failed");
                return;
            }

            toast.success(message);
            setTimer(60)
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Resend OTP Failed"
            );
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={authPage}>

            {(isSubmitting || isLoading) && <Loading />}

            <form className={formCard} onSubmit={handleSubmit(onSubmit)}>

                <div className='flex justify-between items-center'>
                    <NormalCard className={'w-fit text-center bg-primary'}>TRACK <br /> HIRE</NormalCard>
                    <BrutalCard className={'w-fit text-center bg-secondary'}>VERIFY EMAIL</BrutalCard>
                </div>

                <div>
                    <p className='text-4xl mt-2'>VERIFY</p>
                    <p className='text-2xl'>YOUR EMAIL.</p>
                </div>

                {otpPage.map((item) => (
                    <InputCard
                        key={item.name}
                        item={item}
                        register={register}
                        errors={errors}
                        setFocus={setFocus}
                        maxLength={6}
                    />
                ))}

                <Button type={"submit"}>Verify OTP</Button>

                <p className='text-xs text-center font-medium'>
                    DIDN'T RECEIVE CODE? {" "}
                    <span className='font-bold'>
                        {timer > 0 ?
                            <span className='text-danger/50 font-normal'> RESEND IN {timer}s </span> :
                            <button
                                type='button'
                                className='text-secondary cursor-pointer'
                                onClick={sendOtp}
                                disabled={timer > 0}
                            >
                                RESEND
                            </button>
                        }
                    </span>
                </p>

                <p className='text-xs text-center font-medium'>
                    WANT TO GO BACK?
                    <Link to={-1} className='text-secondary font-bold hover:underline'> BACK</Link>
                </p>
            </form>

        </div>
    )
}

export default VerifyOtp
