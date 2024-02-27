import { toast } from '@/components/ui/use-toast'
import instance from './core/api'
import { IBill } from '@/interface/IBill'

export const getAll = async () => {
    try {
        const response = await instance.get('/bill')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_BILL_ERROR']`, error)
    }
}
export const getBillOfUser = async (id: string) => {
    console.log('🚀 ~ getBillOfUser ~ id:', id)
    try {
        const response = await instance.get('/bill/user/' + id)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['getBillOfUser_ERROR']`, error)
    }
}
export const update = async (bill: IBill) => {}
export const add = async (bill: IBill) => {
    console.log('🚀 ~ add ~ bill:', bill)
    try {
        const response = await instance.post('/bill/', bill)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_BILL_ERROR']`, error)
    }
}
export const remove = async (bill: IBill) => {}
//mẫu product
