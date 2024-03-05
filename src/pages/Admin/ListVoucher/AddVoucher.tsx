import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useTypeVoucherQuery } from '@/hooks/TypeVoucher/useTypeVoucherQuery'
import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const AddVoucher = () => {
    const navigate = useNavigate()
    const { data } = useTypeVoucherQuery()
    const typeVoucher = data?.datas
    console.log(typeVoucher)
    const { onSubmit } = useVoucherMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Thêm thành công!!',
                description: 'Thêm danh mục khuyến mại thành công!'
            })
            navigate('/admin')
        }
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    const onHandleSubmit = (data: any) => {
        // Xử lý dữ liệu khi form được submit
        onSubmit(data)
    }
    return (
        <>
            <div className='px-7 w-auto mb-4'>
                <form onSubmit={handleSubmit(onHandleSubmit)} className=''>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <p>Tên voucher</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-2 -mr-4 mb-1'
                                type='text'
                                id='name'
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
                                className='border-spacing-1 border-gray-200   pl-3 mb-1'
                                type='number'
                                id='decrease'
                                placeholder='giam'
                                {...register('decrease', { required: true, min: 1 })}
                                onChange={(e) => setValue('decrease', e.target.value)}
                            />
                            {errors.decrease && errors.decrease.type === 'required' && (
                                <p className='text-red-500'>Giảm là bắt buộc.</p>
                            )}
                            {errors.decrease && errors.decrease.type === 'min' && (
                                <p className='text-red-500'>Giảm phải lớn hơn hoặc bằng 0.</p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <p>Ngày hết hạn</p>
                            <Input
                                className='border-spacing-1 border-gray-200  rounded-md h-14 pl-5  mb-1 -mr-0'
                                type='date'
                                placeholder='Ngày hết hạn'
                                id='expiry'
                                {...register('expiry', { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ })}
                                onChange={(e) => setValue('expiry', e.target.value)}
                            />
                            {errors.expiry && errors.expiry.type === 'required' && (
                                <p className='text-red-500'>Ngày hết hạn là bắt buộc.</p>
                            )}
                            {errors.expiry && errors.expiry.type === 'pattern' && (
                                <p className='text-red-500'>Vui lòng nhập ngày hợp lệ (YYYY-MM-DD).</p>
                            )}
                        </div>
                        <div>
                            <p>Điều kiện</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-1'
                                type='number'
                                id='conditions'
                                placeholder='Điều kiện'
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
                    <div className='flex flex-row gap-5'>
                        <div>
                            <p>Số lượng</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-5  mb-1 '
                                type='number'
                                id='quantity'
                                placeholder='Số lượng'
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
                            <p>Loại mã</p>
                            <select
                                className='border-spacing-1 border-gray-200 rounded-md pl-1 mb-1 -mr-5'
                                id='typeVoucher'
                                {...register('idTypeVoucher', { required: true })}
                                // onChange={(e) => setValue('idTypeVoucher', e.target.value)}
                                onChange={(e) => {
                                    const selectedIndex = e.target.selectedIndex
                                    setValue('idTypeVoucher', e.target.options[selectedIndex].value)
                                }}
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
