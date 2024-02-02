import instance from './core/api'
import { IBill } from '@/interface/IBill'

export const getAll = async () => {}
export const getBillOfUser = async (id: string) => {
    try {
        const response = await instance.get('/bill/user/' + id)
        return response.data
    } catch (error) {
        console.log(`['getBillOfUser_ERROR']`, error)
    }
}
export const update = async (bill: IBill) => {}
export const add = async (bill: IBill) => {
    console.log('🚀 ~ add ~ bill:', bill)
    try {
        const response = await instance.post('/bill/', bill)
        return response.data
    } catch (error) {
        console.log(`['ADD_BILL_ERROR']`, error)
    }
}
export const remove = async (bill: IBill) => {}
//mẫu product
