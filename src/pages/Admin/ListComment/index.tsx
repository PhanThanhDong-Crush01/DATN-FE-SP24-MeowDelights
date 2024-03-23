import { useEffect, useRef, useState } from 'react'
import { SearchOutlined, StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType, TableProps } from 'antd'
import { Avatar, Button, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'

import { deleteEmployee, getOneUser } from '@/services/auth'
import { useCommentQuery } from '@/hooks/Comment/useCommentQuery'

import instance from '@/services/core/api'
import { getOne } from '@/services/product'
import { string } from 'joi'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { Highlighter } from 'lucide-react'
type InputRef = GetRef<typeof Input>
type OnChange = NonNullable<TableProps<DataType>['onChange']>
type Filters = Parameters<OnChange>[1]

type GetSingle<T> = T extends (infer U)[] ? U : never
type Sorts = GetSingle<Parameters<OnChange>[2]>
interface DataType {
    datas: any
    key: string
    _id: string
    productId: string
    productInfo: any
    productTypeInfo: any
    userInfo: any
    productTypeId: string
    userId: string
    img: string
    title: string
    star: number
    comment: string
}

type DataIndex = keyof DataType

const ListCommentPage = () => {
    const { data }: any = useCommentQuery()
    console.log(data)
    const dataWithKeys = data?.datas.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    console.log(dataWithKeys)
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
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
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
            title: 'Sản phẩm',
            dataIndex: 'productId',
            key: 'productId',
            width: '35%',
            ...getColumnSearchProps('productId'),
            render: (_, record) => {
                return (
                    <div>
                        {/* <h1 style={{ fontSize: '18px' }}>{record?.productId}</h1> */}
                        <h1 style={{ fontSize: '16px' }}>{record?.productInfo?.name}</h1>
                        <img src={record?.productInfo?.image} alt='' />
                        <p style={{ fontSize: '12px' }}>Mã: {record?.productInfo?._id}</p>
                        {/* Hiển thị thông tin sản phẩm nếu có */}
                    </div>
                )
            },
            fixed: 'left'
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'productTypeId',
            key: 'productTypeId',
            width: '15%',
            render: (_, record) => {
                return (
                    <div>
                        {record?.productTypeInfo?.color} - {record?.productTypeInfo?.size}-
                        {record?.productTypeInfo?.weight}
                    </div>
                )
            }
            // fixed: 'left'
        },
        {
            title: 'Khách hàng',
            dataIndex: 'userId',
            key: 'userId',
            width: '40%',
            ...getColumnSearchProps('userId'),
            render: (_, record) => {
                return (
                    <div>
                        <h1 style={{ fontSize: '16px', color: '' }}>Tên: {record?.userInfo?.name}</h1>
                        <h2 style={{ fontSize: '16px' }}>Email: {record?.userInfo?.email}</h2>
                        <p style={{ fontSize: '12px', color: '' }}>Mã: {record?.userId}</p>
                    </div>
                )
            }
        },

        {
            title: 'Hình ảnh',
            dataIndex: 'img',
            key: 'img',
            width: '20%',
            render: (_, record) => <img src={record?.img} alt='' />
        },

        {
            title: 'Chủ đề',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            render: (_, record) => record?.title
        },
        {
            title: 'Số sao',
            dataIndex: 'star',
            key: 'star',
            width: '20%',
            filters: [
                {
                    text: '1-2 sao',
                    value: '1-<2'
                },
                {
                    text: '2-3 sao',
                    value: '2-<3'
                },
                {
                    text: '3-4 sao',
                    value: '3-<4'
                },
                {
                    text: '4-5 sao',
                    value: '4-5'
                }
            ],

            onFilter: (value: number, record) => {
                const star = record.star
                const [lowerBound, upperBound] = value.split('-').map(parseFloat)
                return star >= lowerBound && star <= upperBound
            },

            render: (_, record) => {
                const fullStars = Math.floor(record.star) // Số sao đầy
                const decimalPart = record.star - fullStars // Phần thập phân của số sao

                const starArray = Array.from({ length: fullStars }, (_, index) => index) // Tạo mảng sao đầy
                let halfStarComponent = null

                // Xác định nếu có icon nửa sao và số lượng sao trống
                if (decimalPart >= 0.25 && decimalPart <= 0.75) {
                    halfStarComponent = <FontAwesomeIcon icon={faStarHalf} style={{ color: 'gold' }} /> // Icon nửa sao
                } else if (decimalPart > 0.75) {
                    starArray.push(fullStars) // Thêm một sao đầy
                }

                const emptyStars = 5 - starArray.length // Số sao trống

                // Tạo mảng sao trống
                const emptyStarArray = Array.from({ length: emptyStars }, (_, index) => index)

                return (
                    <div>
                        {/* Các sao đầy */}
                        {starArray.map((_, index) => (
                            <StarFilled key={`full-${index}`} style={{ color: 'gold' }} />
                        ))}
                        {/* Icon nửa sao nếu có */}
                        {halfStarComponent}
                        {/* Các sao trống */}
                        {/* {emptyStarArray.map((_, index) => (
                            <StarOutlined key={`empty-${index}`} style={{ color: 'gold' }} />
                        ))} */}
                    </div>
                )
            }
        },
        {
            title: 'Đánh giá',
            dataIndex: 'comment',
            key: 'comment',
            width: '20%',
            render: (_, record) => record.comment
        }
    ]
    const cancel = () => {
        message.error('Đã hủy!')
    }
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }
    return (
        <div>
            <div className='flex justify-between items-center '>
                <p className='text-[30px] pb-4'>Danh sách đánh giá sản phẩm </p>
            </div>
            <Table columns={columns} dataSource={dataWithKeys} scroll={{ x: 1300 }} onChange={onChange} />
            {/* form */}
        </div>
    )
}

export default ListCommentPage
