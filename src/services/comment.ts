import { IVoucher } from '@/interface/IVoucher'
import instance from './core/api'
import { IComment } from '@/interface/IComment'
import { toast } from '@/components/ui/use-toast'

export const getAll = async () => {
    try {
        const response = await instance.get(`/comment`)
        return response.data
    } catch (error: any) {
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

export const remove = async (comment: IComment) => {
    try {
        await instance.delete(`/comment/${comment._id}`)

        toast({
            variant: 'success',
            title: 'Xóa bình luận thành công!!',
            description: 'Xóa bình luận thành công!'
        })
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['DELETE_COMMENT_ERROR']`, error)
    }
}
