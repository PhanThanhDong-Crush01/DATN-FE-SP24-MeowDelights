import { toast } from '@/components/ui/use-toast'
import ImageUpload from '@/lib/uploadFileHights'
import { Button, Form, Input, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

const FormAddInfoTypeProduct = ({ data, onClose, handleDeleteSize }: any) => {
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

    const [dataImage, setDataImage] = useState<any>([])
    const [imageUrl, setImageUrl] = useState<any>()
    useEffect(() => {
        if (imageUrl) {
            // Kiểm tra xem có classImage trùng lặp không
            const index = dataImage.findIndex((image: any) => image.classImage === imageUrl.classImage)

            if (index !== -1) {
                // Nếu có classImage trùng lặp, thay thế đối tượng ảnh cũ bằng ảnh mới
                const newDataImage = [...dataImage]
                newDataImage[index] = imageUrl
                setDataImage(newDataImage)
            } else {
                // Nếu không có classImage trùng lặp, thêm ảnh mới vào dataImage
                setDataImage((prevDataImage: any) => [...prevDataImage, imageUrl])
            }
        }
    }, [imageUrl])
    const handleImageUpload = (url: any) => {
        setImageUrl(url)
    }

    const onFinish = (values: any) => {
        const mergedData: any = {}

        // Gộp các phần tử từ mảng values vào đối tượng mergedData
        Object.keys(values).forEach((key) => {
            mergedData[key] = values[key]
        })

        // Gộp các phần tử từ mảng dataImage vào đối tượng mergedData
        dataImage.forEach((item: any) => {
            mergedData[item.classImage] = item.urlImage
        })

        const typeProduct: any[] = []

        Object.keys(mergedData).forEach((key) => {
            const [color, id, size] = key.split('_')

            if (size === 'image') return

            let product = typeProduct.find((item) => item.color === color)
            if (!product) {
                if (mergedData[`${color}_${id}_image`] == undefined) {
                    toast({
                        variant: 'destructive',
                        title: `Ảnh của ${color} - ${size} không được để trống`
                    })
                    return // Dừng vòng lặp khi gặp lỗi
                } else {
                    product = {
                        color: color,
                        size: size,
                        price: mergedData[`${color}_${id}_${size}_price`],
                        quantity: mergedData[`${color}_${id}_${size}_quantity`],
                        weight: mergedData[`${color}_${id}_${size}_weight`],
                        image: mergedData[`${color}_${id}_image`]
                    }
                    typeProduct.push(product)
                }
            }
        })
        if (typeProduct.length === 0) return

        localStorage.setItem('typeProduct', JSON.stringify(typeProduct))
        onClose(true)
    }
    return (
        <Form {...layout} name='control-hooks' onFinish={onFinish}>
            {colorAndSizes.map((item: any) => (
                <React.Fragment key={item.id}>
                    <div className='flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '30px', marginRight: '20px' }}>{item.color.toUpperCase()}</h3>
                        <Form.Item>
                            <ImageUpload
                                classImage={`${item.color}_${item.id}_image`}
                                onImageUpload={handleImageUpload}
                            />
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
                                                { required: true, message: `Vui lòng nhập giá của size ${size.size}!` },
                                                { type: 'number', min: 1000, message: `Giá không được nhỏ hơn 1000!` }
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
                                                },
                                                { type: 'number', min: 10, message: `Số lượng không được nhỏ hơn 10!` }
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
                                            <Input style={{ height: '30px', width: '100px' }} />
                                        </Form.Item>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => handleDeleteSize(item.color, size.size)}
                                            type='primary'
                                            danger
                                        >
                                            Xóa size {size.size} khỏi {item.color}
                                        </Button>
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
