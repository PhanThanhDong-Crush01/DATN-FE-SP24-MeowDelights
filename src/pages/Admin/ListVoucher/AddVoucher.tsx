import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTypeVoucherQuery } from '@/hooks/TypeVoucher/useTypeVoucherQuery'
import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddVoucher = () => {
    const navigate = useNavigate()
    const { dataTVC } = useTypeVoucherQuery()
    const typeVoucher = dataTVC?.datas
    const { onSubmit } = useVoucherMutation({
        action: 'ADD',
        onSuccess: () => {
            navigate('/admin/voucher')
        }
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()
    const [currentDate] = useState(new Date())

    const [selectTypeVc, setSelectTypeVc] = useState<any>()

    const onHandleSubmit = (data: any) => {
        const dataNew = {
            name: data.name,
            status: true,
            quantity: data.quantity,
            decrease: data.decrease,
            startDate: data.startDate,
            expiry: data.expiry,
            conditions: data.conditions,
            idTypeVoucher: data.idTypeVoucher,
            minTotalBill1: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.minTotalBill1,
            quantity1: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.quantity1,
            minTotalBill2: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.minTotalBill2,
            quantity2: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.quantity2,
            minTotalBill3: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.minTotalBill3,
            quantity3: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.quantity3,
            minTotalBill4: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.minTotalBill4,
            quantity4: selectTypeVc === '65ba03f7cb1e0ffc78158c55' ? 100 : data.quantity4
        }
        onSubmit(dataNew)
    }
    return (
        <>
            <div className='px-7 w-auto mb-4'>
                <form onSubmit={handleSubmit(onHandleSubmit)} className=''>
                    <h1 style={{ fontSize: '20px', marginTop: '20px' }}>Thêm voucher</h1>

                    <div className='flex flex-row gap-5  mt-2'>
                        <div>
                            <p>Tên voucher</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-2 -mr-4 mb-1'
                                type='text'
                                id='name'
                                style={{ border: '1px solid gray' }}
                                {...register('name', { required: true, minLength: 3, maxLength: 50 })}
                                onChange={(e) => setValue('name', e.target.value)}
                                placeholder='Mã voucher'
                            />
                            {errors.name && <p className='text-red-500'>Tên voucher là bắt buộc.</p>}
                            {errors.name && errors.name.type === 'minLength' && (
                                <p className='text-red-500'>Tên voucher phải có ít nhất 3 kí tự.</p>
                            )}
                            {errors.name && errors.name.type === 'maxLength' && (
                                <p className='text-red-500'>Tên voucher không được vượt quá 50 kí tự.</p>
                            )}
                        </div>
                        <div>
                            <p>Giảm</p>
                            <Input
                                className='border-spacing-1 border-gray-200 pl-3 mb-1'
                                type='number'
                                id='decrease'
                                defaultValue={1000}
                                style={{ border: '1px solid gray' }}
                                {...register('decrease', { required: true, min: 1000 })}
                                onChange={(e) => setValue('decrease', e.target.value)}
                            />
                            {errors.decrease && errors.decrease.type === 'required' && (
                                <p className='text-red-500'>Giảm là bắt buộc.</p>
                            )}
                            {errors.decrease && errors.decrease.type === 'min' && (
                                <p className='text-red-500'>Giảm phải lớn hơn hoặc bằng 1000.</p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row gap-5  mt-2'>
                        <div>
                            <p>Ngày bắt đầu</p>
                            <input
                                className='border-spacing-1 border-gray-200 pl-2 rounded-md h-14  mb-1 -mr-0'
                                type='date'
                                style={{ border: '1px solid gray', width: '185px' }}
                                placeholder='Ngày hết hạn'
                                id='startDate'
                                {...register('startDate', {
                                    required: 'Ngày bắt đầu là bắt buộc',
                                    pattern: {
                                        value: /^\d{4}-\d{2}-\d{2}$/,
                                        message: 'Vui lòng nhập ngày hợp lệ (YYYY-MM-DD)'
                                    },
                                    validate: {
                                        futureDate: (value) =>
                                            new Date(value) > currentDate ||
                                            'Ngày bắt đầu phải là ngày hiện tại hoặc sau ngày hiện tại',
                                        maxDate: (value) =>
                                            new Date(value) <=
                                                new Date(currentDate.getTime() + 90 * 24 * 60 * 60 * 1000) ||
                                            'Ngày bắt đầu không thể sau 3 tháng'
                                    }
                                })}
                                onChange={(e) => setValue('startDate', e.target.value)}
                            />
                            {errors.startDate && (
                                <p className='text-red-500'>
                                    {typeof errors.startDate === 'string' ? errors.startDate : errors.startDate.message}
                                </p>
                            )}{' '}
                        </div>
                        <div>
                            <p>Ngày hết hạn</p>
                            <input
                                className='border-spacing-1 border-gray-200 pl-2 rounded-md h-14  mb-1 -mr-0'
                                type='date'
                                style={{ border: '1px solid gray', width: '200px' }}
                                placeholder='Ngày hết hạn'
                                id='expiry'
                                {...register('expiry', {
                                    required: 'Ngày hết hạn là bắt buộc',
                                    pattern: {
                                        value: /^\d{4}-\d{2}-\d{2}$/,
                                        message: 'Vui lòng nhập ngày hợp lệ (YYYY-MM-DD)'
                                    },
                                    validate: {
                                        startDateAfterEndDate: (value, { startDate }) =>
                                            new Date(value) >= new Date(startDate) ||
                                            'Ngày hết hạn không thể trước ngày bắt đầu'
                                    }
                                })}
                                onChange={(e) => setValue('expiry', e.target.value)}
                            />
                            {errors.expiry && <p className='text-red-500'>{errors.expiry.message}</p>}
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 mt-2'>
                        <div>
                            <p>Số lượng</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-1'
                                type='number'
                                id='quantity'
                                defaultValue={1}
                                style={{ width: '185px', border: '1px solid gray' }}
                                {...register('quantity', { required: true, min: 1 })}
                                onChange={(e) => setValue('quantity', e.target.value)}
                            />
                            {errors.quantity && errors.quantity.type === 'required' && (
                                <p className='text-red-500'>Giảm là bắt buộc.</p>
                            )}
                            {errors.quantity && errors.quantity.type === 'min' && (
                                <p className='text-red-500'>Giảm phải lớn hơn hoặc bằng 1 .</p>
                            )}
                        </div>
                        <div>
                            <p>Điều kiện</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-1'
                                type='number'
                                id='conditions'
                                style={{ border: '1px solid gray' }}
                                placeholder='Hóa đơn tối thiểu'
                                {...register('conditions', { required: true, min: 1 })}
                                onChange={(e) => setValue('conditions', e.target.value)}
                            />
                            {errors.conditions && errors.conditions.type === 'required' && (
                                <p className='text-red-500'>Giảm là bắt buộc.</p>
                            )}
                            {errors.conditions && errors.conditions.type === 'min' && (
                                <p className='text-red-500'>Giảm phải lớn hơn hoặc bằng 1.</p>
                            )}
                        </div>
                    </div>
                    <div className=' mt-2'>
                        <div>
                            <p>Loại mã</p>
                            <select
                                className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-1'
                                id='typeVoucher'
                                {...register('idTypeVoucher', { required: true })}
                                // onChange={(e) => setValue('idTypeVoucher', e.target.value)}
                                onChange={(e) => {
                                    const selectedIndex = e.target.selectedIndex
                                    setValue('idTypeVoucher', e.target.options[selectedIndex].value),
                                        setSelectTypeVc(e.target.options[selectedIndex].value)
                                }}
                                style={{ width: '100%' }}
                            >
                                <option value=''>Chọn loại voucher</option>
                                {typeVoucher?.map((item: any, index: any) => (
                                    <option key={index} value={item?._id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                            {errors.idTypeVoucher && <p className='text-red-500'>Loại voucher là bắt buộc.</p>}
                        </div>
                    </div>
                    {selectTypeVc != '65ba03f7cb1e0ffc78158c55' && (
                        <div className='themPhanPhatVoucher'>
                            <h1 style={{ fontSize: '20px', marginTop: '20px' }}>Phân phát voucher cho người dùng</h1>
                            <i className='text-danger'>
                                minTotalBill là tổng tiền tất cả hóa đơn của người dùng nhỏ nhất để nhận số lượt sử dụng
                                voucher tương ứng
                            </i>
                            <div className='flex flex-row gap-5' style={{ marginTop: '20px' }}>
                                <div>
                                    <Label>Tổng tiền hóa đơn </Label>
                                    <Input
                                        className='border-spacing-1 border-gray-200 rounded-md pl-2 -mr-4 mb-1'
                                        type='number'
                                        id='name'
                                        {...register('minTotalBill1', { required: true, min: 100000 })}
                                        onChange={(e) => setValue('minTotalBill1', e.target.value)}
                                        defaultValue={100000}
                                    />
                                    {errors.minTotalBill1 && (
                                        <p className='text-red-500'>minTotalBill 1 là bắt buộc.</p>
                                    )}
                                    {errors.minTotalBill1 && errors.minTotalBill1.type === 'min' && (
                                        <p className='text-red-500'>minTotalBill 1 lớn hơn 100000 VNĐ</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Số lượt dùng nhận được</Label>
                                    <Input
                                        className='border-spacing-1 border-gray-200 pl-3 mb-1'
                                        type='number'
                                        id='quantity1'
                                        placeholder='1'
                                        {...register('quantity1', { required: true, min: 1 })}
                                        onChange={(e) => setValue('quantity1', e.target.value)}
                                    />
                                    {errors.quantity1 && errors.quantity1.type === 'required' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được bắt buộc không để trống.</p>
                                    )}
                                    {errors.quantity1 && errors.quantity1.type === 'min' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được phải lớn hơn hoặc bằng 0.</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-row gap-5' style={{ marginTop: '20px' }}>
                                <div>
                                    <Input
                                        className='border-spacing-1 border-gray-200 rounded-md pl-2 -mr-4 mb-1'
                                        type='number'
                                        id='name'
                                        {...register('minTotalBill2', { required: true, min: 100000 })}
                                        onChange={(e) => setValue('minTotalBill2', e.target.value)}
                                        defaultValue={400000}
                                    />
                                    {errors.minTotalBill2 && (
                                        <p className='text-red-500'>minTotalBill 2 là bắt buộc.</p>
                                    )}
                                    {errors.minTotalBill2 && errors.minTotalBill2.type === 'min' && (
                                        <p className='text-red-500'>minTotalBill 2 lớn hơn 100000 VNĐ</p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        className='border-spacing-1 border-gray-200 pl-3 mb-1'
                                        type='number'
                                        id='quantity2'
                                        placeholder='2'
                                        {...register('quantity2', { required: true, min: 1 })}
                                        onChange={(e) => setValue('quantity2', e.target.value)}
                                    />
                                    {errors.quantity2 && errors.quantity2.type === 'required' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được bắt buộc không để trống.</p>
                                    )}
                                    {errors.quantity2 && errors.quantity2.type === 'min' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được phải lớn hơn hoặc bằng 0.</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-row gap-5' style={{ marginTop: '20px' }}>
                                <div>
                                    <Input
                                        className='border-spacing-1 border-gray-200 rounded-md pl-2 -mr-4 mb-1'
                                        type='number'
                                        id='name'
                                        {...register('minTotalBill3', { required: true, min: 100000 })}
                                        onChange={(e) => setValue('minTotalBill3', e.target.value)}
                                        defaultValue={800000}
                                    />
                                    {errors.minTotalBill3 && (
                                        <p className='text-red-500'>minTotalBill 3 là bắt buộc.</p>
                                    )}
                                    {errors.minTotalBill3 && errors.minTotalBill3.type === 'min' && (
                                        <p className='text-red-500'>minTotalBill 3 lớn hơn 100000 VNĐ</p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        className='border-spacing-1 border-gray-200 pl-3 mb-1'
                                        type='number'
                                        id='quantity2'
                                        placeholder='3'
                                        {...register('quantity3', { required: true, min: 1 })}
                                        onChange={(e) => setValue('quantity3', e.target.value)}
                                    />
                                    {errors.quantity3 && errors.quantity3.type === 'required' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được bắt buộc không để trống.</p>
                                    )}
                                    {errors.quantity3 && errors.quantity3.type === 'min' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được phải lớn hơn hoặc bằng 0.</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-row gap-5' style={{ marginTop: '20px' }}>
                                <div>
                                    <Input
                                        className='border-spacing-1 border-gray-200 rounded-md pl-2 -mr-4 mb-1'
                                        type='number'
                                        id='name'
                                        {...register('minTotalBill4', { required: true, min: 100000 })}
                                        onChange={(e) => setValue('minTotalBill4', e.target.value)}
                                        defaultValue={1200000}
                                    />
                                    {errors.minTotalBill4 && (
                                        <p className='text-red-500'>minTotalBill 4 là bắt buộc.</p>
                                    )}
                                    {errors.minTotalBill4 && errors.minTotalBill4.type === 'min' && (
                                        <p className='text-red-500'>minTotalBill 4 lớn hơn 100000 VNĐ</p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        className='border-spacing-1 border-gray-200 pl-3 mb-1'
                                        type='number'
                                        id='quantity2'
                                        placeholder='4'
                                        {...register('quantity4', { required: true, min: 1 })}
                                        onChange={(e) => setValue('quantity4', e.target.value)}
                                    />
                                    {errors.quantity4 && errors.quantity4.type === 'required' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được bắt buộc không để trống.</p>
                                    )}
                                    {errors.quantity4 && errors.quantity4.type === 'min' && (
                                        <p className='text-red-500'>Số lượt dùng nhận được phải lớn hơn hoặc bằng 0.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='flex justify-end mt-5'>
                        <Button type='submit' className='bg-blue-500 px-4 py-1 rounded mr-2'>
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddVoucher
