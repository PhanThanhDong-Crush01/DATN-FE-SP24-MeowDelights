import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { IAuth } from '@/interface/IAuth'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type EmailFormProps = {
    data: IAuth
}

type FormControlType = {
    email: string
}
const EmailForm = ({ data }: EmailFormProps) => {
    console.log(data)
    const [editAuth, setEditAuth] = useState(false)
    const { form, onSubmit } = useAuthMutation({
        action: 'UPDATE', // Specify the action as 'UPDATE'
        onSuccess: () => {
            setEditAuth(false)
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật email thành công!'
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
        }
    }, [data, form])

    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        onSubmit({ ...data.datas, ...values })
    }

    return (
        <>
            <div className='mt-6 border bg-slate-100 rounded-md p-4'>
                <div className='font-medium flex items-center justify-between'>
                    Email
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
                {!editAuth && <p className='text-sm mt-2'>{data?.datas?.email}</p>}
                {editAuth && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onHandleSubmit)} className='flex flex-col gap-y-8'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder='Mời nhập email' />
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
export default EmailForm
