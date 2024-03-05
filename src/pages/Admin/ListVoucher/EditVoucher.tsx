import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useTypeVoucherQuery } from '@/hooks/TypeVoucher/useTypeVoucherQuery'

import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditVoucher = () => {
    const navigate = useNavigate()
    // const { data } = useTypeVoucherQuery()
    // const typeVoucher = data?.datas
    // console.log(typeVoucher)
    const { id } = useParams()
    console.log(id)
    const { data } = useVoucherQuery(id)
    const voucher = data?.datas
    console.log(voucher)

    // console.log(data)
    const { onSubmit } = useVoucherMutation({
        action: 'UPDATE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Danh mục khuyến mại thành công!'
            })
            navigate('/admin/voucher')
        }
    })

    // Hàm xử lý khi giá trị của Input thay đổi
    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setVoucherData({ ...voucherData, [name]: value })
    }

    useEffect(() => {
        if (voucher) {
            setValue('name', voucher.name)
            setValue('quantity', voucher.quantity)
            setValue('decrease', voucher.decrease)
            setValue('expiry', voucher.expiry)
            setValue('idTypeVoucher', voucher.idTypeVoucher)
            setValue('conditions', voucher.conditions)
        }
    }, [voucher, setValue])

    const onHandleSubmit = (data: any) => {
        const updatedVoucher = {
            ...voucher,
            name: data.name,
            quantity: data.quantity,
            decrease: data.decrease,
            expiry: data.expiry,
            idTypeVoucher: data.idTypeVoucher,
            conditions: data.conditions
        }
        console.log('🚀 ~ onHandleSubmit ~ updatedCategory:', updatedVoucher)
        onSubmit(updatedVoucher)
    }

    return (
        <>
            <div className='px-32 w-auto pt-5 bg-white'>
                {/* <p className='px-20 text-xl text-sky-400'>Cập nhật </p> */}
                <div className='bg-slate-50 px-20 rounded-lg py-5'>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3'>
                                <p className=''>Tên voucher</p>
                                <Input
                                    style={{ borderStyle: 'dotted' }}
                                    className='border-spacing-1 border-gray-200 pl-5 mb-4'
                                    id='name'
                                    placeholder='Tên voucher'
                                    {...register('name')}
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <p>Giảm</p>
                                <Input
                                    className='border-spacing-1 border-blue-400 border-gray-200 pl-5 mb-4'
                                    id='decrease'
                                    placeholder='Gỉam'
                                    {...register('decrease')}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3 mr-12'>
                                <p>Ngày hết hạn</p>
                                <Input
                                    className='border-spacing-1 border-gray-200 rounded-md w-40'
                                    style={{ height: '40' }}
                                    placeholder='Ngày hết hạn'
                                    type='date'
                                    id='expiry'
                                    {...register('expiry', { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ })}
                                />
                            </div>
                            <div className='flex flex-col gap-3 ml-4'>
                                <p>Điều kiện</p>
                                <Input
                                    className='border-spacing-1 border-gray-200 rounded-md  mb-4'
                                    id='conditions'
                                    placeholder='Điều kiện'
                                    {...register('conditions')}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-20'>
                            <div className='flex flex-col gap-3'>
                                <p className=''>Số lượng</p>
                                <Input
                                    className='border-spacing-1 border-gray-200 rounded-md  mb-4'
                                    id='quantity'
                                    placeholder='Số lượng'
                                    {...register('quantity')}
                                />
                            </div>
                            <div className='flex flex-col gap-3 pl-10'>
                                <p className=''>Loại voucher</p>
                                <Input
                                    className='border-spacing-1 border-gray-200 rounded-md  mb-4'
                                    id='idTypeVoucher'
                                    placeholder='Loại voucher'
                                    {...register('idTypeVoucher')}
                                />
                                {/* <select
                                    className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-4'
                                    id='idTypeVoucher'
                                    {...register('idTypeVoucher', )}
                                    // onChange={(e) => setValue('idTypeVoucher', e.target.value)}
                                    onChange={(e) => {
                                        const selectedIndex = e.target.selectedIndex
                                        setValue('idTypeVoucher', e.target.options[selectedIndex].value)
                                    }}
                                >
                                    <option id='idTypeVoucher' value=''></option>
                                    {typeVoucher?.map((item: any, index: any) => (
                                        <option key={index} value={item?._id}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </select> */}
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {/* <Link to={'/admin/voucher'} className='bg-blue-400 text-white px-4 py-1 rounded mr-2'> */}
                            <Button type='submit'> Cập nhật</Button>
                            {/* </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditVoucher
