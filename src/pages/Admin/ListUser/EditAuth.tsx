import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const EditAuth = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)
    const { data } = useAuthQuery(id)
    const [password, setPassword] = useState('') // State để lưu trữ giá trị mật khẩu
    const [confirmPassword, setConfirmPassword] = useState('') // State để lưu trữ giá trị nhập lại mật khẩu
    console.log(data)

    const { onSubmit } = useAuthMutation({
        action: 'UPDATEAUTH',
        onSuccess: () => {
            navigate('/admin/user')
        }
    })
    const [iduser, setIdUser] = useState('') // State lưu trữ id user
    const [mdValue, setMdValue] = useState('') // State để lưu giá trị chuỗi MD5

    useEffect(() => {
        // Giả sử id user đã được lấy từ dữ liệu của người dùng
        const userIdFromData = data?.datas?._id // Ví dụ: id user là '12345'
        setIdUser(userIdFromData)
    }, []) // useEffect chỉ chạy một lần sau khi render

    useEffect(() => {
        // Kiểm tra xem userId có giá trị không trước khi tạo chuỗi MD5
        if (iduser) {
            const md5String = `MD${iduser.slice(-5)}` // Tạo chuỗi MD5 với "MD" và 5 số cuối của userId
            setMdValue(md5String) // Cập nhật giá trị của trường input
        }
    }, [iduser])
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()
    useEffect(() => {
        if (data) {
            setValue('name', data.datas.name)
            setValue('email', data.datas.email)
            setValue('phone', data.datas.phone)
            setValue('imgUser', data.datas.imgUser)
            setValue('address', data.datas.address)
            setValue('age', data.datas.age)
            setValue('role', data.datas.role)
            setValue('gender', data.datas.gender)
            setValue('jobPosition', data.datas.jobPosition)
            setValue('employee', data.datas.employee)
        }
    }, [data, setValue])

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
        const updatedUserRole = {
            ...data,
            _id: id,
            name: data.name,
            email: data.email,
            age: data.age,
            imgUser: data.imgUser,
            phone: data.phone,
            address: data.address,
            role: data.role,
            gender: data.gender,
            jobPosition: data.jobPosition,
            employee: mdValue
        }
        console.log('🚀 ~ onHandleSubmit ~ updatedCategory:', updatedUserRole)
        onSubmit(updatedUserRole)
    }

    return (
        <>
            <div className='px-40 w-auto pt-5 bg-white'>
                {/* <p className='px-20 text-xl text-sky-400'>Cập nhật </p> */}
                <div className='bg-slate-50 px-20 rounded-lg py-5'>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Tên tài khoản</p>
                                <Input
                                    style={{ borderStyle: 'dotted' }}
                                    className='border-spacing-1 border-gray-200  mb-4'
                                    id='name'
                                    placeholder='Tên tài khoản'
                                    {...register('name')}
                                />
                            </div>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Email</p>
                                <Input
                                    className='border-spacing-1 border-blue-400 border-gray-200  mb-4'
                                    id='decrease'
                                    placeholder='Email'
                                    {...register('email')}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base'>Mật khẩu</p>
                                <Input
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

                            <div className='flex flex-col gap-3 w-56 mb-4'>
                                <p className='font-medium text-base'>Nhập lại mật khẩu</p>
                                <Input
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
                        </div>
                        <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3 w-56 mb-4'>
                                <p className='font-medium text-base '>Tuổi</p>
                                <Input
                                    style={{ borderStyle: 'dotted' }}
                                    className='border-spacing-1 border-gray-200'
                                    id='age'
                                    placeholder='Mời điền tuổi'
                                    {...register('age', { required: true, min: 16 })}
                                />
                                {errors.age && errors.age.type === 'required' && (
                                    <p className='text-red-500'>Tuổi là bắt buộc.</p>
                                )}
                                {errors.age && errors.age.type === 'min' && (
                                    <p className='text-red-500'>Tuổi phải lớn hơn 16</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Hình ảnh cá nhân</p>
                                <Input
                                    className='border-spacing-1 border-blue-400 border-gray-200'
                                    id='imgUser'
                                    placeholder='Mời tải hình ảnh'
                                    {...register('imgUser', { required: true })}
                                />
                                {errors.imgUser && errors.imgUser.type === 'required' && (
                                    <p className='text-red-500'>Tải hình ảnh là bắt buộc.</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-row gap-20 mb-4'>
                            <div className='flex flex-col gap-3  '>
                                <p className='font-medium text-base '>Số điện thoại</p>
                                <Input
                                    className='border-spacing-1 border-gray-200'
                                    style={{
                                        borderStyle: 'dotted',
                                        width: '210px',
                                        borderRadius: '8px',
                                        height: '42px'
                                    }}
                                    id='phone'
                                    type='number'
                                    placeholder='Mời điền số điện thoại'
                                    {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
                                />
                                {errors.phone && errors.phone.type === 'required' && (
                                    <p className='text-red-500'>Điền số điện thoại là bắt buộc.</p>
                                )}

                                {errors.phone && errors.phone.type === 'minLength' && (
                                    <p className='text-red-500'>Không được nhỏ hơn 10 kí tự</p>
                                )}
                                {errors.phone && errors.phone.type === 'maxLength' && (
                                    <p className='text-red-500'>Lớn nhất 10 kí tự.</p>
                                )}
                            </div>{' '}
                            <div className='flex flex-col gap-3'>
                                <p className='font-medium text-base '>Giới tính</p>
                                <select
                                    className='border-spacing-1 border-blue-400 border-gray-200 pl-3'
                                    id='gender'
                                    style={{ width: '210px', borderRadius: '8px', height: '42px' }}
                                    placeholder='Mời chọn giới tính'
                                    {...register('gender', { required: true })}
                                >
                                    <option value='true'>Nữ</option>
                                    <option value='false'>Nam</option>
                                </select>
                                {errors.gender && errors.gender.type === 'required' && (
                                    <p className='text-red-500'>Chọn giới tính là bắt buộc.</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-row gap-20 mb-4'>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Địa chỉ</p>
                                <Input
                                    style={{ borderStyle: 'dotted' }}
                                    className='border-spacing-1 border-gray-200'
                                    id='address'
                                    placeholder='Mời điền địa chỉ'
                                    {...register('address', { required: true, minLength: 10, maxLength: 50 })}
                                />
                                {errors.address && errors.address.type === 'required' && (
                                    <p className='text-red-500'>Điền địa chỉ là bắt buộc.</p>
                                )}
                                {errors.address && errors.address.type === 'minLength' && (
                                    <p className='text-red-500'>Phải viết lớn hơn 10 kí tự</p>
                                )}
                                {errors.address && errors.address.type === 'maxLength' && (
                                    <p className='text-red-500'>Nhỏ hơn 50 kí tự</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Vai trò</p>
                                <select
                                    className='border-spacing-1 border-blue-400 border-gray-200 pl-3'
                                    id='role'
                                    style={{ borderRadius: '8px', height: '42px' }}
                                    placeholder='Mời chọn vai trò'
                                    {...register('role', { required: true })}
                                >
                                    <option value='member'>Khách hàng </option>
                                    <option value='adminProduct'>Nhân viên quản lí sản phẩm </option>
                                    <option value='adminVoucher'>Nhân viên quản lí Voucher </option>
                                    <option value='adminOrder'> Nhân viên quản lí hóa đơn </option>
                                    <option value='adminContact'> Nhân viên quản lí liên hệ </option>
                                    <option value='adminMember '>Nhân viên quản lí tài khoản người dùng </option>
                                    <option value='adminComment'>Nhân viên quản lí bình luận, đánh giá </option>
                                    <option value='adminWeb'> Quản lí cấp cao</option>
                                </select>
                                {errors.role && errors.role.type === 'required' && (
                                    <p className='text-red-500'>Chọn vai trò là bắt buộc là bắt buộc.</p>
                                )}
                            </div>
                        </div>
                        {/* <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Vị trí công việc</p>
                                <Input
                                    className='border-spacing-1 border-gray-200 rounded-md'
                                    id='jobPosition'
                                    placeholder='Vị trí công việc'
                                    {...register('jobPosition', { required: true })}
                                />
                                {errors.jobPosition && errors.jobPosition.type === 'required' && (
                                    <p className='text-red-500'>Điền địa chỉ là bắt buộc.</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-3 w-56'>
                                <p className='font-medium text-base '>Mã nhân viên</p>
                                <Input
                                    className='border-spacing-1 border-gray-200 rounded-md  mb-4'
                                    id='employee'
                                    value={mdValue}
                                    {...register('employee')}
                                />
                            </div>
                        </div> */}
                        <div className='flex justify-center pr-16'>
                            <Button type='submit'> Cập nhật</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditAuth
