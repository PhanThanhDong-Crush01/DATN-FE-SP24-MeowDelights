import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { signin } from '@/services/auth'
import { message } from 'antd'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const SigninPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data: any) => {
        const values = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await signin(values)
            if (response?.user) {
                const user = JSON.stringify(response?.user)
                localStorage.setItem('user', user)
                localStorage.setItem('userID', response?.user?._id)
                if (response?.user?.role !== 'member') {
                    message.success('Đăng nhập thành công admin')
                    navigate('/admin')
                }
                if (response?.user?.role === 'member') {
                    message.success('Đăng nhập thành công !')
                    navigate(`/updateProfile`)
                }
            }
        } catch (error: any) {
            console.log(error)
            message.warning(error?.response?.message)
        }
    }

    return (
        <div className='flex flex-1 flex-col justify-center px-6 mt-10 lg:px-8 rounded-md shadow-lg relative z-10 '>
            <div
                style={{
                    width: '50%',
                    margin: '0 auto',
                    borderRadius: '10%',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    backgroundImage:
                        "url('https://res.cloudinary.com/difmqasye/image/upload/v1710874415/samples/da/unnamed_qe3fnu.jpg')"
                }}
            >
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white'>
                        Đăng nhập với MeowDelights
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='mainpage'>
                    <form className='space-y-6' action='#' method='POST' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                Email
                            </label>
                            <div className='mt-2'>
                                <input
                                    placeholder='Email'
                                    id='email'
                                    type='email'
                                    {...register('email')}
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-2'>
                                <label htmlFor='' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                </label>
                                <input
                                    placeholder='Password'
                                    {...register('password')}
                                    type='password'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Đăng nhập
                            </button>
                        </div>

                        {/* <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='bi bi-google pt-1'
                                    viewBox='0 0 16 16'
                                >
                                    <path d='M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z' />
                                </svg>
                                <p className='pl-2'>Đăng nhập với Google </p>
                            </button>
                        </div> */}
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500 pb-4'>
                        Not a member?{' '}
                        <Link to='/signup' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                            Registered
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SigninPage
