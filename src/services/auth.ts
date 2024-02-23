import { IAuth } from '@/interface/IAuth'
import instance from './core/api'
export const getAll = async () => {
    try {
        const response = await instance.get('/auth')
        return response.data
    } catch (error) {
        console.log(`['GETALL_AUTH_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/auth/${id}`)
        return response.data
    } catch (error) {
        console.log(`['GETONE_AUTH_ERROR']`, error)
    }
}
export const getAuthWithRole = async (staff: number) => {
    try {
        const response = await instance.get(`/auth/${staff}/permission`)
        return response.data
    } catch (error) {
        console.log(`['getAuthWithRole_ERROR']`, error)
    }
}

export const signin = async (user: any) => {
    try {
        const response = await instance.post('/auth/signin', user)
        return response.data
    } catch (error) {
        console.log(`['Signin_ERROR']`, error)
    }
}
export const signup = (user: any) => {
    return instance.post('/auth/signup', user)
}

export const updateUserProfile = async (user: IAuth) => {
    try {
        console.log(user)
        const response = await instance.patch(`/auth/${user._id}`, user)
        return response.data
    } catch (error) {
        console.log(`['UPDATEUSERPROFILE_AUTH_ERROR']`, error)
    }
}
