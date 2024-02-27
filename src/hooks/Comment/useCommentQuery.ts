import { getAll, getAllCommentOfProduct } from '@/services/comment'
import { useQuery } from 'react-query'

export const useCommentQuery = (commentId?: string) => {
    console.log(commentId)
    const { data, ...rest } = useQuery({
        queryKey: commentId ? ['COMMENT', commentId] : ['COMMENT'],
        queryFn: () => (commentId ? getAllCommentOfProduct(commentId) : getAll())
    })

    return { data, ...rest }
}
//mẫu product
