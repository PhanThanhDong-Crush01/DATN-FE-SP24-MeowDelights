// import { IAuth } from '@/interface/IAuth'
// import instance from './core/api'

import { IAuth } from '@/interface/IAuth'
import instance from './core/api'

export const getAll = async () => {
    try {
        const response = await instance.get('/auth/')
        return response.data
    } catch (error) {
        console.log(`['GETAll_USER_ERROR']`, error)
    }
}
export const getOne = async (id: string) => {
    try {
        const response = await instance.get('/auth/' + id)
        return response.data
    } catch (error) {
        console.log(`['GETONE_User_ERROR']`, error)
    }
}
export const update = async (user: IAuth) => {}
export const add = async (user: IAuth) => {}
export const remove = async (user: IAuth) => {}
// //mẫu product

export const signin = async (user: any) => {
    try {
        const response = await instance.post('/auth/signin', user)
        return response.data
    } catch (error) {
        console.log(`['GETONE_CART_ERROR']`, error)
    }
}
export const signup = async (user: any) => {
    try {
        const response = await instance.post('/auth/signup', user)
        return response.data
    } catch (error) {
        console.log(`['GETONE_CART_ERROR']`, error)
    }
}
