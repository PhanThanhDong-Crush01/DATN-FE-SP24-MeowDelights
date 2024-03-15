import { ICart } from '@/interface/ICart'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'

export const getAll = async (iduser: string) => {
    try {
        const response = await instance.get('/cart/user/' + iduser)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_CART_OF_USER_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get('/cart/' + id)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_CART_ERROR']`, error)
    }
}
export const update = async (cart: ICart) => {
    try {
        const response = await instance.patch('/cart/', cart)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật giỏ hàng thành công!!',
                description: 'Cập nhật giỏ hàng thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_CART_ERROR']`, error)
    }
}
export const add = async (cart: ICart) => {
    try {
        const response = await instance.post('/cart', cart)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thêm giỏ hàng thành công!!',
                description: 'Thêm giỏ hàng thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_CART_ERROR']`, error)
    }
}
export const remove = async (cart: ICart) => {
    try {
        const response = await instance.delete('/cart/' + cart._id)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Xóa giỏ hàng thành công!!',
                description: 'Xóa giỏ hàng thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['DELET_CART_ERROR']`, error)
    }
}
export const removeCartUser = async (userId: any) => {
    try {
        const response = await instance.delete('/cart/user/' + userId)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['DELET_CART_ERROR']`, error)
    }
}
//mẫu product
