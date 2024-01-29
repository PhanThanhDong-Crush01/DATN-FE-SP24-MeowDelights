import instance from './core/api'
import { ITypeVoucher } from '@/interface/ITypeVoucher'

export const getAll = async () => {
    try {
        const response = await instance.get('/type_voucher')
        return response.data
    } catch (error) {
        console.log(`['GETALL_TYPEVOUCHER_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/type_voucher/${id}`)
        return response.data
    } catch (error) {
        console.log(`['GETONE_TYPEVOUCHER_ERROR']`, error)
    }
}
export const update = async (typeVoucher: ITypeVoucher) => {
    try {
        const response = await instance.patch(`/type_voucher/${typeVoucher._id}`, typeVoucher)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_TYPEVOUCHER_ERROR']`, error)
    }
}
export const add = async (typeVoucher: ITypeVoucher) => {
    try {
        const response = await instance.post('/type_voucher/', typeVoucher)
        return response.data
    } catch (error) {
        console.log(`['ADD_TYPEVOUCHER_ERROR']`, error)
    }
}
export const remove = async (typeVoucher: ITypeVoucher) => {
    try {
        await instance.delete(`/type_voucher/${typeVoucher._id}`)
    } catch (error) {
        console.log(`['DELETE_TYPEVOUCHER_ERROR']`, error)
    }
}

