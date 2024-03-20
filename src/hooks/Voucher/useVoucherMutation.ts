import { IVoucher } from '@/interface/IVoucher'
import { add, remove, update } from '@/services/voucher'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
type useVoucherMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IVoucher
    onSuccess?: () => void
}
export const useVoucherMutation = ({
    action,
    defaultValues = {
        name: '',
        status: true,
        quantity: 0,
        decrease: 0,
        expiry: new Date('dd/mm/yyyy'),
        conditions: 0,
        idTypeVoucher: ''
    },
    onSuccess
}: useVoucherMutationProps) => {
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
        // resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<any> = (values) => {
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
