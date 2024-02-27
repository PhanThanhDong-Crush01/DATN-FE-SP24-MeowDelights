import { IProduct } from '@/interface/IProduct'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'

export const getAll = async () => {
    try {
        console.log(1)
        const response = await instance.get('/products')
        console.log('🚀 ~ getAll ~ response:', response)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_PRODUCT_ERROR']`, error)
    }
}
export const update = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/${product._id}`, product)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_PRODUCT_ERROR']`, error)
    }
}
export const add = async (product: IProduct) => {
    try {
        const response = await instance.post('/products/', product)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_PRODUCT_ERROR']`, error)
    }
}
export const storage = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/storage/${product._id}`, product.status)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['STORAGE_PRODUCT_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/products/${id}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_PRODUCT_ERROR']`, error)
    }
}
export const getPhanTrangProducts = async (_sort?: string) => {
    try {
        const response = await instance.get(`/products${_sort ? `?_order=${_sort}` : ''}`)
        console.log('🚀 ~ getPhanTrangProducts ~ response:', response)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        //xu ly loi neu can
        console.error('FETCH_PRODUCTS_ERROR', error)
        throw error
    }
}
// Trong SortProPrice
export const SortProPrice = async (_sort: string) => {
    try {
        return await getPhanTrangProducts(_sort)
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        // Xử lý lỗi ở đây nếu cần
        console.error('FETCH_PRODUCTS_ERROR', error)
        throw error
    }
}
