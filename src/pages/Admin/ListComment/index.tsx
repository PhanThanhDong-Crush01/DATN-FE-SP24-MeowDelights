import { useEffect, useRef, useState } from 'react'
import { SearchOutlined, StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType, TableProps } from 'antd'
import { Avatar, Button, Image, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'

import { deleteEmployee, getOneUser } from '@/services/auth'
import { useCommentQuery } from '@/hooks/Comment/useCommentQuery'

import instance from '@/services/core/api'
import { getOne } from '@/services/product'
import { string } from 'joi'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { Highlighter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
type InputRef = GetRef<typeof Input>
type OnChange = NonNullable<TableProps<DataType>['onChange']>
type Filters = Parameters<OnChange>[1]

type GetSingle<T> = T extends (infer U)[] ? U : never
type Sorts = GetSingle<Parameters<OnChange>[2]>
interface DataType {
    name: any
    averageStars: number
    totalComment: number

    key: string
    _id: string
}

type DataIndex = keyof DataType

const ListCommentPage = () => {
    const { data }: any = useProductQuery()
    console.log(data)
    const dataWithKeys = data?.datas?.map((item: any, index: any) => ({
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
            title: 'Sản phẩm',
            dataIndex: 'productId',
            key: 'productId',
            width: '3%',
            ...getColumnSearchProps('productId'),
            render: (_, record) => {
                return (
                    <div>
                        <div>
                            <Image src={record?.img} width={70} />
                            <Link to={'/products/' + record?._id}>
                                <h1 style={{ fontSize: '16px' }}>{record?.name}</h1>
                            </Link>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', marginTop: '5px', color: 'gray' }}>Mã: {record?._id}</p>
                        </div>
                    </div>
                )
            },
            fixed: 'left'
        },

        {
            title: 'Số sao trung bình',
            dataIndex: 'star',
            key: 'star',
            width: '3%',
            // filters: [
            //     {
            //         text: '1-2 sao',
            //         value: '1-<2'
            //     },
            //     {
            //         text: '2-3 sao',
            //         value: '2-<3'
            //     },
            //     {
            //         text: '3-4 sao',
            //         value: '3-<4'
            //     },
            //     {
            //         text: '4-5 sao',
            //         value: '4-5'
            //     }
            // ],

            // onFilter: (value: number, record) => {
            //     const star = record.star
            //     const [lowerBound, upperBound] = value.split('-').map(parseFloat)
            //     return star >= lowerBound && star <= upperBound
            // },

            render: (_, record) => {
                const fullStars = Math.floor(record?.averageStars) // Số sao đầy
                const decimalPart = record?.averageStars - fullStars // Phần thập phân của số sao

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
            title: 'Số đánh giá',
            dataIndex: 'comment',
            key: 'comment',
            width: '3%',
            render: (_, record) => record.totalComment
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '1%',
            fixed: 'right',
            render: (_, record) => (
                <Space size='middle'>
                    <div className=''>
                        <Button>
                            {' '}
                            <Link to={`/admin/comment/${record?._id}`}>Chi tiết</Link>
                        </Button>
                    </div>
                </Space>
            )
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
