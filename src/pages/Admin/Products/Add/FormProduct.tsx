import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select, Upload, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import { SlClose } from 'react-icons/sl'
import '@/styles/FormProduct.css'
import { IoMdAdd } from 'react-icons/io'
import { Modal, Space } from 'antd'
import FromAddColorOfSize from '../FormAddColorOfSize'
import { formatPriceBootstrap, getRandomNumber } from '@/lib/utils'
import FormAddInfoTypeProduct from './FormAddInfoTypeProduct'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import ImageUpload from '@/lib/uploadFile'

interface Color {
    id: number
    color: string
}

interface Size {
    id: number
    size: string
}

const colorsData: Color[] = [
    { id: 1, color: 'trắng' },
    { id: 2, color: 'đen' },
    { id: 3, color: 'xanh' }
    // Thêm các màu khác nếu cần
]

const sizesData: Size[] = [
    { id: 1, size: 'S' },
    { id: 2, size: 'M' },
    { id: 3, size: 'L' }
    // Thêm các kích thước khác nếu cần
]

const FormProduct = ({ dataProduct, imageUrl, setImageUrl }: any) => {
    console.log('🚀 ~ FormProduct ~ dataProduct:', dataProduct)
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
    const [colors, setColors] = useState<Color[]>(colorsData)
    const [sizes, setSizes] = useState<Size[]>(sizesData)
    const [combinedData, setCombinedData] = useState<(Color & Size)[]>([])
    const [typeProducts, setTypeProduct] = useState<any>([])

    const updateDataColorOfSize = (dtb: string, data: any) => {
        if (dtb === 'Màu') {
            setColors((colors) => [...colors, { id: data.id, color: data.name }])
        } else {
            setSizes((sizes) => [...sizes, { id: data.id, size: data.name }])
        }
    }

    const deleteItemColor = (id: number) => {
        setColors((prevColors) => prevColors.filter((item) => item.id !== id))
    }

    const deleteItemSize = (id: number) => {
        setSizes((prevSizes) => prevSizes.filter((item) => item.id !== id))
    }

    useEffect(() => {
        const combined = colors.flatMap((color) =>
            sizes.map((size) => ({
                id: getRandomNumber(), // Sử dụng hàm tạo ID tự sinh
                color: color.color,
                size: size.size
            }))
        )
        const typeProductString = localStorage.getItem('typeProduct')
        const typeProduct = typeProductString ? JSON.parse(typeProductString) : []
        if (typeProduct) {
            setTypeProduct(typeProduct)
        }
        setTypeProduct(combined)

        setCombinedData(combined)
        setTypeProduct(combined)
    }, [colors, sizes])

    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        const typeProductString = localStorage.getItem('typeProduct')
        const typeProduct = typeProductString ? JSON.parse(typeProductString) : []
        if (typeProduct) {
            setTypeProduct(typeProduct)
        }
        setOpen(false)
    }

    const info = (name: string) => {
        Modal.info({
            content: <FromAddColorOfSize name={name} updateDataColorOfSize={updateDataColorOfSize} />
        })
    }

    //xử lý ảnh
    const handleImageUpload = (url: string) => {
        // Nhận link ảnh từ ImageUpload và lưu vào state để sử dụng trong FormProduct
        setImageUrl(url)
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '60%', textAlign: 'center' }}>
                <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>Thông tin chính sản phẩm:</h1>
                <div className='anh'>
                    <Form.Item label='Ảnh' name='image'>
                        <ImageUpload onImageUpload={handleImageUpload} />
                    </Form.Item>
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
                    <Input type='date' style={{ height: '40px', width: '100%', borderColor: 'gray' }} />
                </Form.Item>

                <Form.Item
                    label='Ngày sản xuất'
                    name='manufacture_date'
                    rules={[{ required: true, message: 'Vui lòng thêm ngày sản xuất!' }]}
                >
                    <Input type='date' style={{ height: '40px', width: '100%', borderColor: 'gray' }} />
                </Form.Item>

                <Form.Item
                    label='Ngày hết hạn'
                    name='expiry_date'
                    rules={[{ required: true, message: 'Vui lòng thêm ngày hết hạn!' }]}
                >
                    <Input type='date' style={{ height: '40px', width: '100%', borderColor: 'gray' }} />
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
            <div style={{ width: '40%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>Phân loại sản phẩm:</h1>
                    <div className='them_phan_loai' style={{ textAlign: 'left' }}>
                        <Button
                            type='primary'
                            onClick={showDrawer}
                            style={{ color: '#6AC4D8', marginBottom: '10px', borderColor: '#6AC4D8' }}
                        >
                            Thêm phân loại sản phẩm
                        </Button>
                        <Drawer title='Màu - Kích cỡ' width={'auto'} closable={false} onClose={onClose} open={open}>
                            <h3 style={{ fontSize: '20px', fontWeight: '500' }}>Màu</h3>
                            <hr />
                            <div className='colors'>
                                {colors.map((item: any) => (
                                    <div
                                        key={item.id + item.color}
                                        className='color'
                                        style={{
                                            fontSize: '15px',
                                            padding: '5px',
                                            border: '1px solid blue',
                                            borderRadius: '10px',
                                            color: 'blue',
                                            display: 'inline-block',
                                            marginRight: '10px',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {item.color}
                                        <div className='xxxx' onClick={() => deleteItemColor(item.id)}>
                                            <SlClose />
                                        </div>
                                    </div>
                                ))}
                                <Space wrap>
                                    <div
                                        className='color_add'
                                        style={{
                                            fontSize: '30px',
                                            color: 'blue'
                                        }}
                                        onClick={() => info('Màu')}
                                    >
                                        <IoMdAdd />
                                    </div>
                                </Space>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '500', marginTop: '30px' }}>Kích cỡ</h3>
                            <hr />
                            <div className='sizes'>
                                {sizes.map((item: any) => (
                                    <div
                                        key={item.id + item.size}
                                        className='size'
                                        style={{
                                            fontSize: '15px',
                                            padding: '5px',
                                            border: '1px solid green',
                                            color: 'green',
                                            borderRadius: '10px',
                                            display: 'inline-block',
                                            marginRight: '10px',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {item.size}
                                        <div className='xxxxx' onClick={() => deleteItemSize(item.id)}>
                                            <SlClose />
                                        </div>
                                    </div>
                                ))}
                                <Space wrap>
                                    <div
                                        className='size_add'
                                        style={{
                                            fontSize: '30px',
                                            color: 'green'
                                        }}
                                        onClick={() => info('Size')}
                                    >
                                        <IoMdAdd />
                                    </div>
                                </Space>
                            </div>
                            <div style={{ marginTop: '50px' }}>
                                <FormAddInfoTypeProduct data={combinedData} onClose={onClose} />
                            </div>
                        </Drawer>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Loại</th>
                            <th>Số lượng</th>
                            <th>Khối lượng</th>
                            <th>Giá tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeProducts.map((item: any) => (
                            <tr key={item.color + item.id}>
                                <td>
                                    {item?.color} x {item?.size}
                                    <br />
                                    <img src={item?.image} alt='?' width={'70px'} />
                                </td>
                                <td>{item?.quantity ? item?.quantity : '?'}</td>
                                <td>{item?.weight ? item?.weight : '?'}</td>
                                {item?.price ? (
                                    <td
                                        style={{ fontWeight: 700 }}
                                        dangerouslySetInnerHTML={{
                                            __html: formatPriceBootstrap(item?.price)
                                        }}
                                    ></td>
                                ) : (
                                    <td>? </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FormProduct
