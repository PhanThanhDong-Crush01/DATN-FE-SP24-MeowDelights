// import { IAuth } from '@/interface/IAuth'
// import instance from './core/api'

import instance from './core/api'
import { toast } from '@/components/ui/use-toast'
export const getTop10User = async () => {
    try {
        const response = await instance.get('/statistics/thong_ke_top10_user')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['getTop10ViewProducts']`, error)
    }
}
export const getTop10ViewProducts = async () => {
    try {
        const response = await instance.get('/statistics/getTop10ViewProducts')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['getTop10ViewProducts']`, error)
    }
}
export const thong_ke_doanh_thu = async (startDate: any, endDate: any) => {
    try {
        const response = await instance.post('/statistics/thong_ke_doanh_thu', { startDate, endDate })
        return response.data
    } catch (error: any) {
        toast({
            title: error?.response?.data?.message + '!'
        })
        console.log(`['thong_ke_doanh_thu']`, error)
    }
}
export const thong_ke = async (startDate: any, endDate: any) => {
    try {
        const response = await instance.post('/statistics/thong_ke', { startDate, endDate })
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['thong_ke_doanh_thu']`, error)
    }
}
export const thong_ke_doanh_thu_thang_trong_nam = async (year: any) => {
    try {
        const response = await instance.get(`/statistics/thong_ke_doanh_thu_thang_trong_nam/` + year)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['thong_ke_doanh_thu_thang_trong_nam']`, error)
    }
}
export const thong_ke_top_10_product = async () => {
    try {
        const response = await instance.get(`/statistics/top10product/`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['thong_ke_top_10_product']`, error)
    }
}
