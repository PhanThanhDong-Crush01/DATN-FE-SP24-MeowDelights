// import { IAuth } from '@/interface/IAuth'
// import instance from './core/api'

import { IAuth } from '@/interface/IAuth'
import instance from './core/api'
import { toast } from '@/components/ui/use-toast'
import { Wind } from 'lucide-react'
export const getAll = async () => {
    try {
        const response = await instance.get(`/auth`)
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['GETALL_AUTH_ERROR']`, error)
    }
}
export const getOneUser = async (id: string) => {
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

export const signin = async (user: any) => {
    try {
        const response = await instance.post('/auth/signin', user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Đăng nhập thành công!!',
                description: 'Đăng nhập thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['Signin_ERROR']`, error)
    }
}
export const signup = async (user: any) => {
    try {
        const response = await instance.post('/auth/signup', user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Đăng kí thành công!!',
                description: 'Đăng kí thành công!'
            })
        }
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
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật tài khoản thành công!!',
                description: 'Cập nhật tài khoản thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATEUSERPROFILE_AUTH_ERROR']`, error)
    }
}
export const updateUserRole = async (user: IAuth) => {
    try {
        const response = await instance.patch(`/auth/roleUser/${user._id}`, user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật quyền thành công !!',
                description: 'Cập nhật quyền thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATEUSERROLE_AUTH_ERROR']`, error)
    }
}
export const setEmployeeCode = async (user: IAuth) => {
    try {
        const response = await instance.patch(`${user._id}/setEmployeeCode`)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Cập nhật  mã nhân viên thành công !!',
                description: 'Cập nhật quyền thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['UPDATEUSERROLE_AUTH_ERROR']`, error)
    }
}
export const createAuth = async (user: any) => {
    try {
        const response = await instance.post('/auth/createAuth', user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Tạo tài khoản thành công!!',
                description: 'Tạo tài khoản thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['CREATE_AUTH_ERROR']`, error)
    }
}
export const createKhachVangLai = async (user: any) => {
    try {
        const response = await instance.post('/auth/createKhachVangLai', user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Tạo tài khoản thành công!!',
                description: 'Tạo tài khoản thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['CREATE_AUTH_ERROR']`, error)
    }
}
export const editAuth = async (user: any) => {
    try {
        const response = await instance.patch(`/auth/editAuth/${user._id}`, user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Sửa tài khoản thành công!!',
                description: 'Sửa tài khoản thành công!'
            })
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['_AUTH_ERROR']`, error)
    }
}
export const deleteEmployee = async (user: IAuth) => {
    try {
        const response = await instance.patch(`/auth/deleteEmployee/${user._id}`, user)
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Xóa quyền nhân viên thành công!!',
                description: 'Tài khoản này hoạt động như 1 khách hàng !'
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
        return response.data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['delete_Employee']`, error)
    }
}
export const remove = async (auth: IAuth) => {
    try {
        await instance.delete(`/auth/${auth._id}`)

        toast({
            variant: 'success',
            title: 'Xóa tài khoản thành công !!'
            // description: 'Xóa thành công!'
        })
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: error?.response?.data?.message + '!'
        })
        console.log(`['DELETE_AUTH_ERROR']`, error)
    }
}
