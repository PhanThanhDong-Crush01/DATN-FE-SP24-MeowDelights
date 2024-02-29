import { toast } from '@/components/ui/use-toast'
import { Button, Form, Input, InputNumber } from 'antd'
import axios from 'axios'
import React from 'react'
import { useRef } from 'react'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

const uploadImageAndGetURL = async (imageFile: any) => {
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'ecma_ph28020') // Thay 'your_cloudinary_upload_preset' bằng upload preset của bạn

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dsi8kycrz/image/upload', // Thay 'your_cloud_name' bằng tên cloud của bạn
            formData
        )
        return response.data.secure_url
    } catch (error) {
        console.error('Error uploading image: ', error)
        return null
    }
}
const FormAddInfoTypeProduct = ({ data, onClose }: any) => {
    const colorAndSizes: any = []

    data.forEach((item: any) => {
        const existingItem = colorAndSizes.find((element: any) => element.color === item.color)

        if (existingItem) {
            existingItem.dataSize.push({ size: item.size })
        } else {
            colorAndSizes.push({
                id: item.id,
                color: item.color,
                dataSize: [{ size: item.size }]
            })
        }
    })
    const fileInputRef: any = useRef(null)

    const onFinish = async (values: any) => {
        const typeProduct = []

        for (const key in values) {
            if (Object.hasOwnProperty.call(values, key)) {
                const [color, id, size] = key.split('_')

                if (size === 'image') {
                    console.log('🚀 ~ onFinish ~ fileInputRef:', fileInputRef.current.files)
                    const file = fileInputRef.current.files[0]
                    if (file) {
                        const imageUrl = await uploadImageAndGetURL(file)
                        values[key] = imageUrl
                    }
                }

                let product: any = typeProduct.find((item) => item.color === color && item.size === size)
                if (!product) {
                    product = {
                        color: color,
                        size: size,
                        price: values[`${color}_${id}_${size}_price`],
                        quantity: values[`${color}_${id}_${size}_quantity`],
                        weight: values[`${color}_${id}_${size}_weight`],
                        image: values[`${color}_${id}_image`]
                    }
                    typeProduct.push(product)
                }
            }
            localStorage.setItem('typeProduct', JSON.stringify(typeProduct))
            toast({
                variant: 'success',
                title: 'Thêm thông tin phân loại phẩm thành công!!'
            })
            onClose(true)
        }
    }
    return (
        <Form {...layout} name='control-hooks' onFinish={onFinish}>
            {colorAndSizes.map((item: any) => (
                <React.Fragment key={item.id}>
                    <div
                        className='flex'
                        style={{ justifyContent: 'space-around', alignItems: 'self-start', height: '50px' }}
                    >
                        <h3 style={{ fontSize: '30px', marginRight: '20px' }}>{item.color.toUpperCase()}</h3>
                        <Form.Item name={`${item.color}_${item.id}_image`}>
                            <Input type='file' ref={fileInputRef} />
                        </Form.Item>
                    </div>
                    <table style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Căn nặng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.dataSize.map((size: any) => (
                                <tr key={`${item.id}-${size.size}`}>
                                    <td>{size.size}</td>
                                    <td>
                                        <Form.Item
                                            name={`${item.color}_${item.id}_${size.size}_price`}
                                            rules={[
                                                { required: true, message: `Vui lòng nhập giá của size ${size.size}!` }
                                            ]}
                                        >
                                            <InputNumber prefix='đ' min={1} />
                                        </Form.Item>
                                    </td>
                                    <td>
                                        <Form.Item
                                            name={`${item.color}_${item.id}_${size.size}_quantity`}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: `Vui lòng nhập số lượng của size ${size.size}!`
                                                }
                                            ]}
                                        >
                                            <InputNumber min={1} />
                                        </Form.Item>
                                    </td>
                                    <td>
                                        <Form.Item
                                            name={`${item.color}_${item.id}_${size.size}_weight`}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: `Vui lòng nhập cân nặng của size ${size.size}!`
                                                }
                                            ]}
                                        >
                                            <Input style={{ height: '30px', width: 'auto' }} />
                                        </Form.Item>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' style={{ color: 'blue', borderColor: 'blue' }}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormAddInfoTypeProduct
