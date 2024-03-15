import { Button, Form } from 'antd'
import FormProduct from './FormProduct'
import { useProductMutation } from '@/hooks/Product/useProductMutation'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
}

const AddProduct = () => {
    const { onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess() {}
    })

    const [imageUrl, setImageUrl] = useState<string>('')
    const [descriptionData, setDescriptionData] = useState<string>('')

    const navigate = useNavigate()

    const onFinish = (values: any) => {
        const typeProductString = localStorage.getItem('typeProduct')
        const typeProduct = typeProductString ? JSON.parse(typeProductString) : []

        const addNew = {
            product: {
                name: values.name,
                image: imageUrl,
                import_date: values.import_date,
                expiry: `${values.manufacture_date} - ${values.expiry_date}`,
                status: true,
                description: descriptionData,
                idCategory: values.idCategory
            },
            typeProduct: typeProduct
        }
        if (typeProduct[0]?.color == undefined) {
            toast({
                variant: 'destructive',
                title: 'Bạn chưa thêm dữ liệu biến thể loại, size, số lượng,... của sản phẩm!'
            })
        } else {
            onSubmit(addNew)
            localStorage.removeItem('typeProduct')
            navigate('/admin/products')
        }
    }

    return (
        <>
            <div className='container'>
                <div className='title' style={{ fontSize: '25px', margin: '10px 0', fontWeight: '700' }}>
                    <h2>Thêm mới sản phẩm</h2>
                </div>
                <div className='form'>
                    <Form
                        {...formItemLayout}
                        variant='filled'
                        onFinish={onFinish} // Set the onFinish callback
                    >
                        <div
                            className='div'
                            style={{
                                padding: '0 5%'
                            }}
                        >
                            <div className='form_left'>
                                <FormProduct
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                    setDescriptionData={setDescriptionData}
                                />
                            </div>
                        </div>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='btn'
                                style={{
                                    width: '30%',
                                    height: '70px',
                                    borderColor: 'blue',
                                    color: 'blue'
                                }}
                            >
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AddProduct
