import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { api_updateContact_note_idOrder } from '@/services/contact'

const UpdateContact_note_idOrder = ({ id }: any) => {
    const { register, handleSubmit } = useForm()
    const [selectStatus, setSelectStatus] = useState<any>('true')

    const onHandleSubmit = async (data: any) => {
        const updated = {
            id: id,
            note: data.note,
            idOrder: '',
            status: selectStatus === 'true' ? true : false
        }
        await api_updateContact_note_idOrder(updated)
    }

    return (
        <div>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Thêm ghi chú</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='note' className='text-right'>
                                Ghi chú
                            </Label>
                            <Input id='note' {...register('note')} className='col-span-3' />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type='submit'>Lưu</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </div>
    )
}

export default UpdateContact_note_idOrder
