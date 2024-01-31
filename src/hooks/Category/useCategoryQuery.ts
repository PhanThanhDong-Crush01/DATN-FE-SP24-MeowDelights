import { getAll, getOne } from '@/services/category'
import { useQuery } from 'react-query'

export const useCategoryQuery = (categoryId?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: categoryId ? ['CATEGORY', categoryId] : ['CATEGORY'],
        queryFn: () => (categoryId ? getOne(categoryId) : getAll())
    })

    return { data, ...rest }
}
//mẫu product
