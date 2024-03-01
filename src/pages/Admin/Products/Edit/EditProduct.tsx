import { useProductMutation } from '@/hooks/Product/useProductMutation'
import { toast } from '@/components/ui/use-toast'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { formatPriceBootstrap } from '@/lib/utils'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'
import ImageUpload from '@/lib/uploadFile'
import { useParams } from 'react-router-dom'
import instance from '@/services/core/api'
import { FaRegEdit } from 'react-icons/fa'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { EditTypeProduct } from './EditTypeProduct'
import { AddTypeProduct } from './AddTypeProduct'
import { IoMdAdd } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
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
    const [typeProduct, setTypeProduct] = useState<any>()
    const [thayDoiTypeProduct, setThayDoiTypeProduct] = useState(false)

    const handleTypeProductChange = () => {
        setThayDoiTypeProduct(true)
    }
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get(`/type_product/pro/${id}`)
                setTypeProduct(data?.data)
            } catch (error) {
                console.error('Error fetching product data:', error)
            }
        }
        fetchData()
    }, [thayDoiTypeProduct])

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
        const product = {
            _id: id,
            name: values.name,
            image: imageUrl ? imageUrl : productOne?.data?.image,
            import_date: values.import_date,
            expiry: `${values.manufacture_date} - ${values.expiry_date}`,
            status: true,
            description: values.description,
            idCategory: values.idCategory
        }
        onSubmit(product)
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

    //xử lý ảnh
    const handleImageUpload = (url: string) => {
        // Nhận link ảnh từ ImageUpload và lưu vào state để sử dụng trong FormProduct
        setImageUrl(url)
    }

    const onRemoveTypeProduct = async (id: any) => {
        const response = await instance.delete(`/type_product/${id}`)
        setThayDoiTypeProduct(true)
        toast({
            variant: 'success',
            title: response.data.message
        })
    }

    return (
        <>
            <div className='container'>
                <div className='title' style={{ fontSize: '25px', margin: '10px 0', fontWeight: '700' }}>
                    <h2>Chỉnh sửa sản phẩm</h2>
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
                                        <div>
                                            <img
                                                src={productOne?.data?.image}
                                                alt='anh'
                                                style={{ width: 100, borderRadius: '10px', margin: '0 auto' }}
                                            />
                                        </div>
                                        <Form.Item
                                            label='Ảnh'
                                            name='image'
                                            style={{ margin: '20px 0', marginRight: '35px' }}
                                        >
                                            <ImageUpload onImageUpload={handleImageUpload} />
                                        </Form.Item>

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
                                        <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>Phân loại sản phẩm:</h1>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Loại</th>
                                                    <th>Số lượng</th>
                                                    <th>Khối lượng</th>
                                                    <th>Giá tiền</th>
                                                    <th>
                                                        {' '}
                                                        <Sheet>
                                                            <SheetTrigger>
                                                                <Button type='primary'>
                                                                    <IoMdAdd
                                                                        style={{
                                                                            fontSize: '18px',
                                                                            color: 'blue'
                                                                        }}
                                                                    />
                                                                </Button>
                                                            </SheetTrigger>
                                                            <AddTypeProduct
                                                                onTypeProductChange={handleTypeProductChange}
                                                            />
                                                        </Sheet>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {typeProduct &&
                                                    typeProduct.map((item: any) => (
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
                                                            <td style={{ width: '10%' }}>
                                                                <Sheet>
                                                                    <SheetTrigger>
                                                                        <Button type='primary'>
                                                                            <FaRegEdit
                                                                                style={{
                                                                                    fontSize: '18px',
                                                                                    color: 'orange'
                                                                                }}
                                                                            />
                                                                        </Button>
                                                                    </SheetTrigger>
                                                                    <EditTypeProduct
                                                                        id={item?._id}
                                                                        onTypeProductChange={handleTypeProductChange}
                                                                    />
                                                                </Sheet>
                                                                <Button
                                                                    type='primary'
                                                                    onClick={() => onRemoveTypeProduct(item._id)}
                                                                >
                                                                    <RiDeleteBin5Line
                                                                        style={{
                                                                            fontSize: '18px',
                                                                            color: 'red'
                                                                        }}
                                                                    />
                                                                </Button>
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
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditProduct
