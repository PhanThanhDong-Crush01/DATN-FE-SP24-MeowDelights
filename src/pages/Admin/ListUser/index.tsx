import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, FormOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType, TableProps } from 'antd'
import { Avatar, Button, Input, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { deleteEmployee } from '@/services/auth'
import { formatPriceBootstrap } from '@/lib/utils'
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
            setDataUser(data.users.filter((user: any) => user.role !== 'member'))
        }
    }, [data])
    const handleDelete = (record: any) => {
        deleteEmployee(record)
    }

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
            width: '30%',
            ...getColumnSearchProps('username'),
            render: (_, record) => (
                <div>
                    <h1 style={{ fontSize: '18px' }}>{record.username}</h1>
                    <p style={{ fontSize: '15px' }}>{record.email}</p>
                    <p style={{ fontSize: '12px', marginTop: '5px', color: 'gray' }}>Mã: {record._id}</p>
                </div>
            ),
            fixed: 'left'
        },

        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            width: '15%',
            filters: [
                { text: 'admin', value: 'admin' },
                { text: 'member', value: 'member' }
            ],
            filteredValue: filteredInfo.role || null,
            onFilter: (value: string, record: any) => record.role.includes(value),
            // fixed: 'left',
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
            title: 'Công việc',
            dataIndex: 'employee',
            key: 'employee',
            width: '20%',
            render: (_, record) => (
                <div>
                    <p>Mã NV: {record.employee}</p>
                    <p>Vị trí: {record.jobPosition}</p>
                </div>
            )
        },
        {
            title: 'Thông tin cơ bản',
            dataIndex: 'address',
            key: 'address',
            width: '45%',
            render: (_, record) => (
                <div>
                    <Avatar src={record.imgUser} alt='' />
                    <p>
                        GT: &nbsp;
                        <span>
                            {record?.gender === false ? 'Nam' : record?.gender === true ? 'Nữ' : record?.gender}
                        </span>
                        &nbsp;
                        <span>- {record.age} tuổi</span>
                    </p>

                    <p>SĐT: {record.phone}</p>
                    <p>ĐC: {record?.address}</p>
                </div>
            )
        },

        {
            title: 'Tổng số hóa đơn',
            dataIndex: ' totalBillCount',
            key: ' totalBillCount',
            width: '15%',
            render: (_, record) => <div style={{ textAlign: 'center' }}>{record.totalBillCount}</div>
            // fixed: 'right'
        },
        {
            title: 'Tổng tiền',
            dataIndex: ' totalAmount',
            key: ' totalAmount',
            width: '20%',
            render: (_, record) => (
                <div
                    style={{ fontWeight: 700 }}
                    dangerouslySetInnerHTML={{
                        __html: formatPriceBootstrap(record.totalAmount)
                    }}
                ></div>
            )
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

                    <Popconfirm
                        placement='topRight'
                        title='Xóa mã nhân viên?'
                        description='Bạn có chắc chắn xóa mã nhân viên này không?'
                        onConfirm={() => handleDelete(record)}
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
