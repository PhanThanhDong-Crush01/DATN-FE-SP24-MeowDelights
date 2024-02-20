// import { IAuth } from '@/interface/IAuth'
// import instance from './core/api'

import { IAuth } from '@/interface/IAuth'
import instance from './core/api'

// export const getAll = async () => {}
// export const getOne = async (id: string) => {}
// export const update = async (user: IAuth) => {}
// export const add = async (user: IAuth) => {}
// export const remove = async (user: IAuth) => {}
// //mẫu product

export const signin = async (user: any) => {
    try {
        const response = await instance.post('/auth/signin', user)
        return response.data
    } catch (error) {
        console.log(`['Signin_ERROR']`, error)
    }
}
export const signup = async (user: any) => {
    try {
        const response = await instance.post('/auth/signup', user)
        return response.data
    } catch (error) {
        console.log(`['Signup_ERROR']`, error)
    }
}
