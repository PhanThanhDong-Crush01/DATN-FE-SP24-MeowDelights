import { toast } from '@/components/ui/use-toast'
import instance from './core/api'
import { ITypeVoucher } from '@/interface/ITypeVoucher'

export const getAll = async () => {
    try {
        const response = await instance.get('/type_voucher')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_TYPEVOUCHER_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/type_voucher/${id}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_TYPEVOUCHER_ERROR']`, error)
    }
}
export const update = async (typeVoucher: ITypeVoucher) => {
    try {
        const response = await instance.patch(`/type_voucher/${typeVoucher._id}`, typeVoucher)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật loại khuyến mãi thành công!!',
                description: 'Cập nhật loại khuyến mãi thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_TYPEVOUCHER_ERROR']`, error)
    }
}
export const add = async (typeVoucher: ITypeVoucher) => {
    try {
        const response = await instance.post('/type_voucher/', typeVoucher)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thêm loại khuyến mãi thành công!!',
                description: 'Thêm loại khuyến mãi thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_TYPEVOUCHER_ERROR']`, error)
    }
}
export const remove = async (typeVoucher: ITypeVoucher) => {
    try {
        await instance.delete(`/type_voucher/${typeVoucher._id}`)
        toast({
            variant: 'success',
            title: 'Xóa loại khuyến mãi thành công!!',
            description: 'Xóa loại khuyến mãi thành công!'
        })
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['DELETE_TYPEVOUCHER_ERROR']`, error)
    }
}
