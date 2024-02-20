import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, Menu, Space, Table, Tabs } from 'antd'
import type { InputRef, TableColumnType, TableProps, TabsProps } from 'antd'
import Layout, { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { AiOutlineAccountBook, AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Search, { SearchProps } from 'antd/es/input/Search'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'
import { SearchOutlined } from '@ant-design/icons'
import { FilterDropdownProps } from 'antd/es/table/interface'

interface DataType {
    key: string
    // img: string
    // name: string
    // price: number
    // quality: number
    // cate: string
    // total: number
    _id: string
    tel: string
    address: string
    totalQuantity: number
    money: number
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
}

// const onChange = (key: string) => {
//     console.log(key)
// }
type DataIndex = keyof DataType
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
}

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tất cả'
        // children: 'Content of Tab Pane 1'
    },
    {
        key: '2',
        label: 'Chờ xác nhận'
        // children: 'Content of Tab Pane 2'
    },
    {
        key: '3',
        label: 'Đang chuẩn bị hàng'
        // children: 'Content of Tab Pane 3'
    },
    {
        key: '4',
        label: 'Đang giao hàng'
        // children: 'Content of Tab Pane 3'
    },

    {
        key: '5',
        label: 'Giao hàng thành công'
        // children: 'Content of Tab Pane 3'
    },
    {
        key: '6',
        label: 'Hủy đơn hàng'
        // children: 'Content of Tab Pane 3'
    }
]

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
const OrderPage: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
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
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        }
    })
    const [userID, setUserID] = useState<string | null>(null)
    const [selectedTab, setSelectedTab] = useState<string>('1')
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    console.log(userID)
    const { data } = useBillQuery(userID || '')
    console.log(data)
    const filteredData = data?.bill.filter((item: DataType) => {
        switch (selectedTab) {
            case '1':
                return true // All orders
            case '2':
                return item.orderstatus === 'Chờ xác nhận'
            case '3':
                return item.orderstatus === 'Chuẩn bị hàng'
            case '4':
                return item.orderstatus === 'Đang giao hàng'
            case '5':
                return item.orderstatus === 'Giao hàng thành công'
            case '6':
                return item.orderstatus === 'Hủy đơn hàng'
            default:
                return true
        }
    })

    const onChangeTab = (key: string) => {
        console.log(key)
        setSelectedTab(key)
    }
    const columns: TableProps<DataType>['columns'] = [
        // {
        //     title: 'Hình ảnh',
        //     dataIndex: 'img',
        //     key: 'img',
        //     render: (text) => <img src='https://picsum.photos/200/300'></img>
        // },
        // {
        //     title: 'Tên sản phẩm',
        //     dataIndex: 'name',
        //     key: 'name',
        //     render: (text) => <a>{text}</a>
        // },
        {
            title: 'Mã bill',
            dataIndex: '_id',
            key: '_id',
            ...getColumnSearchProps('_id')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'tel',
            key: 'tel'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'adress',
            key: 'adress'
        },
        {
            title: 'Số lượng',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity'
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentmethods',
            key: 'paymentmethods'
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'paymentstatus',
            key: 'paymentstatus'
        },
        {
            title: 'Trạng thái vận chuyển',
            dataIndex: 'orderstatus',
            key: 'orderstatus'
        },
        // {
        //     title: 'Loại',
        //     dataIndex: 'cate',
        //     key: 'cate'
        // },
        {
            title: 'Tổng tiền',
            dataIndex: 'money',
            key: 'money'
        }
    ]
    return (
        <Content style={{ padding: '10px 0px' }}>
            <Layout style={{ padding: '0px 0' }}>
                <Sider theme='light' trigger={null} collapsible>
                    <div className='demo-logo-vertical'>
                        <Menu
                            theme='light'
                            mode='inline'
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <AiOutlineUser />,
                                    label: <Link to='/updateProfile'>Hồ sơ của tôi</Link>
                                },
                                {
                                    key: '2',
                                    icon: <AiOutlineAntDesign />,
                                    label: <Link to='/order'>Đơn mua</Link>
                                },
                                {
                                    key: '3',
                                    icon: <AiOutlineAccountBook />,
                                    label: <Link to='/admin/product'>Thông báo</Link>
                                },
                                {
                                    key: '4',
                                    icon: <AiOutlineAim />,
                                    label: <Link to='/admin/product'>Kho voucher</Link>
                                }
                            ]}
                        />
                    </div>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <main className=' px-8'>
                        <div>
                            <div className='flex flex-col gap-5 '>
                                <Tabs defaultActiveKey='1' items={items} onChange={onChangeTab} />
                                <Table columns={columns} dataSource={filteredData} />;
                            </div>
                        </div>
                    </main>
                </Content>
            </Layout>
        </Content>
    )
}
export default OrderPage
