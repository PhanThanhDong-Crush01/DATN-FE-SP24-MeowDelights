import { Button, Form } from 'antd'
import FormProduct from './FormProduct'
import { useProductMutation } from '@/hooks/Product/useProductMutation'
import { toast } from '@/components/ui/use-toast'

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

const EditProduct = () => {
    const { onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess() {
            toast({
                variant: 'success',
                title: 'Thêm sản phẩm thành công!!',
                description: 'Quay lại trang quản lý sản phẩm để kiểm tra sản phẩm vừa thêm!'
            })
        }
    })

    const onFinish = (values: any) => {
        const typeProductString = localStorage.getItem('typeProduct')
        const typeProduct = typeProductString ? JSON.parse(typeProductString) : []

        const addNew = {
            product: {
                name: values.name,
                image: values.image,
                import_date: values.import_date,
                expiry: `${values.manufacture_date} - ${values.expiry_date}`,
                status: true,
                description: values.description,
                idCategory: values.idCategory
            },
            typeProduct: typeProduct
        }
        onSubmit(addNew)
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
                                <FormProduct />
                            </div>
                            <div className='form_right'></div>
                        </div>

                        <Form.Item
                            wrapperCol={{ offset: 6, span: 16 }}
                            style={{ margin: '30px', textAlign: 'center', marginLeft: '-200px' }}
                        >
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='btn'
                                style={{
                                    width: '30%',
                                    height: '70px',
                                    border: '1px solid blue',
                                    color: 'red',
                                    backgroundColor: '#1C2434'
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

export default EditProduct
