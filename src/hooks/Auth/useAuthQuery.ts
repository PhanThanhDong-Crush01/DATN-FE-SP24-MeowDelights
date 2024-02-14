import { getAll, getOne } from '@/services/auth'
import { useQuery } from 'react-query'

export const useAuthQuery = (authId?: string) => {
    console.log(authId)
    // const { authId } = useAuth()
    const { data, ...rest } = useQuery({
        queryKey: authId ? ['AUTH', authId] : ['AUTH'],
        queryFn: () => (authId ? getOne(authId) : getAll())
    })
    console.log(data)
    return { data, ...rest }
}
//mẫu product
