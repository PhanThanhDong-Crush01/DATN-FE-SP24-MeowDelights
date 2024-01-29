import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Modal, Popconfirm, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import '@/styles/Cate.css'
import { useTypeVoucherQuery } from '@/hooks/TypeVoucher/useTypeVoucherQuery'
import { useTypeVoucherMutation } from '@/hooks/TypeVoucher/useTypeVoucherMutation'
import { toast } from '@/components/ui/use-toast'
import AddTypeVc from './AddTypeVc'

interface DataType {
    key: string
    _id: string
    name: string
}
const ListTypeVoucher = () => {
    const { data }: any = useTypeVoucherQuery()
    console.log('🚀 ~ ListTypeVoucher ~ data:', data)
    const { onRemove } = useTypeVoucherMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá danh mục khuyến mại thành công!!',
                description: 'Danh mục khuyến mại đã bị xóa'
            })
        }
    })
    const { onSubmit } = useTypeVoucherMutation({
        action: 'UPDATE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật danh mục khuyến mại thành công!'
            })
        }
    })

    const dataWithKeys = data?.datas.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // form để edit type voucher
    const [editVoucherName, setEditVoucherName] = useState('')
    const [editedVoucherId, setEditedVoucherId] = useState(null)

    const handleEditVoucher = (id: any, name: any) => {
        setEditedVoucherId(id)
        setEditVoucherName(name)
    }

    const handleSaveEdit = () => {
        onSubmit({
            _id: editedVoucherId,
            name: editVoucherName
        })

        // Reset state after saving
        setEditedVoucherId(null)
        setEditVoucherName('')
    }

    const handleCancelEdit = () => {
        // Reset state on cancel
        setEditedVoucherId(null)
        setEditVoucherName('')
    }
    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
        },
        {
            title: 'Tên loại danh mục mã khuyến mại',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <input
                        className='border border-gray-300 rounded-md'
                        style={{ overflow: 'hidden', display: 'block', width: '100%', height: '100%', padding: '6px' }}
                        type='text'
                        value={editVoucherName}
                        onChange={(e) => setEditVoucherName(e.target.value)}
                        placeholder='Loại Voucher'
                    />
                ) : (
                    record.name
                )
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle' style={{ textAlign: 'center' }}>
                    {editedVoucherId === record._id ? (
                        <div style={{}}>
                            <button onClick={handleSaveEdit} className='bg-blue-500 px-2 py-1 rounded text-white'>
                                Lưu
                            </button>
                            &nbsp; &nbsp;
                            <button onClick={handleCancelEdit} className='bg-red-500 px-2 py-1 rounded text-white'>
                                Hủy
                            </button>
                        </div>
                    ) : (
                        <Button type='primary' onClick={() => handleEditVoucher(record._id, record.name)} ghost>
                            <EditOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    )}

                    <Popconfirm
                        placement='topRight'
                        title='Xóa bài viết?'
                        description='Bạn có chắc chắn xóa bài viết này không?'
                        onConfirm={() => onRemove(record)}
                        okText='Đồng ý'
                        cancelText='Không'
                    >
                        <Button type='primary' danger>
                            <DeleteOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <div className='flex justify-between items-center mx-[10px] my-3'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Loại mã khuyến mại
                    </p>
                </div>
                <div className='flex justify-end mb-2 mr-10 mt-5'>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className='bg-[#1677ff]'
                        onClick={showModal}
                    ></Button>
                </div>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <AddTypeVc />
                </Modal>
            </div>
            <Table columns={columns} dataSource={dataWithKeys} />
        </div>
    )
}

export default ListTypeVoucher
