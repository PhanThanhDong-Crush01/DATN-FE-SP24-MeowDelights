import { getAll } from '@/services/cart'
import { useQuery } from 'react-query'

export const useCartQuery = () => {
    const ID_USER = localStorage.getItem('userID')
    const { data, ...rest } = useQuery(['CART', ID_USER], () => (ID_USER ? getAll(ID_USER) : null))
    return { dataCart: data, ...rest }
}
