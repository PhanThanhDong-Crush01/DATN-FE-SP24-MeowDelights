import { useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Input, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

type InputRef = GetRef<typeof Input>

interface DataType {
    key: string
    name: string
    date: string
    category: string
    image: string
    sold: number
    status: string
}

type DataIndex = keyof DataType

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        category: 'New York No. 1 Lake Park',
        date: '12/2/2222',
        sold: 727,
        status: 'còn hàng',
        image: 'https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg'
    },
    {
        key: '2',
        name: 'Joe Black',
        date: '12/2/2222',
        category: 'London No. 1 Lake Park',
        sold: 727,
        status: 'hết hàng',
        image: 'https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg'
    },
    {
        key: '3',
        name: 'Jim Green',
        date: '12/2/2222',
        category: 'Sydney No. 1 Lake Park',
        sold: 727,
        status: 'hết hàng',
        image: 'https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg'
    }
]
const Product = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const confirmDelete = async (productId: string) => {
        message.success('xoá thành công')
    }
    const cancelDelete = () => {
        message.error('Product deletion cancelled')
    }

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

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '5%',
            render: (image) => <img src={image} alt='Product' width={70} />
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Danh Mục',
            dataIndex: 'category',
            key: 'category',
            width: '15%',
            ...getColumnSearchProps('category')
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            width: '10%',
            ...getColumnSearchProps('date'),
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            width: '10%',
            ...getColumnSearchProps('sold'),
            sorter: (a, b) => a.sold - b.sold,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            ...getColumnSearchProps('status'),
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
            render: (status) => <p className='text-green-500'>{status}</p>
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={'/admin/products/add'}>
                        <Button type='primary' ghost>
                            <EditOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    </Link>

                    <Popconfirm
                        placement='topRight'
                        title='Xóa bài viết?'
                        description='Bạn có chắc chắn xóa bài viết này không?'
                        onConfirm={() => confirm(record.key)}
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
            <div className='flex justify-between items-center mx-[10px] my-3'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Danh sách sản phẩm{' '}
                    </p>
                </div>
                <div className='flex justify-end mb-2'>
                    <Link to={'/admin/products/add'}>
                        <Button
                            type='primary'
                            icon={<PlusCircleOutlined />}
                            size={'large'}
                            className='bg-[#1677ff]'
                        ></Button>
                    </Link>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
            {/* <ModalForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                form={form}
                modalMode={modalMode}
                classNames="!w-[1100px]"
            >
                <Form
                    form={form}
                    // {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                    className="flex gap-3 w-full"
                >
                    {modalMode === 'edit' && (
                        <Form.Item name="_id" style={{ display: 'none' }}>
                            <Input />
                        </Form.Item>
                    )}
                    <div className=" w-full ">
                        <Form.Item name="name" label="Tên" rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}>
                            <Input.TextArea rows={2} placeholder="Name " />
                        </Form.Item>
                        <Form.Item name="price" label="Giá" rules={[{ required: true, type: 'number', min: 0 }]}>
                            <InputNumber size="large" placeholder="Price" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item name="images" label="Ảnh pet" rules={[{ required: true }]}>
                            <Dragger multiple listType="picture" customRequest={customRequest} >
                                <Button icon={<UploadOutlined />}>Thêm Ảnh</Button>
                            </Dragger>
                        </Form.Item>
                    </div>

                    <div className="w-full">
                        <Form.Item label="Trạng thái" rules={[{ required: true }]}>
                            <Select size="large" placeholder="---- Status ----">
                                <Option key={"1"} value={"true"}>
                                    Còn hàng
                                </Option>
                                <Option key={"2"} value={"fale"}>
                                    Hết hàng
                                </Option>
                            </Select>
                        </Form.Item>


                        <Form.Item name="sold" label="Đã bán" rules={[{ required: true, type: 'number', min: 0 }]}>
                            <InputNumber size="large" placeholder="sold" style={{ width: '100%' }} />
                        </Form.Item>


                        <Form.Item
                            name="description"
                            label="Thông Tin Sản Phẩm"
                            rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Description" />
                        </Form.Item>


                    </div>
                </Form>
            </ModalForm> */}
        </div>
    )
}

export default Product
