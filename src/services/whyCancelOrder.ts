import { IWhyCancelOrder } from '@/interface/IWhyCancelOrder'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'

export const add = async (why: IWhyCancelOrder) => {
    try {
        const response = await instance.post('/bill/whyCanCelOrder', why)

        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_WHY_CANCEL_ORDER_ERROR']`, error)
    }
}