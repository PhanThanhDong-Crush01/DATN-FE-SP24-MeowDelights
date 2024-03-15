import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useCategoryMutation } from '@/hooks/Category/useCategoryMutation'
import { toast } from '@/components/ui/use-toast'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'

const EditCategory = ({ id }: any) => {
    const { data } = useCategoryQuery(id)
    const category = data?.data
    console.log(category)
    const { form, onSubmit } = useCategoryMutation({
        action: 'UPDATE'
    })
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        if (category) {
            setValue('name', category.name)
        }
    }, [category, setValue])

    const onHandleSubmit = (data: any) => {
        const updatedCategory = { ...category, name: data.name }
        console.log('🚀 ~ onHandleSubmit ~ updatedCategory:', updatedCategory)
        onSubmit(updatedCategory)
    }

    return (
        <div>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>SỬA LOẠI DANH MỤC</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='name' className='text-right'>
                                Tên
                            </Label>
                            <Input id='name' {...register('name')} className='col-span-3' />
                        </div>
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

export default EditCategory
