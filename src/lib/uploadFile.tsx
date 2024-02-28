import React, { useState } from 'react'
import { Modal, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

const ImageUpload = ({ onImageUpload }: { onImageUpload: (imageUrl: string) => void }) => {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [previewTitle, setPreviewTitle] = useState<string>('')
    const [fileList, setFileList] = useState<any[]>([])
    const [imageUrl, setImageUrl] = useState<string>('')

    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewVisible(true)
        setPreviewImage(file.url || file.preview)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    const handleChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList)
    }

    const customRequest = async (options: any) => {
        const { file, onSuccess, onError } = options
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'ecma_ph28020') // Thay 'your_cloudinary_upload_preset' bằng upload preset của bạn

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dsi8kycrz/image/upload', // Thay 'your_cloud_name' bằng tên cloud của bạn
                formData
            )
            const imageUrl = response.data.secure_url
            setImageUrl(imageUrl) // Lưu link ảnh vào state
            onSuccess(response.data, file)

            // Gọi hàm callback để truyền link ảnh ra ngoài
            onImageUpload(imageUrl)
        } catch (error) {
            console.error('Error uploading image: ', error)
            onError(error)
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <div className='flex' style={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <Upload
                customRequest={customRequest}
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default ImageUpload

// Hàm helper để chuyển đổi file sang base64
const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
