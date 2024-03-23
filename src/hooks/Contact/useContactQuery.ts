import { getAll, getOne } from '@/services/contact'
import { useQuery } from 'react-query'

export const useContactQuery = (contactId?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: contactId ? ['CONTACT', contactId] : ['CONTACT'],
        queryFn: () => (contactId ? getOne(contactId) : getAll())
    })
    return { data, ...rest }
}
//mẫu product
