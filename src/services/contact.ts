import instance from './core/api'
import { message } from 'antd'

export const getAll = async () => {
    try {
        const response = await instance.get('/contact')
        return response.data
    } catch (error) {
        console.log(`['GETALL_CONTACT_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/contact/${id}`)
        return response.data
    } catch (error) {
        console.log(`['GETONE_CONTACT_ERROR']`, error)
    }
}
export const update = async (contact: any) => {
    try {
        const response = await instance.patch(`/contact/${contact._id}`, contact)
        return response.data
    } catch (error: any) {
        console.log(`['UPDATE_CONTACT_ERROR']`, error.response.data.message)
    }
}
export const setStaffWithContact = async (contact: any) => {
    try {
        const response = await instance.patch(`/contact/1/staff`, contact)
        await instance.get('/contact')
        return response.data
    } catch (error: any) {
        console.log(`['setStaffWithContact_CONTACT_ERROR']`, error.response.data.message)
    }
}
export const add = async (contact: any) => {
    try {
        const response = await instance.post('/contact/', contact)
        return response.data
    } catch (error) {
        console.log(`['ADD_CONTACT_ERROR']`, error)
    }
}
export const remove = async (contact: any) => {
    try {
        const response = await instance.delete(`/contact/${contact._id}`)
        return response.data
    } catch (error) {
        console.log(`['Delete_CONTACT_ERROR']`, error)
    }
}
//mẫu product
