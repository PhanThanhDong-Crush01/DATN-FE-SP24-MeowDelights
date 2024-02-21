import { getAll, getOne } from '@/services/contact'
import { useQuery } from 'react-query'

export const useContactQuery = (contactId?: string) => {
    console.log(contactId)
    const { data, ...rest } = useQuery({
        queryKey: contactId ? ['CONTACT', contactId] : ['CONTACT'],
        queryFn: () => (contactId ? getOne(contactId) : getAll())
    })
    console.log(data)
    return { data, ...rest }
}
//mẫu product
