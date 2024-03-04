import { toast } from '@/components/ui/use-toast'

import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'
import { Input, Select } from 'antd'

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EditVoucher = () => {
    const { id } = useParams()
    console.log(id)
    const { data } = useVoucherQuery(id)
    console.log(data)
    const { onSubmit } = useVoucherMutation({
        action: 'UPDATE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Danh mục khuyến mại thành công!'
            })
        }
    })
    const [voucherData, setVoucherData] = useState({
        name: data?.datas?.name || '',
        decrease: data?.datas?.decrease || '',
        expiry: data?.datas?.expiry || '',
        conditions: data?.datas?.conditions || '',
        idTypeVoucher: data?.datas?.idTypeVoucher || ''
    })

    // Hàm xử lý khi giá trị của Input thay đổi
    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setVoucherData({ ...voucherData, [name]: value })
    }

    // Hàm xử lý khi nhấn nút Cập nhật
    const handleEditVoucher = () => {
        onSubmit({
            _id: id, // Sử dụng id của voucher thay vì editedVoucherId
            ...voucherData // Truyền toàn bộ dữ liệu của voucher
        })
    }

    return (
        <>
            <div className='px-32 w-auto pt-5 bg-white'>
                {/* <p className='px-20 text-xl text-sky-400'>Cập nhật </p> */}
                <div className='bg-slate-50 px-20 rounded-lg py-5'>
                    <div className='flex flex-row gap-32'>
                        <div className='flex flex-col gap-3'>
                            <p className=''>Tên voucher</p>
                            <Input
                                onChange={handleInputChange}
                                style={{ borderStyle: 'dotted' }}
                                className='border-2 border-blue-400 border-gray-200 pl-5 mb-4'
                                type='text'
                                name='name'
                                placeholder='Tên voucher'
                                value={voucherData.name}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p>Giảm</p>
                            <Input
                                onChange={handleInputChange}
                                className='border-spacing-1 border-gray-200   pl-5 mb-4'
                                type='text'
                                name='decrease'
                                placeholder='Hết hạn'
                                value={voucherData.decrease}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-32'>
                        <div className='flex flex-col gap-3'>
                            <p>Ngày hết hạn</p>
                            <Input
                                onChange={handleInputChange}
                                className='border-spacing-1 border-gray-200  rounded-md pl-5 mb-4'
                                type='text'
                                placeholder='Ngày hết hạn'
                                name='expiry'
                                value={voucherData.expiry}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p>Điều kiện</p>
                            <Input
                                onChange={handleInputChange}
                                className='border-spacing-1 border-gray-200 rounded-md pl-5 mb-4'
                                type='text'
                                name='conditions'
                                placeholder='Điều kiện'
                                value={voucherData.conditions}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-32'>
                        <div className='flex flex-col gap-3'>
                            <p className=''>Loại mã</p>
                            <Input
                                onChange={handleInputChange}
                                className='border-spacing-1 border-gray-200 rounded-md pl-2 mb-4'
                                type='text'
                                name='idTypeVoucher'
                                placeholder='Loại voucher'
                                value={voucherData.idTypeVoucher}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <Link
                            to={'/admin/voucher'}
                            onClick={handleEditVoucher}
                            className='bg-blue-400 text-white px-4 py-1 rounded mr-2'
                        >
                            Cập nhật
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditVoucher
