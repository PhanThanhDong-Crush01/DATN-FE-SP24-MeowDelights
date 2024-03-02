import { getAll, getBillDetail } from '@/services/bill'
import { useQuery } from 'react-query'

export const useBillDetailQuery = (billDetailId?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: billDetailId ? ['BILLDETAIL', billDetailId] : ['BILLDETAIL'],
        queryFn: () => (billDetailId ? getBillDetail(billDetailId) : getAll())
    })

    return { data, ...rest }
}
//mẫu product
