import { IVoucher } from '@/interface/IVoucher'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'

export const getAll = async () => {
    try {
        const response = await instance.get('/voucher')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_VOUCHER_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/voucher/${id}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_VOUCHER_ERROR']`, error)
    }
}
export const update = async (voucher: IVoucher) => {
    try {
        const response = await instance.put(`/voucher/${voucher._id}`, voucher)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_VOUCHER_ERROR']`, error)
    }
}
export const add = async (voucher: IVoucher) => {
    try {
        const response = await instance.post('/voucher', voucher)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_VOUCHER_ERROR']`, error)
    }
}

export const remove = async (voucher: IVoucher) => {
    try {
        await instance.delete(`/voucher/${voucher._id}`)
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['DELETE_VOUCHER_ERROR']`, error)
    }
}
