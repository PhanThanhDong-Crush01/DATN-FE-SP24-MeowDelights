import { getAll, getAllCommentsByBillId } from '@/services/comment'
import { useQuery } from 'react-query'

export const useComment = (commentId?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: commentId ? ['COMMENT', commentId] : ['COMMENT'],
        queryFn: () => (commentId ? getAllCommentsByBillId(commentId) : getAll())
    })

    return { data, ...rest }
}
//mẫu product
