import { IBillDetail } from '@/interface/IBillDetail'
import { apiCancelOrder, apiChangePaymentStatus, apiChangeStatusOrder } from '@/services/bill'
import { add, remove, update } from '@/services/billDetail'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    price: Joi.number()
})

type useBillDetailMutationProps = {
    action: 'UPDATE_PAYMENT_STATUS' | 'CANCEL_ORDER'
    defaultValues?: IBillDetail
    onSuccess?: () => void
}

export const useBillDetailMutation = ({
    action,
    defaultValues = {
        _id: '',
        iduser: '',
        money: 0,
        date: '',
        adress: '',
        tel: '',
        idvc: '',
        paymentmethods: '',
        paymentstatus: '',
        orderstatus: ''
    },
    onSuccess
}: useBillDetailMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (billDetail: IBillDetail) => {
            switch (action) {
                // case 'ADD':
                //     return await add(billDetail)

                case 'UPDATE_PAYMENT_STATUS':
                    return await apiChangePaymentStatus(billDetail)
                case 'CANCEL_ORDER':
                    return await apiCancelOrder(billDetail)

                // case 'DELETE':
                //     return await remove(billDetail)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT']
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
    const onRemove = (billDetail: IBillDetail) => {
        mutate(billDetail)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu product
