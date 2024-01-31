import { IProduct } from '@/interface/IProduct'
import { add, storage, update } from '@/services/product'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const formSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    idCategory: Joi.string().required(),
    import_date: Joi.string().required(), //// ngày nhận hàng
    expiry: Joi.string().required(), ///hạn sử dụng của sản phẩm
    status: Joi.boolean().required(),
    description: Joi.string().required()
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'STORAGE'
    defaultValues?: IProduct
    onSuccess?: () => void
}

export const useProductMutation = ({
    action,
    defaultValues = {
        name: '',
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
                case 'STORAGE':
                    return await storage(product)
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
    const onStorage = (product: IProduct) => {
        product.status = false
        console.log('product' + product)
        mutate(product)
    }
    return {
        form,
        onSubmit,
        onStorage,
        ...rest
    }
}
//mẫu product
