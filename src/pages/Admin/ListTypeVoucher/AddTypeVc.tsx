import { toast } from '@/components/ui/use-toast'
import { useTypeVoucherMutation } from '@/hooks/TypeVoucher/useTypeVoucherMutation'
import React, { useState } from 'react'

const AddTypeVc = () => {
    const { form, onSubmit } = useTypeVoucherMutation({
        action: 'ADD',
        onSuccess: () => {}
    })

    const [newVoucherName, setNewVoucherName] = useState('')

    const handleAddVoucher = () => {
        console.log(`Add New Voucher - Name: ${newVoucherName}`)
        onSubmit({ name: newVoucherName })
    }

    return (
        <>
            <input
                className='border-2 border-black rounded-md pl-3 mb-4'
                type='text'
                onChange={(e) => setNewVoucherName(e.target.value)}
                placeholder='Loại Voucher'
            />
            <div className='flex justify-end'>
                <button onClick={handleAddVoucher} className='bg-blue-500 px-4 py-1 rounded mr-2'>
                    Thêm
                </button>
            </div>
        </>
    )
}

export default AddTypeVc
