import { IComment } from '@/interface/IComment'
import { add, remove, update } from '@/services/comment'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    star: Joi.number().required().min(1),
    img: Joi.string().required(),
    title: Joi.string().required(),
    comment: Joi.string().required() //hạn sử dụng
})

type useCommentMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IComment
    onSuccess?: () => void
}

export const useCommentMutation = ({
    action,
    defaultValues = {
        userId: '',
        productId: '',
        productTypeId: '',
        img: '',
        title: '',
        star: 0,
        comment: ''
    },
    onSuccess
}: useCommentMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (comment: IComment) => {
            switch (action) {
                case 'ADD':
                    return await add(comment)
                case 'UPDATE':
                    return await update(comment)
                case 'DELETE':
                    return await remove(comment)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['COMMENT']
            })
        }
    })
    const form = useForm({
        // resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<any> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onRemove = (comment: IComment) => {
        mutate(comment)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu product
