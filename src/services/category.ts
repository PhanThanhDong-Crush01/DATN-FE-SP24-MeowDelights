import { toast } from '@/components/ui/use-toast'
import { ICategory } from './../interface/ICategory'
import instance from './core/api'
import { message } from 'antd'

export const getAll = async () => {
    try {
        const response = await instance.get('/categories')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_CATEGORY_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/categories/${id}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_CATEGORY_ERROR']`, error)
    }
}
export const update = async (category: ICategory) => {
    try {
        const response = await instance.patch(`/categories/${category._id}`, category)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật danh mục sản phẩm thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_CATEGORY_ERROR']`, error.response.data.message)
    }
}
export const add = async (category: ICategory) => {
    try {
        const response = await instance.post('/categories/', category)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thêm thành công!!',
                description: 'Thêm danh mục sản phẩm thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_CATEGORY_ERROR']`, error)
    }
}
export const remove = async (category: ICategory) => {
    try {
        const response = await instance.delete(`/categories/${category._id}`)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Xóa thành công!!',
                description: 'Xóa danh mục sản phẩm thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['Delete_CATEGORY_ERROR']`, error)
    }
}
//mẫu product
