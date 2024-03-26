import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SheetClose, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { setEmployeeCode } from '@/services/auth'

import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const EditRoleAuth = ({ id }: any) => {
    const navigate = useNavigate()
    const { data } = useAuthQuery(id)
    console.log(data)
    const { onSubmit } = useAuthMutation({
        action: 'UPDATEROLE'
        // onSuccess: () => {
        //     toast({
        //         variant: 'success',
        //         title: 'Cập nhật thành công!!',
        //         description: 'Cập nhật quyền tài khoản thành công!'
        //     })
        //     navigate('/admin/user')
        // }
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
            setValue('role', data.datas.role)
            setValue('jobPosition', data.datas.jobPosition)
            setValue('employee', data.datas.employee)
        }
    }, [data, setValue])
    const handleRoleChange = (selectedRole: any) => {
        let newPosition = ''

        // Xác định vị trí công việc dựa trên vai trò được chọn
        switch (selectedRole) {
            case 'adminProduct':
                newPosition = 'Quản lí sản phẩm'
                break
            case 'adminVoucher':
                newPosition = 'Quản lí Voucher'
                break
            case 'adminOrder':
                newPosition = 'Quản lí hóa đơn'
                break
            case 'adminContact':
                newPosition = 'Quản lí liên hệ'
                break
            case 'adminMember':
                newPosition = 'Quản lí tài khoản người dùng'
                break
            case 'adminComment':
                newPosition = 'Quản lí bình luận, đánh giá'
                break
            case 'adminWeb':
                newPosition = 'Quản lí cấp cao'
                break
            default:
                newPosition = ''
                break
        }

        // Cập nhật giá trị của trường vị trí công việc
        setValue('jobPosition', newPosition)
    }

    const onHandleSubmit = (data: any) => {
        const updatedUserRole = {
            ...data,
            _id: id,
            // name: data.name,
            // email: data.email,
            employee: mdValue,
            role: data.role,
            jobPosition: data.jobPosition
        }
        console.log('🚀 ~ onHandleSubmit ~ updatedCategory:', updatedUserRole)
        onSubmit(updatedUserRole)
        // await setEmployeeCode(updatedUserRole)
    }

    return (
        <>
            <SheetContent className=''>
                {/* <p className='px-20 text-xl text-sky-400'>Cập nhật vai trò </p> */}
                <div className='bg-slate-50  rounded-lg py-10 px-3'>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='flex flex-col gap-3 w-56 pb-3'>
                            <p className='font-medium text-base '>Mã nhân viên</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md'
                                id='employee'
                                value={mdValue}
                                {...register('employee')}
                                readOnly
                            />
                        </div>
                        <div className=' '>
                            <p className='font-medium text-base '>Vai trò</p>
                            <select
                                className='border-spacing-1 border-blue-400 border-gray-200 pl-3'
                                id='role'
                                style={{ borderRadius: '8px', height: '42px' }}
                                placeholder='Mời chọn vai trò'
                                {...register('role', { required: true })}
                                onChange={(e) => handleRoleChange(e.target.value)}
                            >
                                <option value='member'>Khách hàng </option>
                                <option value='adminProduct'>Nhân viên quản lí sản phẩm </option>
                                <option value='adminVoucher'>Nhân viên quản lí Voucher </option>
                                <option value='adminOrder'>Nhân viên quản lí hóa đơn </option>
                                <option value='adminContact'>Nhân viên quản lí liên hệ </option>
                                <option value='adminMember'>Nhân viên quản lí tài khoản người dùng </option>
                                <option value='adminComment'>Nhân viên quản lí bình luận, đánh giá </option>
                                <option value='adminWeb'> Quản lí cấp cao</option>
                            </select>
                            {errors.role && errors.role.type === 'required' && (
                                <p className='text-red-500'>Chọn vai trò là bắt buộc là bắt buộc.</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-3 w-56 pb-3'>
                            <p className='font-medium text-base '>Vị trí công việc</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md'
                                id='jobPosition'
                                // value={mdValue}
                                {...register('jobPosition')}
                                // readOnly
                            />
                        </div>

                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type='submit'>Cập nhật</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </div>
            </SheetContent>
        </>
    )
}

export default EditRoleAuth
