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

export const EditTypeProduct = ({ id, onTypeProductChange }: any) => {
    const [isSheetClosed, setIsSheetClosed] = useState<boolean>(false) // Thêm state để điều khiển việc đóng SheetContent
    const [typeProduct, setTypeProduct] = useState<any>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get(`/type_product/${id}`)
                setTypeProduct(data?.data)
            } catch (error) {
                console.error('Error fetching type product data:', error)
            }
        }
        fetchData()
    }, [])

    const form = useForm<any>()

    useEffect(() => {
        if (typeProduct) {
            form.setValue('color', typeProduct?.color)
            form.setValue('size', typeProduct?.size)
            form.setValue('weight', typeProduct?.weight)
            form.setValue('quantity', typeProduct?.quantity)
            form.setValue('price', typeProduct?.price)
        }
    }, [typeProduct])

    const [imageUrl, setImageUrl] = useState<string>('')

    const handleImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        try {
            // Gửi dữ liệu form đi
            const values = form.getValues()
            const updatedData = {
                ...values,
                image: imageUrl ? imageUrl : typeProduct?.image
            }
            const response = await instance.patch(`/type_product/${id}`, updatedData)
            toast({
                variant: 'success',
                title: response.data.message
            })
            onTypeProductChange()
            setIsSheetClosed(true)
        } catch (error) {
            console.error('Error updating type product:', error)
        }
    }
    return (
        <>
            {!isSheetClosed && (
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Chỉnh sửa biến thể sản phẩm</SheetTitle>
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
                                ></FormField>
                                <FormControl>
                                    <ImageUpload onImageUpload={handleImageUpload} />
                                </FormControl>

                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button onClick={handleSubmit}>Lưu thay đổi</Button>
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
