import { getAll } from '@/services/cart'
import { useQuery } from 'react-query'

const ID_USER = '65b9451b0bbb2b6e014e5588'

export const useCartQuery = () => {
    const { data, ...rest } = useQuery({
        queryKey: ID_USER ? ['CART', ID_USER] : ['CART'],
        queryFn: () => (ID_USER ? getAll(ID_USER) : '')
    })
    const dataCart = data
    return { dataCart, ...rest }
}
//mẫu product
