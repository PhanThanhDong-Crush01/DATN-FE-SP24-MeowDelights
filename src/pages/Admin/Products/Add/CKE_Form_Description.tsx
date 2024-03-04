import { useState, useRef, useEffect } from 'react'
import { Form } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ProductFormDescription = ({ setDescriptionData }: any) => {
    const [descriptionCKData, setDescriptionCKData] = useState<string>('')
    const formRef = useRef<any>(null)
    useEffect(() => {
        if (descriptionCKData !== '') {
            setDescriptionData(descriptionCKData) // Sửa đổi này để truyền dữ liệu mới lên FormProduct
        }
    }, [descriptionCKData, setDescriptionData])

    return (
        <>
            <Form ref={formRef}>
                <Form.Item name='description'>
                    <CKEditor
                        editor={ClassicEditor}
                        data={descriptionCKData}
                        onReady={(editor) => {
                            editor.editing.view.change((writer: any) => {
                                writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                            })
                        }}
                        onChange={(event, editor: any) => {
                            const data = editor.getData()
                            setDescriptionCKData(data)
                        }}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default ProductFormDescription
