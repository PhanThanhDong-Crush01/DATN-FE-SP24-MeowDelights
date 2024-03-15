import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'
import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { toast } from '@/components/ui/use-toast'
import AddVoucher from './AddVoucher'
import { formatPrice } from '@/lib/utils'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '@/styles/listVouherAdmin.css'
type InputRef = GetRef<typeof Input>

interface DataType {
    key: string
    _id: string
    name: string
    status: boolean
    quantity: number
    decrease: number
    expiry: Date
    startDate: Date
    conditions: string
    idTypeVoucher: string
    type_voucher: any
}

type DataIndex = keyof DataType

const Voucher = () => {
    const { data }: any = useVoucherQuery()
    const [dataVoucher, setDataVoucher] = useState<any>()
    const [dataVoucherAll, setDataVoucherAll] = useState<any>()
    useEffect(() => {
        if (data) {
            const dataVoucher = data?.datas.map((item: any, index: any) => ({
                ...item,
                key: index + 1
            }))
            setDataVoucher(
                dataVoucher.sort((a: any, b: any) => {
                    if (a.status === true && b.status === false) {
                        return -1 // a trước b
                    } else if (a.status === false && b.status === true) {
                        return 1 // b trước a
                    } else {
                        return 0 // Giữ nguyên vị trí
                    }
                })
            )
            setDataVoucherAll(
                dataVoucher.sort((a: any, b: any) => {
                    if (a.status === true && b.status === false) {
                        return -1 // a trước b
                    } else if (a.status === false && b.status === true) {
                        return 1 // b trước a
                    } else {
                        return 0 // Giữ nguyên vị trí
                    }
                })
            )
        }
    }, [data])

    const locVoucher = async (value: any) => {
        if (value === 'tong') {
            setDataVoucher(dataVoucherAll)
        } else if (value === 'conHieuLuc') {
            setDataVoucher(dataVoucherAll.filter((item: any) => item?.status === true))
        } else if (value === 'hetHieuLuc') {
            setDataVoucher(dataVoucherAll.filter((item: any) => item?.status === false))
        } else if (value === 'hetLuotDung') {
            setDataVoucher(dataVoucherAll.filter((item: any) => item?.quantity === 0))
        } else if (value === 'hetHanSuDung') {
            setDataVoucher(dataVoucherAll.filter((item: any) => new Date(item?.expiry) < new Date()))
        }
    }

    const locVoucher = async (value: any) => {
        if (value === 'tong') {
            setDataVoucher(dataVoucherAll)
        } else if (value === 'conHieuLuc') {
            setDataVoucher(dataVoucherAll.filter((item: any) => item?.status === true))
        } else if (value === 'hetHieuLuc') {
            setDataVoucher(dataVoucherAll.filter((item: any) => item?.status === false))
        } else if (value === 'hetLuotDung') {
            setDataVoucher(dataVoucherAll.filter((item: any) => item?.quantity === 0))
        } else if (value === 'hetHanSuDung') {
            setDataVoucher(dataVoucherAll.filter((item: any) => new Date(item?.expiry) < new Date()))
        }
    }

    const { onRemove } = useVoucherMutation({
        action: 'DELETE'
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }
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
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%',
            sorter: (a: any, b: any) => a.quantity - b.quantity,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => record.quantity
        },
        {
            title: 'Giảm',
            dataIndex: 'decrease',
            key: 'decrease',
            width: '10%',
            sorter: (a: any, b: any) => a.decrease - b.decrease,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <p
                    className='text-red '
                    style={{ color: 'red' }}
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
            width: '11%',
            sorter: (a: any, b: any) => a.conditions - b.conditions,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => record?.conditions
        },

        {
            title: 'Bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '12%',
            sorter: (a, b) => {
                const startDateA: any = moment(a.startDate).toDate()
                const startDateB: any = moment(b.startDate).toDate()
                return startDateA - startDateB
            },
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => moment(record.startDate).format('YYYY-MM-DD')
        },
        {
            title: 'Hết hạn',
            dataIndex: 'expiry',
            key: 'expiry',
            width: '12%',
            render: (_, record) => moment(record.expiry).format('YYYY-MM-DD')
        },

        {
            title: 'Loại mã',
            dataIndex: 'idTypeVoucher',
            key: 'idTypeVoucher',
            width: '17%',
            render: (_, record) => record?.type_voucher?.name
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record: any) => (
                <Space size='middle'>
                    {record?.status && (
                        <Link to={`edit/${record._id}`} type='primary'>
                            <Button type='primary' style={{ backgroundColor: 'orange' }}>
                                <EditOutlined style={{ display: 'inline-flex' }} />
                            </Button>
                        </Link>
                    )}
                    <Popconfirm
                        placement='topRight'
                        title='Xóa mã khuyến mại?'
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

    const rowClassName = (record: DataType) => {
        return record.status === false ? 'voucher-expired' : ''
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <p className='text-[20px]'>Phiếu giảm giá </p>
                <Button
                    type='primary'
                    icon={<PlusCircleOutlined />}
                    size={'large'}
                    className='bg-[#1677ff]'
                    onClick={showModal}
                ></Button>
            </div>
            <br />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <button className='btn text-[green]' onClick={() => locVoucher('tong')}>
                    Tổng số voucher: {data?.datas.length}
                </button>
                <button className='btn text-[blue]' onClick={() => locVoucher('conHieuLuc')}>
                    Số voucher còn hiệu lực: {data?.statusTrue}
                </button>
                <button className='btn text-[red]' onClick={() => locVoucher('hetHieuLuc')}>
                    Số voucher hết hiệu lực: {data?.statusFalse}
                </button>
                <button className='btn text-[orange]' onClick={() => locVoucher('hetLuotDung')}>
                    Số voucher hết lượt dùng: {data?.daDungHet}
                </button>
                <button className='btn text-[purple]' onClick={() => locVoucher('hetHanSuDung')}>
                    Số voucher hết hạn sử dụng: {data?.soVoucherHetHan}
                </button>
            </div>


            <Modal open={isModalOpen} onCancel={handleCancel}>
                <AddVoucher />
            </Modal>
            <Table columns={columns} dataSource={dataVoucher} rowClassName={rowClassName} />
        </div>
    )
}

export default Voucher
