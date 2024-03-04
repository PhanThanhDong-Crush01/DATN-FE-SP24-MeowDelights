import { IBill } from '@/interface/IBill'
import { IWhyCancelOrder } from '@/interface/IWhyCancelOrder'
import { add } from '@/services/whyCancelOrder'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type useWhyCancelOrderMutationProps = {
    action: 'ADD'
    defaultValues?: IWhyCancelOrder
    onSuccess?: () => void
}

export const useWhyCancelOrder = ({
    action,
    defaultValues = {
        idbill: '',
        iduser: '',
        idpro: '',
        idprotype: '',
        message: ''
    },
    onSuccess
}: useWhyCancelOrderMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (why: IWhyCancelOrder) => {
            switch (action) {
                case 'ADD':
                    return await add(why)
                // case 'UPDATE':
                //     return await update(bill)
                // case 'DELETE':
                //     return await remove(bill)
                // default:
                //     return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['WHY']
            })
        }
    })
    const form = useForm({
        defaultValues
    })
    const onSubmitWhy: SubmitHandler<any> = (values) => {
        mutate(values)
    }
    // const onRemove = (bill: IBill) => {
    //     mutate(bill)
    // }
    return {
        form,
        onSubmitWhy,

        ...rest
    }
}
//mẫu product
