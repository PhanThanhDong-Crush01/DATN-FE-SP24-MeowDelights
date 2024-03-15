import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Select, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useContactQuery } from '@/hooks/Contact/useContactQuery'
import { formatPriceBootstrap } from '@/lib/utils'
import { DeleteOutlined } from '@ant-design/icons'
import { toast } from '@/components/ui/use-toast'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { useContactMutation } from '@/hooks/Contact/useContactMutation'

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
    createdAt: any
    time: any
    date: any
}

const ListContact = () => {
    const { data, refetch }: any = useContactQuery()
    const staff = 2
    const { dataAuthWithRole }: any = useAuthQuery('', staff)
    const [selectAuth, setselectAuth] = useState<any>()
    useEffect(() => {
        if (dataAuthWithRole?.user) {
            setselectAuth(
                dataAuthWithRole?.user.map((auth: any) => {
                    return {
                        value: auth._id,
                        label: auth.employee + ' - ' + auth.name
                    }
                })
            )
        }
    }, [dataAuthWithRole])

    const [dataContact, setDataContact] = useState<any>()
    useEffect(() => {
        if (data) {
            setDataContact(
                data?.datas.map((item: any) => {
                    // Tạo một đối tượng Date từ createdAt của mỗi item
                    const createdAtDate = new Date(item.createdAt)

                    // Lấy ngày, tháng, năm từ đối tượng Date
                    const day = createdAtDate.getDate().toString().padStart(2, '0')
                    const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0')
                    const year = createdAtDate.getFullYear().toString().slice(-2)

                    // Định dạng lại chuỗi ngày tháng
                    const formattedDate = `${day}/${month}/${year}`

                    return {
                        ...item,
                        key: item._id,
                        date: formattedDate, // Thêm biến date vào dataContact
                        time: createdAtDate.toLocaleTimeString('en-GB', { hour12: false }) // Thêm biến time vào dataContact
                    }
                })
            )
        }
    }, [data])

    const { onSubmit } = useContactMutation({
        action: 'SetStaff',
        onSuccess: () => {
            refetch()
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
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            width: '4%',
            render: (_, record) => (
                <div>
                    <p>{record?.time}</p>
                    <p>{record?.date}</p>
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
                    <i>{record?.nhanVien?.employee}</i>
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
                    //onConfirm={() => onRemove(record)}
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
    const [staffUser, setStaff] = useState<any>()
    const handleSelectChange = (value: any) => {
        setStaff(value)
    }
    const start = () => {
        setLoading(true)
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([])
            setLoading(false)
        }, 1000)
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // Kiểm tra nếu có bất kỳ dòng nào trong newSelectedRowKeys
        // mà có idOrder không rỗng, thì không cập nhật selectedRowKeys
        const hasIdOrder = newSelectedRowKeys.some((key) => {
            const record = dataContact.find((item: any) => item.key === key)
            return record && record.idOrder
        })

        if (!hasIdOrder) {
            setSelectedRowKeys(newSelectedRowKeys)
        } else {
            // Bạn có thể cung cấp một thông báo cho người dùng
            // để thông báo rằng các dòng này không thể được chọn.
            toast({
                variant: 'destructive',
                title: 'Không thể giao cho nhân viên khác rõ đã hỗ trợ đặt đơn thành công!'
            })
        }
    }

    const hanldeSubmit = async () => {
        if (!staffUser) {
            toast({
                variant: 'destructive',
                title: 'Mời chọn nhân viên để liên hệ với khách hàng!'
            })
        } else if (selectedRowKeys.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Mời chọn khách hàng để liên hệ!'
            })
        } else {
            await onSubmit({ idContacts: selectedRowKeys, idNV: staffUser.value })
            toast({
                variant: 'success',
                title: 'Giao liên hệ cho nhân viên chuyên ngành thành công!!'
            })
        }
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
            </div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button
                        type='primary'
                        onClick={start}
                        disabled={!hasSelected}
                        loading={loading}
                        style={{ backgroundColor: '#94C4D9' }}
                    >
                        Reload
                    </Button>
                    {/* <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span> */}
                </div>
                <div>
                    <Select
                        className='h-8 w-48'
                        labelInValue
                        defaultValue={{ value: '', label: 'Chọn nhân viên' }}
                        onChange={handleSelectChange}
                        options={selectAuth}
                    ></Select>
                    <button className='btn btn-primary h-8' onClick={hanldeSubmit}>
                        Lưu
                    </button>
                </div>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataContact} />
        </div>
    )
}

export default ListContact
