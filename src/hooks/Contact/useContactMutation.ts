import { add, remove, setStaffWithContact, update } from '@/services/contact'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type useContactMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE' | 'SetStaff'
    defaultValues?: any
    onSuccess?: () => void
}

export const useContactMutation = ({ action, defaultValues = {}, onSuccess }: useContactMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (contact: any) => {
            switch (action) {
                case 'ADD':
                    return await add(contact)
                case 'UPDATE':
                    return await update(contact)
                case 'SetStaff':
                    return await setStaffWithContact(contact)
                case 'DELETE':
                    return await remove(contact)
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
        defaultValues
    })
    const onSubmit: SubmitHandler<any> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onRemove = (contact: any) => {
        mutate(contact)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu CATEGORY
