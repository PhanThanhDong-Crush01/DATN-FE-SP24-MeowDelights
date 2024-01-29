import { IVoucher } from '@/interface/IVoucher'
import { add, remove, update } from '@/services/voucher'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    codevc: Joi.string(),
    status: Joi.string().min(6),
    decrease: Joi.number().min(0),
    expiry: Joi.string(), //hạn sử dụng
    conditions: Joi.string() /// điều kiện
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IVoucher
    onSuccess?: () => void
}

export const useProductMutation = ({
    action,
    defaultValues = {
        codevc: '',
        status: '',
        expiry: '',
        conditions: '',
        decrease: 0
    },
    onSuccess
}: useProductMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (voucher: IVoucher) => {
            switch (action) {
                case 'ADD':
                    return await add(voucher)
                case 'UPDATE':
                    return await update(voucher)
                case 'DELETE':
                    return await remove(voucher)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['VOUCHER']
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
    const onRemove = (voucher: IVoucher) => {
        mutate(voucher)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu product
