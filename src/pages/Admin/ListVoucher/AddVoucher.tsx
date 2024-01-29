import { toast } from '@/components/ui/use-toast'

import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { Input, Select } from 'antd'

import React, { useState } from 'react'

const AddVoucher = () => {
    const { onSubmit } = useVoucherMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Thêm thành công!!',
                description: 'Thêm danh mục khuyến mại thành công!'
            })
        }
    })

    const [newStatus, setNewStatus] = useState(true)
    const [newDecrease, setNewDecrease] = useState(0)
    const [newCodeVc, setNewCodeVc] = useState('')
    const [newExpiry, setNewExpiry] = useState('')
    const [newConditions, setNewConditions] = useState('')
    const [newIdTypeVoucher, setNewIdTypeVoucher] = useState('')

    const handleAddVoucher = () => {
        // console.log(`Add New Voucher - Name: ${newVoucherName}`)
        const dataVoucher = {
            status: newStatus,
            decrease: newDecrease,
            codeVc: newCodeVc,
            expiry: newExpiry,
            conditions: newConditions,
            idTypeVoucher: newIdTypeVoucher
        }
        onSubmit(dataVoucher)
        console.log(dataVoucher)
    }

    return (
        <>
            <div className='px-7 w-auto'>
                <div className='flex flex-row gap-5'>
                    <div>
                        <p>Trạng thái</p>
                        {/* <Input
                           
                            type='text'
                            onChange={(e) => setNewStatus(e.target.value)}
                            placeholder='Trạng thái'
                        /> */}

                        <Select
                            className=' w-48'
                            labelInValue
                            defaultValue={{ value: 'Còn voucher', label: 'Hết voucher' }}
                            onChange={(_e) => setNewStatus(true)}
                            options={[
                                {
                                    value: 'Còn voucher',
                                    label: 'Còn voucher'
                                },
                                {
                                    value: 'Hết voucher',
                                    label: 'Hết voucher'
                                }
                            ]}
                        ></Select>
                    </div>
                    <div>
                        <p>Giam giá</p>
                        <Input
                            className='border-spacing-1 border-gray-200  rounded-md pl-3 mb-4'
                            type='text'
                            onChange={(e) => setNewDecrease(parseInt(e.target.value, 10))}
                            placeholder='Hết hạn'
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <p>Mã voucher</p>
                        <Input
                            className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-4'
                            type='text'
                            onChange={(e) => setNewCodeVc(e.target.value)}
                            placeholder='Mã voucher'
                        />
                    </div>
                    <div>
                        <p>Ngày hết hạn</p>
                        <Input
                            className='border-spacing-1 border-gray-200  rounded-md pl-3 mb-4'
                            type='text'
                            onChange={(e) => setNewExpiry(e.target.value)}
                            placeholder='Ngày hết hạn'
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <p>Điều kiện</p>
                        <Input
                            className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-4'
                            type='text'
                            onChange={(e) => setNewConditions(e.target.value)}
                            placeholder='Điều kiện'
                        />
                    </div>
                    <div>
                        <p>Loại voucher</p>
                        <Input
                            className='border-spacing-1 border-gray-200 rounded-md pl-3 mb-4'
                            type='text'
                            onChange={(e) => setNewIdTypeVoucher(e.target.value)}
                            placeholder='Loại voucher'
                        />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button onClick={handleAddVoucher} className='bg-blue-500 px-4 py-1 rounded mr-2'>
                        Thêm
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddVoucher
