import React, { useRef, useState } from 'react'
import { Button, Input, Space, Table, Tag } from 'antd'
import type { InputRef, TableColumnType, TableProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'

interface DataType {
    key: string
    iduser: number
    money: string
    date: string
    adress: string
    tel: string
    idvc: number
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
}
type DataIndex = keyof DataType
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
}
const onSearch = (value: any, _e: any, info: { source: any }) => console.log(info?.source, value)
const ListBill = () => {
    const { data } = useBillQuery()
    console.log(data)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    const dataBill = data?.datas.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    console.log(dataBill)
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
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Mã KH',
            dataIndex: 'iduser',
            key: 'iduser',

            // render: (text) => <a>{text}</a>,
            ...getColumnSearchProps('iduser'),
            fixed: 'left'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'money',
            key: 'money'
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'adress',
            key: 'adress'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'tel',
            key: 'tel'
        },
        {
            title: 'Mã voucher',
            dataIndex: 'idvc',
            key: 'idvc'
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentmethods',
            key: 'paymentmethods',
            filters: [
                { text: 'Thanh toán qua ví điện tử', value: 'Thanh toán qua ví điện tử' },
                { text: 'Thanh toán khi nhận hàng', value: 'Chuẩn bị hàng' }
            ],
            width: '12%',
            onFilter: (value: string, record) => record.paymentmethods.indexOf(value) === 0
        },
        {
            title: 'Trạng thái thanh toán',
            key: 'paymentstatus',
            dataIndex: 'paymentstatus',

            filters: [
                { text: 'Chưa thanh toán', value: 'Chưa thanh toán' },
                { text: 'Đã thanh toán', value: 'Đã thanh toán' }
            ],
            onFilter: (value: string, record: any) => record.paymentstatus.indexOf(value) === 0,
            width: '15%',
            render: (_, record: any) => (
                <Tag
                    color={record.paymentstatus === 'Chưa thanh toán' ? 'volcano' : 'green'}
                    key={record.paymentstatus}
                    style={{ padding: '2px' }}
                >
                    {record.paymentstatus.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Trạn thái đơn hàng',
            key: 'orderstatus',
            dataIndex: 'orderstatus',
            filters: [
                { text: 'Chờ xác nhận', value: 'Chờ xác nhận' },
                { text: 'Chuẩn bị hàng', value: 'Chuẩn bị hàng' },
                { text: 'Đang giao hàng', value: 'Đang giao hàng' },
                { text: 'Giao hàng thành công', value: 'Giao hàng thành công' },
                { text: 'Hủy hàng', value: 'Hủy hàng' }
            ],
            width: '15%',
            onFilter: (value: string, record) => record.orderstatus.indexOf(value) === 0,
            render: (_, record: any) => {
                let color = 'green' // Mặc định màu là xanh
                switch (record.orderstatus) {
                    case 'Chờ xác nhận':
                        color = 'volcano' // Đỏ
                        break
                    case 'Chuẩn bị hàng':
                        color = 'cyan' // Xanh dương
                        break
                    case 'Đang giao hàng':
                        color = 'blue' // Xanh lam
                        break
                    case 'Giao hàng thành công':
                        color = 'green' // Xanh lá cây
                        break
                    case 'Hủy hàng':
                        color = 'gray' // Xám
                        break
                    default:
                        break
                }
                return (
                    <Tag color={color} key={record.orderstatus} style={{ padding: '2px' }}>
                        {record.orderstatus.toUpperCase()}
                    </Tag>
                )
            }
        }
    ]
    return (
        <>
            <div>
                <div className='flex flex-row gap-96'>
                    <Title level={2} className='px-2 pt-5 text-[30px]' style={{ fontWeight: 900 }}>
                        Danh sách hóa đơn
                    </Title>
                    <Search
                        className='pt-7'
                        placeholder='Search hóa đơn chi tiết'
                        allowClear
                        onSearch={onSearch}
                        style={{
                            width: 220
                        }}
                    />
                </div>

                <Table columns={columns} dataSource={dataBill} onChange={onChange} scroll={{ x: 100 }} />
            </div>
        </>
    )
}

export default ListBill
