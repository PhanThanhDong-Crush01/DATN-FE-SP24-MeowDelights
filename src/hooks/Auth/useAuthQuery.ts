import { getAll, getAuthWithRole, getOneUser } from '@/services/auth'
import { useQuery } from 'react-query'

export const useAuthQuery = (authId?: string, staff?: number) => {
    //có thể có staff
    const { data, ...rest }: any = useQuery({
        queryKey: authId ? ['AUTH', authId] : ['AUTH'],
        queryFn: () => (authId ? getOneUser(authId) : staff ? getAuthWithRole(staff) : getAll())
    })
    if (staff) {
        const dataAuthWithRole = data
        return { dataAuthWithRole, ...rest }
    }
    return { data, ...rest }
}
//mẫu product
