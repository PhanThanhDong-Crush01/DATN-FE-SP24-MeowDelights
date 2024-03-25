import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { IAuth } from '@/interface/IAuth'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Avatar } from 'antd'
import ImageUpload from '@/lib/uploadFile'

type ImgUserFormProps = {
    data: IAuth
}

type FormControlType = {
    imgUser: string
}
const ImgUserForm = ({ data }: ImgUserFormProps) => {
    const [editAuth, setEditAuth] = useState(false)
    const { form, onSubmit } = useAuthMutation({
        action: 'UPDATE', // Specify the action as 'UPDATE'
        onSuccess: () => {
            setEditAuth(false)
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật avatar thành công!'
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

    const [imageUrl, setImageUrl] = useState<any>()
    const handleImageUpload = (url: any) => {
        setImageUrl(url)
    }
    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        if (imageUrl) {
            const dataNew = { ...values, imgUser: imageUrl }
            onSubmit({ ...data.datas, ...dataNew })
        }
    }

    return (
        <>
            <div className='mt-6 border bg-slate-100 rounded-md p-3'>
                <div className='font-medium flex items-center justify-between'>
                    {/* {!editAuth && <img className='text-sm mt-2 rounded' src={data?.datas?.imgUser} width={100} />} */}
                    {!editAuth && <Avatar src={data?.datas?.imgUser} style={{ width: 110, height: 110 }}></Avatar>}
                    {editAuth ? (
                        <></>
                    ) : (
                        <>
                            <Button variant='ghost' onClick={() => setEditAuth(!editAuth)}>
                                <Pencil className='h-4 w-4 mr-2' />
                                Chỉnh sửa
                            </Button>
                        </>
                    )}
                </div>

                {editAuth && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onHandleSubmit)}
                            className='flex'
                            style={{ justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <FormItem>
                                <ImageUpload onImageUpload={handleImageUpload} />
                            </FormItem>
                            <div className='flex gap-x-2'>
                                <Button variant='ghost' onClick={() => setEditAuth(!editAuth)}>
                                    Hủy
                                </Button>
                                <br />
                                <Button type='submit'>Lưu</Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </>
    )
}
export default ImgUserForm
