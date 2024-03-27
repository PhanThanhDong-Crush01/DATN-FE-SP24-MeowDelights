import { IVoucher } from '@/interface/IVoucher'
import instance from './core/api'
import { IComment } from '@/interface/IComment'
import { toast } from '@/components/ui/use-toast'

export const getAll = async () => {
    try {
        const response = await instance.get(`/comment`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_COMMENT_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/comment/${encodeURIComponent(id)}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_COMMENT_ERROR']`, error)
    }
}
export const getAllCommentOfProduct = async (id: string) => {
    try {
        const response = await instance.get(`/comment/product/${id}`)
        return response.data
    } catch (error: any) {
        console.log(`['GETONE_COMMENT_ERROR']`, error)
    }
}
export const update = async (comment: IComment) => {
    try {
        const response = await instance.put(`/comment/${comment._id}`, comment)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật bình luận thành công!!',
                description: 'Cập nhật bình luận thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATE_COMMENT_ERROR']`, error)
    }
}
export const add = async (comment: IComment) => {
    try {
        const response = await instance.post('/comment', comment)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thêm bình luận thành công!!',
                description: 'Thêm bình luận thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_COMMENT_ERROR']`, error)
    }
}

export const remove = async (comment: any) => {
    console.log('🚀 ~ remove ~ comment:', comment)
    try {
        const response = await instance.delete(`/comment/${comment?.comment?.data._id}`)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Xóa thành công!!',
                description: 'Xóa đánh giá thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['Delete_COMMENT_ERROR']`, error)
    }
}
export const statisticsComment = async (id: string) => {
    try {
        const response = await instance.get(`/comment/star/product/${id}`)
        return response.data
    } catch (error: any) {
        console.log(`['GETONE_COMMENT_ERROR']`, error)
    }
}
export const checkComment = async ({ userId, productId, productTypeId }: any) => {
    try {
        const response = await instance.post('/comment/check', { userId, productId, productTypeId })
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Bình luận này đã có!!',
                description: 'Bình luận này đã có!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['ADD_COMMENT_ERROR']`, error)
    }
}
export const getAllCommentsByBillId = async (id: string) => {
    try {
        const response = await instance.get(`/comment/bill/${id}`)
        return response.data
    } catch (error: any) {
        console.log(`['GETALL_COMMENT_OF_BILL_ERROR']`, error)
    }
}
