import { ITypeProduct } from '@/interface/ITypeProduct'
import instance from './core/api'

export const getAll = async () => {}
// export const getOne = async (id: string) => {
//     try {
//         const response = await instance.get(`/type_/${id}`)
//         return response.data
//     } catch (error: any) {
//         toast({
//             variant: 'destructive',
//             title: error?.response?.data?.message + '!'
//         })
//         console.log(`['GETONE_TYPEVOUCHER_ERROR']`, error)
//     }
// }
export const update = async (type_product: ITypeProduct) => {}
export const add = async (type_product: ITypeProduct) => {}
export const remove = async (type_product: ITypeProduct) => {}
//mẫu product
