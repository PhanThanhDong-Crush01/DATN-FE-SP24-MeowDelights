import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { InputNumber } from 'antd'
import ImageUpload from '@/lib/uploadFile'
import instance from '@/services/core/api'
import { toast } from '@/components/ui/use-toast'
import { useParams } from 'react-router-dom'

export const AddTypeProduct = ({ onTypeProductChange }: any) => {
    const { id } = useParams()
    const [isSheetClosed, setIsSheetClosed] = useState<boolean>(false) // Thêm state để điều khiển việc đóng SheetContent

    const form = useForm<any>()

    const [imageUrl, setImageUrl] = useState<string>('')

    const handleImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        try {
            // Gửi dữ liệu form đi
            console.log('🚀 ~ handleSubmit ~ imageUrl:', imageUrl)
            const values = form.getValues()
            if (imageUrl == '') {
                toast({
                    variant: 'destructive',
                    title: 'Vui lòng thêm ảnh cho biến thể'
                })
            } else {
                const updatedData = {
                    ...values,
                    image: imageUrl,
                    idPro: id
                }

                const response = await instance.post(`/type_product`, updatedData)
                toast({
                    variant: 'success',
                    title: response.data.message
                })
                onTypeProductChange()
                setIsSheetClosed(true)
            }
        } catch (error) {
            console.error('Error updating type product:', error)
        }
    }
    return (
        <>
            {!isSheetClosed && (
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Thêm biến thể sản phẩm</SheetTitle>
                    </SheetHeader>
                    <div className='border p-6'>
                        <Form {...form}>
                            <form className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='color'
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className='font-bold'>Loại</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Trắng hoặc to nhỏ' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                    rules={{ required: 'Vui lòng nhập loại' }}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name='size'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-bold'>Size</FormLabel>
                                            <FormControl>
                                                <Input placeholder='M L S hoặc g kg' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={{ required: 'Vui lòng nhập size' }}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name='weight'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-bold'>Khối lượng</FormLabel>
                                            <FormControl>
                                                <Input placeholder='gam hoặc kg' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={{ required: 'Vui lòng nhập khối lượng' }}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name='quantity'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-bold'>Số lượng</FormLabel>
                                            <FormControl>
                                                <InputNumber min={1} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={{ required: 'Vui lòng nhập số lượng' }}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name='price'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-bold'>Giá</FormLabel>
                                            <FormControl>
                                                <InputNumber min={1} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    rules={{ required: 'Vui lòng nhập giá' }}
                                ></FormField>
                                <FormControl>
                                    <ImageUpload onImageUpload={handleImageUpload} />
                                </FormControl>

                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button onClick={handleSubmit}>Lưu</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            )}
        </>
    )
}
