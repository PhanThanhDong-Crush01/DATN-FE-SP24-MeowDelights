import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const AddAuth = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('') // State để lưu trữ giá trị mật khẩu
    const [confirmPassword, setConfirmPassword] = useState('') // State để lưu trữ giá trị nhập lại mật khẩu
    const { onSubmit } = useAuthMutation({
        action: 'ADD',
        onSuccess: (data) => {
            localStorage.setItem('auth', JSON.stringify(data))
            toast({
                variant: 'success',
                title: 'Thêm thành công',
                description: 'Thêm tài khoản nhân viên thành công'
            })
            localStorage.setItem('authID', data?.user?._id)

            navigate(`/admin/auth`)
        }
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    const onHandleSubmit = (data: any) => {
        if (!data.email.endsWith('@gmail.com')) {
            toast({
                variant: 'destructive',
                title: 'Lỗi',
                description: 'Email phải có định dạng @gmail.com'
            })
            return
        }
        if (password !== confirmPassword) {
            // Nếu mật khẩu và nhập lại mật khẩu không giống nhau, hiển thị thông báo lỗi
            toast({
                variant: 'destructive',
                title: 'Lỗi',
                description: 'Mật khẩu và nhập lại mật khẩu không khớp nhau!'
            })
            return
        }
        // Xử lý dữ liệu khi form được submit
        onSubmit(data)
    }
    return (
        <>
            <div className='px-64 w-auto mb-4 pt-3  '>
                <form
                    onSubmit={handleSubmit(onHandleSubmit)}
                    className='flex flex-col gap-6 bg-gray-50 p-5'
                    style={{ borderRadius: '8px' }}
                >
                    <div>
                        <p className='font-medium text-base pb-2'>Họ và tên</p>
                        <Input
                            className='border-spacing-1 border-gray-200 pl-2 '
                            style={{ borderRadius: '8px', height: '40px' }}
                            type='text'
                            id='name'
                            {...register('name', { required: true, minLength: 3, maxLength: 50 })}
                            onChange={(e) => setValue('name', e.target.value)}
                            placeholder='Mời điều đầy đủ họ tên'
                        />
                        {errors.name && <p className='text-red-500'>Họ và tên là bắt buộc.</p>}
                        {errors.name && errors.name.type === 'minLength' && (
                            <p className='text-red-500'>Họ và tên phải có ít nhất 7 kí tự.</p>
                        )}
                        {errors.name && errors.name.type === 'maxLength' && (
                            <p className='text-red-500'>Họ và tên không được vượt quá 50 kí tự.</p>
                        )}
                    </div>
                    <div>
                        <p className='font-medium text-base pb-2'>Email</p>
                        <Input
                            className='border-spacing-1 border-gray-200 rounded-md '
                            type='email'
                            id='email'
                            style={{ borderRadius: '8px', height: '40px' }}
                            placeholder='Mời điền email'
                            {...register('email', { required: true })}
                            onChange={(e) => setValue('email', e.target.value)}
                        />
                        {errors.email && errors.email.type === 'required' && (
                            <p className='text-red-500'>Email là bắt buộc.</p>
                        )}
                    </div>
                    <div>
                        <p className='font-medium text-base pb-2'>Mật khẩu</p>
                        <Input
                            autoComplete='new-password'
                            className='border-spacing-1 border-gray-200   pl-3 mb-1'
                            type='password'
                            style={{ borderRadius: '8px', height: '40px' }}
                            id='password'
                            placeholder='Mời nhập mật khẩu'
                            {...register('password', { required: true, minLength: 6 })}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setValue('password', e.target.value)
                            }}
                        />
                        {errors.password && errors.password.type === 'required' && (
                            <p className='text-red-500'>Mật khẩu là bắt buộc.</p>
                        )}
                        {errors.password && errors.password.type === 'minLength' && (
                            <p className='text-red-500'>Kí tự lớn hơn hoặc bằng 6.</p>
                        )}
                    </div>

                    <div>
                        <p className='font-medium text-base pb-2'>Nhập lại mật khẩu</p>
                        <Input
                            autoComplete='new-password'
                            className='border-spacing-1 border-gray-200  rounded-md h-14'
                            type='password'
                            style={{ borderRadius: '8px', height: '40px' }}
                            placeholder='Mời xác nhận lại mật khẩu'
                            id='confirmPassword'
                            {...register('confirmPassword', { required: true })}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setValue('confirmPassword', e.target.value)
                            }}
                        />
                        {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                            <p className='text-red-500'>Mời nhập lại mật khẩu.</p>
                        )}
                    </div>

                    <div className='flex justify-end'>
                        <Button type='submit' className='bg-blue-500 px-4 py-1 rounded mr-2'>
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddAuth
