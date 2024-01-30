import { IProduct } from '@/interface/IProduct'
import instance from './core/api'

export const getAll = async () => {
    try {
        console.log(1)
        const response = await instance.get('/products')
        return response.data
    } catch (error) {
        console.log(`['GETALL_PRODUCT_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        console.log(5)
        const response = await instance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log(`['GETONE_PRODUCT_ERROR']`, error)
    }
}
export const update = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/${product._id}`, product)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_PRODUCT_ERROR']`, error)
    }
}
export const add = async (product: IProduct) => {
    try {
        const response = await instance.post('/products/', product)
        return response.data
    } catch (error) {
        console.log(`['ADD_PRODUCT_ERROR']`, error)
    }
}
export const storage = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/storage/${product._id}`, product.status)
        return response.data
    } catch (error) {
        console.log(`['STORAGE_PRODUCT_ERROR']`, error)
    }
}
