import { getAll, getOne } from '@/services/product'
import { useQuery } from 'react-query'

export const useProductQuery = (productId?: string) => {
    const { data = {}, ...rest } = useQuery(productId ? ['PRODUCT', productId] : ['PRODUCT'], () =>
        productId ? getOne(productId) : getAll()
    )
    console.log('🚀 ~ useProductQuery ~ data:', data)
    return { data, ...rest }
}
