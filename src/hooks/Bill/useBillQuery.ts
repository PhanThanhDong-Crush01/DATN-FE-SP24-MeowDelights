import { getAll, getBillOfUser } from '@/services/bill'
import { useQuery } from 'react-query'

export const useBillQuery = (billId?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: billId ? ['BILL', billId] : ['BILL'],
        queryFn: () => (billId ? getBillOfUser(billId) : getAll())
    })

    return { data, ...rest }
}
//mẫu product
