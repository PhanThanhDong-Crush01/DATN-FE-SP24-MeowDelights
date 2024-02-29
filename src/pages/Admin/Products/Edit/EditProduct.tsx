import { useProductMutation } from '@/hooks/Product/useProductMutation'
import { toast } from '@/components/ui/use-toast'
import { Button, Form, Input, Select, Drawer, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { formatPriceBootstrap } from '@/lib/utils'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'
import ImageUpload from '@/lib/uploadFile'
import { useParams } from 'react-router-dom'
import instance from '@/services/core/api'
import { FaRegEdit } from 'react-icons/fa'
import { EditTypeProduct } from './EditTypeProduct'

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
    const { id } = useParams()
    const [productOne, setProductOne] = useState<any>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get(`/products/${id}`)
                setProductOne(data)
            } catch (error) {
                console.error('Error fetching product data:', error)
            }
        }
        fetchData()
    }, [])

    const [form] = Form.useForm()

    const setFields = () => {
        const formattedDate = new Date(productOne?.data?.import_date).toISOString().split('T')[0]
        const [manufactureDateString, expiryDateString] = productOne?.data?.expiry.split(' - ')
        const manufactureDate = new Date(manufactureDateString).toISOString().split('T')[0]
        const expiryDate = new Date(expiryDateString).toISOString().split('T')[0]

        form.setFieldsValue({
            name: productOne?.data?.name,
            import_date: formattedDate,
            manufacture_date: manufactureDate,
            expiry_date: expiryDate,
            description: productOne?.data?.description,
            idCategory: productOne?.data?.idCategory
        })
    }

    useEffect(() => {
        if (productOne?.data) {
            setFields()
        }
    }, [productOne])

    const { onSubmit } = useProductMutation({
        action: 'UPDATE',
        onSuccess() {
            toast({
                variant: 'success',
                title: 'Sửa sản phẩm thành công!!'
            })
        }
    })

    const [imageUrl, setImageUrl] = useState<string>('') // Khai báo state để lưu trữ imageUrl

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
                description: values.description,
                idCategory: values.idCategory
            },
            typeProduct: typeProduct
        }
        console.log('🚀 ~ onFinish ~ addNew:', addNew)
        localStorage.removeItem('typeProduct')
        if (typeProduct[0]?.color == undefined) {
            toast({
                variant: 'destructive',
                title: 'Bạn chưa thêm dữ liệu biến thể loại, size, số lượng,... của sản phẩm!'
            })
        } else {
            onSubmit(addNew)
        }
    }

    const { data } = useCategoryQuery()
    const [categories, setCate] = useState()
    useEffect(() => {
        setCate(
            data?.data.map((cate: any) => {
                return {
                    value: cate?._id,
                    label: cate?.name
                }
            })
        )
    }, [data])
    const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    //xử lý ảnh
    const handleImageUpload = (url: string) => {
        // Nhận link ảnh từ ImageUpload và lưu vào state để sử dụng trong FormProduct
        setImageUrl(url)
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
                        form={form}
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
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '60%', textAlign: 'center' }}>
                                        <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>
                                            Thông tin chính sản phẩm:
                                        </h1>
                                        <div
                                            className='anh'
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'self-start'
                                            }}
                                        >
                                            <Form.Item label='Ảnh' name='image' style={{ width: '60%' }}>
                                                <ImageUpload onImageUpload={handleImageUpload} />
                                            </Form.Item>
                                            <img
                                                src={productOne?.data?.image}
                                                alt='anh'
                                                style={{ width: 100, borderRadius: '10px', marginRight: '10%' }}
                                            />
                                        </div>
                                        <Form.Item
                                            label='Tên sản phẩm'
                                            name='name'
                                            rules={[{ required: true, message: 'Vui lòng nhập Tên sản phẩm!' }]}
                                        >
                                            <Input
                                                style={{
                                                    height: '40px',
                                                    width: '100%',
                                                    borderColor: 'gray',
                                                    backgroundColor: '#F5F5F5',
                                                    borderRadius: '5px'
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label='Ngày nhập'
                                            name='import_date'
                                            rules={[{ required: true, message: 'Vui lòng thêm ngày nhập hàng!' }]}
                                        >
                                            <Input
                                                type='date'
                                                style={{ height: '40px', width: '100%', borderColor: 'gray' }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label='Ngày sản xuất'
                                            name='manufacture_date'
                                            rules={[{ required: true, message: 'Vui lòng thêm ngày sản xuất!' }]}
                                        >
                                            <Input
                                                type='date'
                                                style={{ height: '40px', width: '100%', borderColor: 'gray' }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label='Ngày hết hạn'
                                            name='expiry_date'
                                            rules={[{ required: true, message: 'Vui lòng thêm ngày hết hạn!' }]}
                                        >
                                            <Input
                                                type='date'
                                                style={{ height: '40px', width: '100%', borderColor: 'gray' }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label='Danh mục'
                                            name='idCategory'
                                            rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
                                        >
                                            <Select
                                                style={{ height: '40px', width: '100%', borderColor: 'gray' }}
                                                placeholder='Chọn danh mục'
                                                optionFilterProp='children'
                                                options={categories}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Mô tả'
                                            name='description'
                                            rules={[{ required: true, message: 'Vui lòng nhập mô tả của sản phẩm!' }]}
                                        >
                                            <Input.TextArea style={{ height: '160px', borderColor: 'gray' }} />
                                        </Form.Item>
                                    </div>
                                    <div style={{ width: '45%' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>
                                                Phân loại sản phẩm:
                                            </h1>
                                            <div className='them_phan_loai' style={{ textAlign: 'left' }}>
                                                <Button
                                                    type='primary'
                                                    onClick={showDrawer}
                                                    style={{
                                                        color: '#6AC4D8',
                                                        marginBottom: '10px',
                                                        borderColor: '#6AC4D8'
                                                    }}
                                                >
                                                    Thêm phân loại sản phẩm
                                                </Button>
                                                <Drawer
                                                    title='Màu - Kích cỡ'
                                                    width={'auto'}
                                                    closable={false}
                                                    onClose={onClose}
                                                    open={open}
                                                ></Drawer>
                                            </div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Loại</th>
                                                    <th>Số lượng</th>
                                                    <th>Khối lượng</th>
                                                    <th>Giá tiền</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productOne?.typeProduct &&
                                                    productOne?.typeProduct.map((item: any) => (
                                                        <tr key={item.color + item.id}>
                                                            <td style={{ width: '30%' }}>
                                                                {item?.color} x {item?.size}
                                                                <br />
                                                                <img src={item?.image} alt='?' width={'70px'} />
                                                            </td>
                                                            <td>{item?.quantity}</td>
                                                            <td>{item?.weight}</td>
                                                            <td
                                                                style={{ fontWeight: 700 }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: formatPriceBootstrap(item?.price)
                                                                }}
                                                            ></td>
                                                            <td>
                                                                <p onClick={showDrawer}>
                                                                    <FaRegEdit
                                                                        style={{ fontSize: '18px', color: 'red' }}
                                                                    />
                                                                </p>
                                                                <Modal
                                                                    title='Màu - Kích cỡ'
                                                                    width={'auto'}
                                                                    closable={false}
                                                                    open={open}
                                                                >
                                                                    <EditTypeProduct id={item._id} />
                                                                </Modal>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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

export default EditProduct
