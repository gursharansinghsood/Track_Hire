import { authPage, formCard } from '../../utils/class'

import NormalCard from '../../components/NormalCard'
import BrutalCard from '../../components/BrutalCard'
import InputCard from '../../components/InputCard'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import { loginPage } from '../../utils/inputFields'

const Login = () => {
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
      const response = await API.post("/auth/login", data);

      const { success, message, data: resData } = response.data;

      const accessToken = resData?.accessToken;

      if (!success) {
        toast.error(message || "Login failed");
        return;
      }

      if (!accessToken) {
        throw new Error("Login failed: accessToken missing");
      }

      toast.success(message);
      localStorage.setItem("accessToken", accessToken);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div className={authPage}>

      {isSubmitting && <Loading />}

      <form className={formCard} onSubmit={handleSubmit(onSubmit)}>

        <div className='flex justify-between items-center'>
          <NormalCard className={'w-fit text-center bg-primary'}>TRACK <br /> HIRE</NormalCard>
          <BrutalCard className={'w-fit text-center bg-secondary'}>WELCOME BACK</BrutalCard>
        </div>

        <div>
          <p className='text-4xl mt-2'>LOGIN</p>
          <p className='text-2xl'>TO YOUR ACCOUNT</p>
        </div>

        {loginPage.map((item) => (
          <InputCard
            key={item.name}
            item={item}
            register={register}
            errors={errors}
            setFocus={setFocus}
          />
        ))}

        <Button type={"submit"}>Login</Button>

        <p className='text-xs text-center font-medium'>
          NEW HERE? {" "}
          <Link to={'/register'} className='text-secondary font-bold hover:underline'>CREATE ACCOUNT</Link>
        </p>
      </form>

    </div>
  )
}

export default Login
