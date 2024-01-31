import { ICategory } from '@/interface/ICategory'
import { add, remove, update } from '@/services/category'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    name: Joi.string().required().min(6).max(50)
})

type useCategoryMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: ICategory
    onSuccess?: () => void
}

export const useCategoryMutation = ({ action, defaultValues = { name: '' }, onSuccess }: useCategoryMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (category: ICategory) => {
            switch (action) {
                case 'ADD':
                    return await add(category)
                case 'UPDATE':
                    return await update(category)
                case 'DELETE':
                    return await remove(category)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['CATEGORY']
            })
        }
    })
    const form = useForm({
        resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<any> = (values) => {
        mutate(values)
    }
    const onRemove = (category: ICategory) => {
        mutate(category)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu CATEGORY
