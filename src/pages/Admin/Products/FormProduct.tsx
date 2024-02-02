import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select, Upload, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import { SlClose } from 'react-icons/sl'
import '@/styles/FormProduct.css'
import { IoMdAdd } from 'react-icons/io'
import { Modal, Space } from 'antd'
import FromAddColorOfSize from './FormAddColorOfSize'
import { getRandomNumber } from '@/lib/utils'
import FormAddInfoTypeProduct from './FormAddInfoTypeProduct'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'

const { RangePicker } = DatePicker
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

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

const FormProduct = () => {
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

        setCombinedData(combined)
    }, [colors, sizes])

    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        const typeProductString = localStorage.getItem('typeProduct')
        const typeProduct = typeProductString ? JSON.parse(typeProductString) : []
        console.log('🚀 ~ FormProduct ~ typeProduct:', typeProduct)
        setOpen(false)
    }

    const info = (name: string) => {
        Modal.info({
            content: <FromAddColorOfSize name={name} updateDataColorOfSize={updateDataColorOfSize} />
        })
    }
    return (
        <div style={{ width: '100%' }}>
            <Form.Item
                label='Tên sản phẩm'
                name='name'
                rules={[{ required: true, message: 'Vui lòng nhập Tên sản phẩm!' }]}
            >
                <Input style={{ height: '40px', width: '100%' }} />
            </Form.Item>

            {/* <Form.Item label='Ảnh sản phẩm' valuePropName='fileList' getValueFromEvent={normFile}>
                <Upload action='/upload.do' listType='picture-card'>
                    <button style={{ border: 0, background: 'none' }} type='button'>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Tải lên file</div>
                    </button>
                </Upload>
            </Form.Item> */}

            <Form.Item
                label='Ảnh '
                name='image'
                rules={[
                    {
                        required: true,
                        message: `Vui lòng nhập ảnh của sản phẩm!`
                    }
                ]}
            >
                <Input style={{ height: '40px', width: '100%' }} placeholder='Nhập link ảnh ở đây' />
            </Form.Item>

            <Form.Item
                label='Ngày nhập'
                name='import_date'
                rules={[{ required: true, message: 'Vui lòng thêm ngày nhập hàng!' }]}
            >
                <input type='date' style={{ height: '40px', width: '50%' }} />
            </Form.Item>

            <Form.Item
                label='Ngày sản xuất'
                name='manufacture_date'
                rules={[{ required: true, message: 'Vui lòng thêm ngày sản xuất!' }]}
            >
                <input type='date' style={{ height: '40px', width: '50%' }} />
            </Form.Item>

            <Form.Item
                label='Ngày hết hạn'
                name='expiry_date'
                rules={[{ required: true, message: 'Vui lòng thêm ngày hết hạn!' }]}
            >
                <input type='date' style={{ height: '40px', width: '50%' }} />
            </Form.Item>

            <Form.Item
                label='Danh mục'
                name='idCategory'
                rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
            >
                <Select
                    style={{ height: '40px', width: '100%', background: 'white' }}
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
                <Input.TextArea style={{ height: '160px', background: 'white' }} />
            </Form.Item>

            <div className='them_phan_loai' style={{ textAlign: 'center' }}>
                <Button type='primary' onClick={showDrawer} style={{ color: 'red' }}>
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
                    {/* <Button type='primary' onClick={showChildrenDrawer} style={{ color: 'blue', marginTop: '30px' }}>
                        Thêm Ảnh - Giá
                    </Button>
                    <Drawer
                        title='Ảnh - Khối lượng - Giá - Số lượng'
                        width={'auto'}
                        closable={false}
                        onClose={onChildrenDrawerClose}
                        open={childrenDrawer}
                    >
                        <FormAddInfoTypeProduct data={combinedData} closeDrawer={closeDrawer} />
                    </Drawer> */}
                </Drawer>
            </div>
        </div>
    )
}

export default FormProduct
