import { useEffect, useRef, useState } from 'react'
import {
    DeleteOutlined,
    EditOutlined,
    FormOutlined,
    HighlightOutlined,
    PlusCircleOutlined,
    SearchOutlined
} from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Avatar, Button, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'
import { formatPrice } from '@/lib/utils'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
type InputRef = GetRef<typeof Input>
type OnChange = NonNullable<TableProps<DataType>['onChange']>
type Filters = Parameters<OnChange>[1]

type GetSingle<T> = T extends (infer U)[] ? U : never
type Sorts = GetSingle<Parameters<OnChange>[2]>
interface DataType {
    key: string
    _id: string
    username: string
    email: string
    role: string
    address: number
    age: number
    gender: boolean
    imgUser: string
    phone: string
    employee: string
    jobPosition: string
    discount_points: number
    totalBillCount: number
    totalAmount: number
}

type DataIndex = keyof DataType

const ListUserPage = () => {
    const { data }: any = useAuthQuery()
    const [dataUser, setDataUser] = useState<any>()
    useEffect(() => {
        if (data?.users) {
            setDataUser(
                data?.users.map((item: any, index: any) => ({
                    ...item,
                    key: index + 1
                }))
            )
        }
    }, [data])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }
    const [filteredInfo, setFilteredInfo] = useState<Filters>({})
    const [sortedInfo, setSortedInfo] = useState<Sorts>()

    const handleChange: OnChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter)
        setFilteredInfo(filters)
        setSortedInfo(sorter as Sorts)
    }

    const clearFilters = () => {
        setFilteredInfo({})
    }

    const clearAll = () => {
        setFilteredInfo({})
        setSortedInfo({})
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
            width: '2%',
            fixed: 'left'
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ...getColumnSearchProps('username'),
            render: (_, record) => (
                <div>
                    <h1 style={{ fontSize: '18px' }}>{record.username}</h1>
                    <p style={{ fontSize: '12px' }}>Mã: {record._id}</p>
                </div>
            ),
            fixed: 'left'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
            render: (_, record) => record.email,
            fixed: 'left'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            width: '20%',
            filters: [
                { text: 'admin', value: 'admin' },
                { text: 'member', value: 'member' }
            ],
            filteredValue: filteredInfo.role || null,
            onFilter: (value: string, record: any) => record.role.includes(value),
            fixed: 'left',
            render: (_, record) => {
                // Thay thế giá trị "member" bằng "Khách hàng" khi hiển thị
                switch (record?.role) {
                    case 'member':
                        return 'Khách hàng'
                    case 'adminProduct':
                        return 'Nhân viên quản lí sản phẩm'
                    case 'adminVoucher':
                        return 'Nhân viên quản lí Voucher '
                    case 'adminOrder':
                        return 'Nhân viên quản lí hóa đơn'
                    case 'adminContact':
                        return 'Nhân viên quản lí liên hệ'
                    case 'adminMember':
                        return 'Nhân viên quản lí bình luận, đánh giá'
                    case 'adminComment':
                        return 'Nhân viên quản lí sản phẩm'
                    case 'adminWeb':
                        return 'Quản lí cấp cao'
                    default:
                        return record?.role
                }
            }
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: '20%',

            render: (_, record) => record?.address
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
            width: '15% ',
            render: (_, record) => record.age
            // <option value='record.status'></option>
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: '15% ',
            render: (_, record) => {
                switch (record?.gender) {
                    case false:
                        return 'Nam'
                    case true:
                        return 'Nữ'
                    default:
                        return record?.gender
                }
            }
        },

        {
            title: 'Hình ảnh',
            dataIndex: 'imgUser',
            key: 'imgUser',
            width: '20%',
            // ...getColumnSearchProps('expiry'),
            // sorter: (a, b) => a.expiry.length - b.expiry.length,
            // sortDirections: ['descend', 'ascend'],
            render: (_, record) => <Avatar src={record.imgUser} alt='' />
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            render: (_, record) => record.phone
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'employee',
            key: 'employee',
            width: '20%',
            render: (_, record) => record.employee
        },
        {
            title: 'Vị trí công việc',
            dataIndex: 'jobPosition',
            key: 'jobPosition',
            width: '20%',
            render: (_, record) => record.jobPosition
        },
        {
            title: 'Tích điểm',
            dataIndex: ' discount_points',
            key: ' discount_points',
            width: '20%',
            render: (_, record) => record.discount_points
            // fixed: 'right'
        },

        {
            title: 'Tổng hóa đơn',
            dataIndex: ' totalBillCount',
            key: ' totalBillCount',
            width: '20%',
            render: (_, record) => record.totalBillCount
            // fixed: 'right'
        },
        {
            title: 'Tổng tiền',
            dataIndex: ' totalAmount',
            key: ' totalAmount',
            width: '20%',
            render: (_, record) => record.totalAmount
            // fixed: 'right'
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '20%',
            fixed: 'right',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/admin/user/edit/${record?._id}`} type='primary'>
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Link>
                    <Link to={`/admin/user/editAuth/${record?._id}`} type='primary'>
                        <FormOutlined style={{ display: 'inline-flex' }} />
                    </Link>
                </Space>
            )
        }
    ]
    const cancel = () => {
        message.error('Đã hủy!')
    }
    return (
        <div>
            <div className='flex justify-between items-center '>
                <p className='text-[30px] pb-4'>Danh sách tài khoản </p>
                <Link to={'/admin/user/add'}>
                    <Button
                        className='flex justify-center mb-2 bg-[#1677ff]'
                        type='primary'
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        onClick={showModal}
                    ></Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={dataUser} scroll={{ x: 1300 }} onChange={handleChange} />
            {/* form */}
        </div>
    )
}

export default ListUserPage
