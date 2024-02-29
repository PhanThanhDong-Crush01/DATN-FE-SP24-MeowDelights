import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const EditTypeProduct = ({ id }: any) => {
    const [typeProduct, setTypeProduct] = useState<any>()

    useEffect(() => {}, [])

    const form = useForm<any>({
        defaultValues: {
            username: ''
        }
    })

    const onSubmit = (values: any) => {
        console.log('🚀 ~ EditTypeProduct ~ values:', values)
    }

    return (
        <div className='border p-6'>
            <h2 className='text-xl font-bold'>Thêm mèo</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Tên mèo</FormLabel>
                                <FormControl>
                                    <Input placeholder='Tên mèo' {...field} />
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
                                    <Input placeholder='Giá mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ảnh</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ảnh mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ngày sinh</FormLabel>
                                <FormControl>
                                    <Input type={'date'} placeholder='Ngày sinh của mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Mô tả</FormLabel>
                                <FormControl>
                                    <Input placeholder='Mô tả mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit'>Thêm</Button>
                </form>
            </Form>
        </div>
    )
}
