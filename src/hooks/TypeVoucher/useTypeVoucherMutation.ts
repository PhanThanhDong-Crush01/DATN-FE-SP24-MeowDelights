import { ITypeVoucher } from '@/interface/ITypeVoucher'
import { add, remove, update } from '@/services/typeVoucher'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    name: Joi.string().required().min(6).max(50)
})

type useTypeVoucherMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: ITypeVoucher
    onSuccess?: () => void
}

export const useTypeVoucherMutation = ({
    action,
    defaultValues = { name: '' },
    onSuccess
}: useTypeVoucherMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (typeVoucher: ITypeVoucher) => {
            switch (action) {
                case 'ADD':
                    return await add(typeVoucher)
                case 'UPDATE':
                    return await update(typeVoucher)
                case 'DELETE':
                    return await remove(typeVoucher)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['TYPEVOUCHER']
            })
        }
    })
    const form = useForm({
        resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<any> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onRemove = (typeVoucher: ITypeVoucher) => {
        mutate(typeVoucher)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu product
