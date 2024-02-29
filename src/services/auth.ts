// import { IAuth } from '@/interface/IAuth'
// import instance from './core/api'

import { IAuth } from '@/interface/IAuth'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'
export const getAll = async () => {
    try {
        const response = await instance.get('/auth')
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_AUTH_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get(`/auth/${id}`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETONE_AUTH_ERROR']`, error)
    }
}
export const getAuthWithRole = async (staff: number) => {
    try {
        const response = await instance.get(`/auth/${staff}/permission`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['getAuthWithRole_ERROR']`, error)
    }
}

export const signin = (user: any) => {
    return instance.post('/auth/signin', user)
}
export const signup = async (user: any) => {
    try {
        const response = await instance.post('/auth/signup', user)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['Signup_ERROR']`, error)
    }
}
export const updateUserProfile = async (user: IAuth) => {
    try {
        console.log(user)
        const response = await instance.patch(`/auth/${user._id}`, user)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATEUSERPROFILE_AUTH_ERROR']`, error)
    }
}
