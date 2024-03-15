import { toast } from '@/components/ui/use-toast'
import instance from './core/api'
import { message } from 'antd'

export const getAll = async () => {
    try {
        const response = await instance.get('/contact')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_CONTACT_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/contact/${id}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_CONTACT_ERROR']`, error)
    }
}
export const update = async (contact: any) => {
    try {
        const response = await instance.patch(`/contact/${contact._id}`, contact)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật liên hệ thành công!!',
                description: 'Cập nhật liên hệ thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_CONTACT_ERROR']`, error.response.data.message)
    }
}
export const setStaffWithContact = async (contact: any) => {
    try {
        const response = await instance.patch(`/contact/1/staff`, contact)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật liên hệ cho nhân viên thành công!!'
            })
        }
        await instance.get('/contact')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['setStaffWithContact_CONTACT_ERROR']`, error.response.data.message)
    }
}
export const add = async (contact: any) => {
    try {
        const response = await instance.post('/contact/', contact)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thêm liên hệ thành công!!',
                description: 'Thêm liên hệ thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_CONTACT_ERROR']`, error)
    }
}
export const remove = async (contact: any) => {
    try {
        const response = await instance.delete(`/contact/${contact._id}`)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Xóa liên hệ thành công!!',
                description: 'Xóa liên hệ thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['Delete_CONTACT_ERROR']`, error)
    }
}
//mẫu product
