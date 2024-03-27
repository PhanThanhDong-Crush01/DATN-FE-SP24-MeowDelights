import { IWhyCancelOrder } from '@/interface/IWhyCancelOrder'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'

export const add = async (why: IWhyCancelOrder) => {
    try {
        const response = await instance.post('/bill/whyCanCelOrder', why)
        console.log('🚀 ~ add ~ response:', response)
        if (response.data) {
            toast({
                variant: 'success',
                description: 'Thêm lí do hủy hàng thành công!!',
                title: 'Hủy hàng thành công!'
            })
            if (response?.data?.cancelledOrdersCount === true) {
                setTimeout(() => {
                    toast({
                        variant: 'destructive',
                        title: 'Tài khoản của bạn đã bị khóa',
                        description: 'Bạn đã hủy 3 đơn hàng trong 30 trở lại!'
                    })
                    toast({
                        variant: 'destructive',
                        title: 'Bạn sẽ không thể mua hàng trong vòng 30 ngày tới',
                        description: 'Tài khoản của bạn có thể mua hàng sau 30 ngày!'
                    })
                }, 5000)
            }
        }

        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_WHY_CANCEL_ORDER_ERROR']`, error)
    }
}
