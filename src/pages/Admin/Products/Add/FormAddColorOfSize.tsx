import { Modal, Form, Input, Button } from 'antd'

interface Props {
    name: string
    updateDataColorOfSize: (dtb: string, data: any) => void
}

const FromAddColorOfSize = ({ name, updateDataColorOfSize }: Props) => {
    const dtb = name

    const onFinish = (values: any) => {
        dtb === 'Màu' ? addItemColor(values) : addItemSize(values)
        Modal.destroyAll()
    }

    const addItemColor = (color: any) => {
        updateDataColorOfSize(dtb, color)
    }

    const addItemSize = (size: any) => {
        updateDataColorOfSize(dtb, size)
    }

    return (
        <Modal
            title={`Thêm ${name}`}
            visible={true} // Set this to the visibility state of the modal
            onCancel={Modal.destroyAll}
            footer={null}
        >
            <Form onFinish={onFinish}>
                <Form.Item label={`${name}`} name='name' rules={[{ required: true, message: 'Không để trống!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default FromAddColorOfSize
