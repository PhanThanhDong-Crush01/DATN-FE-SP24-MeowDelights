import { Button, Input, Space, Table } from 'antd'
import type { InputRef, TableColumnType, TableColumnsType, TableProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'
import { formatPriceBootstrap } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle, BsEmojiTearFill } from 'react-icons/bs'

interface DataType {
    key: string
    _id: string
    iduser: number
    money: number
    totalQuantity: number
    date: string
    adress: string
    tel: string
    idvc: number
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
    voucher: any
    user: {
        name: any
        email: any
    }
    time: any
    dateTime: any
}
type DataIndex = keyof DataType

const ListBill = () => {
    const [bill, setBill] = useState<any>()
    const { data } = useBillQuery()
    console.log(data)
    useEffect(() => {
        if (data) {
            const dataBill = data?.datas.map((item: any) => {
                const createdAtDate = new Date(item.createdAt)

                const day = createdAtDate.getDate().toString().padStart(2, '0')
                const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0')
                const year = createdAtDate.getFullYear().toString().slice(-2)

                const formattedDate = `${day}/${month}/${year}`

                return {
                    ...item,
                    key: item._id,
                    dateTime: formattedDate, // Thêm biến date vào dataContact
                    time: createdAtDate.toLocaleTimeString('en-GB', { hour12: false }) // Thêm biến time vào dataContact
                }
            })
            dataBill.sort((a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt))
            setBill(dataBill)
        }
    }, [data])

    const handleSearchButnInput = (e: any) => {
        const value = e.target.value
        const billSearch = bill.filter((item: any) => {
            if (item._id === value) {
                return item
            }
        })
        if (billSearch.length != 0) {
            setBill(billSearch)
        }
    }

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }

    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Thông tin đặt hàng`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        style={{
                            width: 90,
                            textAlign: 'center',
                            color: 'blue',
                            borderColor: 'blue'
                        }}
                    >
                        Search
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: any, record: DataType) => {
            const { user, adress, tel } = record
            const userFields = [user?.name, user?.email, adress, tel]
            return userFields.some((field) => field && field.toString().toLowerCase().includes(value.toLowerCase()))
        },
        render: (text: any) => text
    })

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Thông tin đặt hàng',
            width: 180,
            dataIndex: 'user',
            key: 'user',
            ...getColumnSearchProps('user'),
            fixed: 'left',
            render: (_, record) => (
                <div>
                    <h1 style={{ fontSize: '18px' }}>{record?.user?.name}</h1>
                    <p>
                        Sđt:{' '}
                        <a href={'tel:' + record?.tel} style={{ color: 'orange' }}>
                            {record?.tel}
                        </a>
                    </p>
                    <p>
                        Email: <span style={{ color: 'gray' }}>{record?.user?.email}</span>
                    </p>
                    <p>
                        Đến: <i style={{ fontSize: '12px' }}>{record?.adress}</i>
                    </p>
                </div>
            )
        },
        {
            title: 'Giao hàng',
            width: 110,
            dataIndex: 'orderstatus',
            key: 'orderstatus',
            fixed: 'left',
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: 'Chờ xác nhận'
                },
                {
                    text: 'Đang chuẩn bị hàng',
                    value: 'Đang chuẩn bị hàng'
                },
                {
                    text: 'Đã giao hàng cho đơn vị vận chuyển',
                    value: 'Đã giao hàng cho đơn vị vận chuyển'
                },
                {
                    text: 'Đang giao hàng',
                    value: 'Đang giao hàng'
                },
                {
                    text: 'Đã giao hàng thành công',
                    value: 'Đã giao hàng thành công'
                },
                {
                    text: 'Đã hủy hàng',
                    value: 'Đã hủy hàng'
                }
            ],
            onFilter: (value: any, record) => record.orderstatus.indexOf(value) === 0,
            render: (_, record) => (
                <div>
                    <p>
                        <span style={{ fontSize: '15px' }}>
                            {record.orderstatus === 'Chờ xác nhận' ? (
                                <Bs1Circle style={{ color: '#CCBF02' }} />
                            ) : record.orderstatus === 'Đang chuẩn bị hàng' ? (
                                <Bs2Circle style={{ color: '#257B18' }} />
                            ) : record.orderstatus === 'Đã giao hàng cho đơn vị vận chuyển' ? (
                                <Bs3Circle style={{ color: '#006F35' }} />
                            ) : record.orderstatus === 'Đang giao hàng' ? (
                                <Bs4Circle style={{ color: '#017071' }} />
                            ) : record.orderstatus === 'Đã giao hàng thành công' ? (
                                <Bs5Circle style={{ color: '#003D75' }} />
                            ) : record.orderstatus === 'Đã hủy hàng' ? (
                                <BsEmojiTearFill style={{ color: 'red' }} />
                            ) : null}
                        </span>
                        {record.orderstatus}
                    </p>
                </div>
            )
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentstatus',
            key: '1',
            filters: [
                {
                    text: 'Chưa thanh toán',
                    value: 'Chưa thanh toán'
                },
                {
                    text: 'Chờ thanh toán',
                    value: 'Chờ thanh toán'
                },
                {
                    text: 'Đã thanh toán',
                    value: 'Đã thanh toán'
                }
            ],
            onFilter: (value: any, record) => record.paymentstatus.indexOf(value) === 0,
            width: 120,
            render: (_, record) => (
                <div>
                    {record?.paymentmethods === 'Thanh toán khi nhận hàng' ? (
                        <>
                            {record?.paymentstatus === 'Chưa thanh toán' ? (
                                <p
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'red',
                                        padding: '5px',
                                        borderRadius: '10px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Chưa thanh toán
                                </p>
                            ) : (
                                <p
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'green',
                                        padding: '5px',
                                        borderRadius: '10px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Thanh toán thành công
                                </p>
                            )}
                        </>
                    ) : record?.paymentmethods === 'Thanh toán qua PayPal' ? (
                        <>
                            {record?.paymentstatus === 'Chờ thanh toán' ? (
                                <p
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'blue',
                                        padding: '5px',
                                        borderRadius: '10px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Chờ thanh toán
                                </p>
                            ) : (
                                <p
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'green',
                                        padding: '5px',
                                        borderRadius: '10px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Thanh toán thành công
                                </p>
                            )}
                        </>
                    ) : null}
                </div>
            )
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentmethods',
            key: '2',
            width: 160
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: '3',
            width: 80,
            render: (_, record) => (
                <div>
                    <p>{record?.time}</p>
                    <p>{record?.dateTime}</p>
                </div>
            )
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'money',
            key: '4',
            width: 120,
            sorter: (a, b) => a.money - b.money,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <div>
                    <h1
                        style={{ fontWeight: 700, fontSize: '20px' }}
                        dangerouslySetInnerHTML={{
                            __html: formatPriceBootstrap(record.money)
                        }}
                    ></h1>
                </div>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'totalQuantity',
            key: '4',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity,
            sortDirections: ['descend', 'ascend'],
            width: 100
        },
        {
            title: 'Khuyến mại',
            dataIndex: 'voucher',
            key: '6',
            width: 120,
            render: (_, record) => (
                <div>
                    {record?.voucher?.decrease && (
                        <h1
                            style={{ fontWeight: 700, fontSize: '20px' }}
                            dangerouslySetInnerHTML={{
                                __html: formatPriceBootstrap(record?.voucher?.decrease)
                            }}
                        ></h1>
                    )}
                </div>
            )
        },
        {
            title: '',
            key: 'operation',
            fixed: 'right',
            width: 80,
            render: (_, record) => (
                <Link
                    to={'/admin/bill/' + record._id}
                    style={{
                        color: 'white',
                        backgroundColor: '#1677FF',
                        padding: '5px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}
                >
                    Chi tiết
                </Link>
            )
        }
    ]
    return (
        <>
            <div>
                <div className='flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={'/admin/bill'}>
                        <Title level={2} className='px-2 text-[30px]' style={{ fontWeight: 900 }}>
                            Danh sách hóa đơn
                        </Title>
                    </Link>
                    <input
                        type='text'
                        name='search'
                        placeholder='Tìm kiếm theo mã hóa đơn'
                        onChange={handleSearchButnInput}
                        style={{ width: '240px', height: '30px', border: '1px solid gray' }}
                    />
                </div>
                <Table columns={columns} dataSource={bill} scroll={{ x: 1500, y: 500 }} />
            </div>
        </>
    )
}

export default ListBill
