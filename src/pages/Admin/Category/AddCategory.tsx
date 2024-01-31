import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { useCategoryMutation } from '@/hooks/Category/useCategoryMutation'
import { toast } from '@/components/ui/use-toast'

const AddCategory = () => {
    const { onSubmit } = useCategoryMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật danh mục sản phẩm thành công!'
            })
        }
    })
    const { register, handleSubmit, setValue } = useForm()

    const onHandleSubmit = (data: any) => {
        // Xử lý dữ liệu khi form được submit
        onSubmit(data)
    }

    return (
        <div>
            <SheetContent>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <SheetHeader>
                        <SheetTitle>THÊM LOẠI DANH MỤC</SheetTitle>
                        {/* <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription> */}
                    </SheetHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='name' className='text-right'>
                                Tên
                            </Label>
                            <Input
                                id='name'
                                {...register('name')}
                                onChange={(e) => setValue('name', e.target.value)}
                                className='col-span-3'
                            />
                        </div>
                        {/* <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='username' className='text-right'>
                                Username
                            </Label>
                            <Input
                                id='username'
                                {...register('username')}
                                onChange={(e) => setValue('username', e.target.value)}
                                className='col-span-3'
                            />
                        </div> */}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type='submit'>Lưu thay đổi</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </div>
    )
}

export default AddCategory
