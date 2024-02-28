import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { IAuth } from '@/interface/IAuth'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type AddressFormProps = {
    data: IAuth
}

type FormControlType = {
    imgUser: string
}
const AddressForm = ({ data }: AddressFormProps) => {
    const [editAuth, setEditAuth] = useState(false)
    const { form, onSubmit } = useAuthMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setEditAuth(false)
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật địa chỉ thành công!'
            })
        }
    })

    useEffect(() => {
        if (data && form) {
            console.log('Data:', data)
            console.log('Form:', form)

            console.log('Effect triggered')

            form.reset({
                imgUser: data?.datas?.imgUser || '',
                name: data?.datas?.name || '',
                email: data?.datas?.email || '',
                phone: data?.datas?.phone || '',
                age: data?.datas?.age || 0,
                address: data?.datas?.address || '',
                gender: data?.datas?.gender || true
            })
        }
    }, [data, form])

    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        onSubmit({ ...data.datas, ...values })
    }

    return (
        <>
            <div className='mt-6 border bg-slate-100 rounded-md p-3'>
                <div className='font-medium flex items-center justify-between'>
                    Địa chỉ
                    <Button variant='ghost' onClick={() => setEditAuth(!editAuth)}>
                        {editAuth ? (
                            <>Hủy</>
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Chỉnh sửa
                            </>
                        )}
                    </Button>
                </div>
                {!editAuth && <p className='text-sm mt-2'>{data?.datas?.address}</p>}
                {editAuth && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onHandleSubmit)}
                            className='flex'
                            style={{ justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem style={{ width: '80%' }}>
                                        <FormControl>
                                            <Input {...field} placeholder='Nhập địa chỉ' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center gap-x-2'>
                                <Button type='submit'>Lưu</Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </>
    )
}
export default AddressForm
