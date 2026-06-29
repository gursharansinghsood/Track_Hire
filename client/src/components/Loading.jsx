import { ImSpinner9 } from 'react-icons/im'

const Loading = () => {
  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center bg-bg/20 backdrop-blur-md z-50'>
      <div className="rounded-full animate-spin text-4xl"><ImSpinner9 /></div>

    </div>
  )
}

export default Loading
