import React, { useState } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useContactQuery } from '@/hooks/Contact/useContactQuery'
import { Link } from 'react-router-dom'
import { formatPriceBootstrap } from '@/lib/utils'
import { DeleteOutlined } from '@ant-design/icons'
import { useCategoryMutation } from '@/hooks/Category/useCategoryMutation'
import { toast } from '@/components/ui/use-toast'

interface DataType {
    key: React.Key
    _id: string
    name: string
    phone: number
    email: string
    title: string
    message: string
    idNV: string
    statusOrder: boolean
    idOrder: string
    note: string
    nhanVien: any
    order: any
}

const ListContact = () => {
    const { data } = useContactQuery()
    const dataContact = data?.datas.map((item: any, index: any) => ({
        ...item,
        key: item._id
    }))
    const { onRemove } = useCategoryMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá liên hệ thành công!!'
            })
        }
    })

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Người liên hệ',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (_, record) => (
                <div>
                    <h1 style={{ fontSize: '18px' }}>{record?.name.toUpperCase()}</h1>
                    <p>{record?.phone}</p>
                    <p>{record?.email}</p>
                </div>
            )
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '15%'
        },
        {
            title: 'Nội dung',
            dataIndex: 'message',
            key: 'message',
            width: '25%'
        },
        {
            title: 'Nhân viên liên hệ',
            dataIndex: 'idNV',
            key: 'idNV',
            width: '15%',
            render: (_, record) => (
                <div>
                    <h1 style={{ fontSize: '18px' }}>{record?.nhanVien?.name.toUpperCase()}</h1>
                    <p>{record?.nhanVien?.phone}</p>
                </div>
            )
        },
        {
            title: 'Trạng thái chốt đơn',
            dataIndex: 'statusOrder',
            key: 'statusOrder',
            width: '10%',
            render: (_, record) => (
                <div>
                    {record?.statusOrder ? (
                        <h1 style={{ fontSize: '18px', color: 'green' }}>True</h1>
                    ) : (
                        <h1 style={{ fontSize: '18px', color: 'red' }}>False</h1>
                    )}
                </div>
            )
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'idOrder',
            key: 'idOrder',
            width: '10%',
            render: (_, record) => (
                <div>
                    {record?.order?.money != null ? (
                        <h1
                            style={{ fontSize: '20px' }}
                            dangerouslySetInnerHTML={{
                                __html: formatPriceBootstrap(record?.order?.money)
                            }}
                        ></h1>
                    ) : (
                        ''
                    )}
                </div>
            )
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: '10%'
        },
        {
            dataIndex: '',
            key: 'x',
            width: '5%',
            render: (_, record) => (
                <Popconfirm
                    placement='topRight'
                    title='Xóa liên hệ?'
                    description='Bạn có chắc chắn xóa liên hệ này không?'
                    onConfirm={() => onRemove(record)}
                    okText='Đồng ý'
                    cancelText='Không'
                >
                    <Button type='primary' danger>
                        <DeleteOutlined style={{ display: 'inline-flex' }} />
                    </Button>
                </Popconfirm>
            )
        }
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [loading, setLoading] = useState(false)

    const start = () => {
        setLoading(true)
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([])
            setLoading(false)
        }, 1000)
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0

    return (
        <div>
            <div className='flex justify-between items-center mx-[10px] my-3'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Danh sách liên hệ
                    </p>
                </div>
                {/* <div className='flex justify-end mb-2 mr-10 mt-5'>
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                type='primary'
                                icon={<PlusCircleOutlined />}
                                size={'large'}
                                className='bg-[#1677ff]'
                            ></Button>
                        </SheetTrigger>
                        <AddCategory />
                    </Sheet>
                </div> */}
            </div>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type='primary'
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                    style={{ backgroundColor: '#94C4D9' }}
                >
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataContact} />
        </div>
    )
}

export default ListContact
