import { IVoucher } from '@/interface/IVoucher'
import instance from './core/api'
import { IComment } from '@/interface/IComment'

export const getAll = async () => {
    try {
        const response = await instance.get('/comment')
        return response.data
    } catch (error) {
        console.log(`['GETALL_COMMENT_ERROR']`, error)
    }
}
export const getAllCommentOfProduct = async (id: string) => {
    try {
        const response = await instance.get(`/comment/product/${id}`)
        return response.data
    } catch (error) {
        console.log(`['GETONE_COMMENT_ERROR']`, error)
    }
}
export const update = async (comment: IComment) => {
    try {
        const response = await instance.put(`/comment/${comment._id}`, comment)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_COMMENT_ERROR']`, error)
    }
}
export const add = async (comment: IComment) => {
    try {
        const response = await instance.post('/comment', comment)
        return response.data
    } catch (error) {
        console.log(`['ADD_COMMENT_ERROR']`, error)
    }
}

export const remove = async (comment: IComment) => {
    try {
        await instance.delete(`/comment/${comment._id}`)
    } catch (error) {
        console.log(`['DELETE_COMMENT_ERROR']`, error)
    }
}
