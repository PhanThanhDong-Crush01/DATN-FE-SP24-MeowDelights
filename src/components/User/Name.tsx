import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { IAuth } from '@/interface/IAuth'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type NameFormProps = {
    data: IAuth
}
type FormControlType = {
    name: string
}
const NameForm = ({ data }: NameFormProps) => {
    console.log(data)
    const [editAuth, setEditAuth] = useState(false)
    const { form, onSubmit } = useAuthMutation({
        action: 'UPDATE', // Specify the action as 'UPDATE'
        onSuccess: () => {
            console.log('Update success')
            setEditAuth(false)
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật tên thành công!'
            })
        }
    })

    useEffect(() => {
        if (data && form) {
            form.reset({
                imgUser: data?.datas?.imgUser || '',
                name: data?.datas?.name || '',
                email: data?.datas?.email || '',
                phone: data?.datas?.phone || '',
                age: data?.datas?.age || 0,
                address: data?.datas?.address || '',
                gender: data?.datas?.gender || true
            })
            console.log(data?.datas)
            console.log(form)
        }
    }, [data, form])

    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        console.log('Submitting form with values:', values)

        onSubmit({ ...data?.datas, ...values })
        if (data && form) {
            form.reset({
                imgUser: data?.datas?.imgUser || '',
                name: data?.datas?.name || '',
                email: data?.datas?.email || '',
                phone: data?.datas?.phone || '',
                age: data?.datas?.age || 0,
                address: data?.datas?.address || '',
                gender: data?.datas?.gender || true
            })
            console.log(data?.datas)
            console.log(form)
        }
    }

    return (
        <>
            <div className='mt-6 border bg-slate-100 rounded-md p-4  '>
                <div className='font-medium flex items-center justify-between '>
                    Tên
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
                {!editAuth && <p className='text-sm mt-2'>{data?.datas?.name}</p>}
                {editAuth && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onHandleSubmit)} className='flex flex-col gap-y-8'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder='Nhập tên' />
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
export default NameForm
