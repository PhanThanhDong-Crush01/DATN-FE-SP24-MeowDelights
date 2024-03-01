import axios from 'axios'
export const uploadImageAndGetURL = async (imageFile) => {
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
