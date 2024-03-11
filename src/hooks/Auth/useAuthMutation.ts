import { IAuth } from '@/interface/IAuth'
import AddAuth from '@/pages/Admin/ListUser/AddAuth'
import { createAuth, editAuth, updateUserProfile, updateUserRole } from '@/services/auth'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
const formSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    age: Joi.number().required(),
    address: Joi.string().required(),
    imgUser: Joi.string().required(),
    gender: Joi.boolean().required()
})

type useAuthMutationProps = {
    action: 'UPDATE' | 'UPDATEROLE' | 'ADD' | 'UPDATEAUTH'
    defaultValues?: IAuth
    onSuccess?: () => void
}
export const useAuthMutation = ({
    action,
    defaultValues = {
        name: '',
        email: '',
        phone: '',
        address: '',
        imgUser: '',
        age: 0,
        gender: true,
        jobPosition: '',
        employee: ''
    },
    onSuccess
}: useAuthMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: IAuth) => {
            switch (action) {
                case 'UPDATEROLE':
                    return await updateUserRole(user)
                case 'UPDATE':
                    return await updateUserProfile(user)
                case 'ADD':
                    return await createAuth(user)
                case 'UPDATEAUTH':
                    return await editAuth(user)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['AUTH']
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
    return {
        form,
        onSubmit,
        ...rest
    }
}
