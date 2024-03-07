import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useTypeVoucherQuery } from '@/hooks/TypeVoucher/useTypeVoucherQuery'
import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const AddVoucher = () => {
    const navigate = useNavigate()
    const { data } = useTypeVoucherQuery()
    const typeVoucher = data?.datas
    const { onSubmit } = useVoucherMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Thêm thành công!!',
                description: 'Thêm danh mục khuyến mại thành công!'
            })
            navigate('/admin/voucher')
        }
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    const onHandleSubmit = (data: any) => {
        const dataNew = {
            voucher: {
                name: data.name,
                status: true,
                quantity: data.quantity,
                decrease: data.decrease,
                expiry: data.expiry,
                conditions: data.conditions,
                idTypeVoucher: data.idTypeVoucher
            },
            phanPhatVoucher: [
                { minTotalBil: data.minTotalBill1, quantity: data.quantity1 },
                { minTotalBil: data.minTotalBill2, quantity: data.quantity2 },
                { minTotalBil: data.minTotalBill3, quantity: data.quantity3 },
                { minTotalBil: data.minTotalBill4, quantity: data.quantity4 }
            ]
        }
        console.log('🚀 ~ onHandleSubmit ~ dataNew:', dataNew)
        onSubmit(dataNew)
    }
    return (
        <>
            <div className='px-7 w-auto mb-4'>
                <form onSubmit={handleSubmit(onHandleSubmit)} className=''>
                    <h1 style={{ fontSize: '20px', marginTop: '20px' }}>Thêm voucher</h1>

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
                                className='border-spacing-1 border-gray-200 pl-3 mb-1'
                                type='number'
                                id='decrease'
                                placeholder='Giảm'
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
                    <div className='flex flex-row gap-5'>
                        <div>
                            <p>Số lượng</p>
                            <Input
                                className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-1'
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
                                className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-1'
                                id='typeVoucher'
                                {...register('idTypeVoucher', { required: true })}
                                // onChange={(e) => setValue('idTypeVoucher', e.target.value)}
                                onChange={(e) => {
                                    const selectedIndex = e.target.selectedIndex
                                    setValue('idTypeVoucher', e.target.options[selectedIndex].value)
                                }}
                                style={{ width: '270px' }}
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
                                    placeholder='> 100000 VNĐ'
                                />
                                {errors.minTotalBill1 && <p className='text-red-500'>minTotalBill 1 là bắt buộc.</p>}
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
                                    placeholder='> 300000 VNĐ'
                                />
                                {errors.minTotalBill2 && <p className='text-red-500'>minTotalBill 2 là bắt buộc.</p>}
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
                                    placeholder='> 500000 VNĐ'
                                />
                                {errors.minTotalBill3 && <p className='text-red-500'>minTotalBill 3 là bắt buộc.</p>}
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
                                    placeholder='> 800000 VNĐ'
                                />
                                {errors.minTotalBill4 && <p className='text-red-500'>minTotalBill 4 là bắt buộc.</p>}
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
