import { IProduct } from '@/interface/IProduct'
import { add, remove, update } from '@/services/product'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    idCategory: Joi.string().required(),
    import_date: Joi.string().required(), //// ngày nhận hàng
    expiry: Joi.string().required(), ///hạn sử dụng của sản phẩm
    status: Joi.boolean().required(),
    description: Joi.string().required()
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IProduct
    onSuccess?: () => void
}

export const useProductMutation = ({
    action,
    defaultValues = {
        name: '',
        price: 0,
        image: '',
        import_date: '',
        expiry: '',
        status: true,
        description: '',
        idCategory: ''
    },
    onSuccess
}: useProductMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: IProduct) => {
            switch (action) {
                case 'ADD':
                    return await add(product)
                case 'UPDATE':
                    return await update(product)
                case 'DELETE':
                    return await remove(product)
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
    const onRemove = (product: IProduct) => {
        mutate(product)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu product
