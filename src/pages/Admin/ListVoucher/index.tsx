import { useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusSquareOutlined, SearchOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'
import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { toast } from '@/components/ui/use-toast'
import AddVoucher from './AddVoucher'
import { formatPrice } from '@/lib/utils'
import { Link } from 'react-router-dom'
type InputRef = GetRef<typeof Input>

interface DataType {
    key: string
    _id: string
    name: string
    status: boolean
    quantity: number
    decrease: number
    expiry: string
    conditions: string
    idTypeVoucher: string
    type_voucher: any
}

type DataIndex = keyof DataType

const Voucher = () => {
    const { data }: any = useVoucherQuery()

    const { onRemove } = useVoucherMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá thành công!!',
                description: 'Danh mục khuyến mại đã bị xóa'
            })
        }
    })

    const dataVoucher = data?.datas.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    // const handleOk = () => {
    //     setIsModalOpen(false)
    // }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const searchInput = useRef<InputRef>(null)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }
    const getStatusLabel = (status: boolean) => (status ? 'Còn voucher' : 'Hết voucher')

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
    })
    // bảng table
    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
        },
        {
            title: 'Tên voucher',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            render: (_, record) => (
                <div>
                    <h1 style={{ fontSize: '18px' }}>{record.name}</h1>
                    <p style={{ fontSize: '12px' }}>Mã: {record._id}</p>
                </div>
            )
        },
        {
            title: 'Giảm',
            dataIndex: 'decrease',
            key: 'decrease',
            width: '10%',
            // ...getColumnSearchProps('decrease'),
            render: (_, record) => (
                <p
                    className='text-base '
                    dangerouslySetInnerHTML={{
                        __html: formatPrice(record?.decrease)
                    }}
                ></p>
            )
        },
        {
            title: 'Điều kiện',
            dataIndex: 'conditions',
            key: 'conditions',
            width: '10%',
            render: (_, record: any) => (
                <p
                    className='text-base '
                    dangerouslySetInnerHTML={{
                        __html: formatPrice(record?.conditions)
                    }}
                ></p>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10% ',
            render: (_, record) => getStatusLabel(record.status)
            // <option value='record.status'></option>
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10% ',
            render: (_, record) => record.quantity
        },

        {
            title: 'Hết hạn',
            dataIndex: 'expiry',
            key: 'expiry',
            width: '20%',
            ...getColumnSearchProps('expiry'),
            sorter: (a, b) => a.expiry.length - b.expiry.length,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => record.expiry
        },

        {
            title: 'Loại mã',
            dataIndex: 'idTypeVoucher',
            key: 'idTypeVoucher',
            width: '20%',
            render: (_, record) => record.type_voucher.name
        },

        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`edit/${record._id}`} type='primary' ghost>
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Link>

                    <Popconfirm
                        placement='topRight'
                        title='Xóa mã khuyến mại?'
                        description='Bạn có chắc chắn xóa mã khuyến mại này không?'
                        onConfirm={() => onRemove(record)}
                        onCancel={cancel}
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
    const cancel = () => {
        message.error('Đã hủy!')
    }
    return (
        <div>
            <div className='flex justify-between items-center mx-[50px]'>
                <div>
                    <p className='text-[20px]'>Phiếu giảm giá </p>
                </div>
                <div className='flex justify-end mb-2'>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className='bg-[#1677ff]'
                        onClick={showModal}
                    ></Button>
                </div>
                <Modal open={isModalOpen} onCancel={handleCancel}>
                    <AddVoucher />
                </Modal>
            </div>
            <Table columns={columns} dataSource={dataVoucher} />
            {/* form */}
        </div>
    )
}

export default Voucher
