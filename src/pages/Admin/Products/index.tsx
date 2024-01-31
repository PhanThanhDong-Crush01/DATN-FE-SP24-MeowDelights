import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Input, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { useProductMutation } from '@/hooks/Product/useProductMutation'
import { toast } from '@/components/ui/use-toast'
import form from 'antd/es/form'
import { IProduct } from '@/interface/IProduct'
type InputRef = GetRef<typeof Input>
interface DataType {
    key: string
    _id?: string
    name: string
    image: string
    import_date: string
    expiry: string
    status: boolean
    description: string
    idCategory: string
}

type DataIndex = keyof DataType
const Product = () => {
    const { data } = useProductQuery()
    console.log(data)
    const dataProduct = data?.datas.docs.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    console.log(dataProduct)
    const { onStorage } = useProductMutation({
        action: 'STORAGE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá sản phẩm thành công!!',
                description: 'Sẩn phẩm đã bị xóa'
            })
        }
    })
    const dataProductTrue = dataProduct.filter((item: any) => {
        return item.status === true
    })

    const handleStorage = (record: IProduct) => async () => {
        record.status = false
        console.log('🚀 ~ handleStorage ~ record:', record)
        console.log()
    }
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    // const confirmDelete = async (productId: string) => {
    //     message.success('xoá thành công')
    // }
    // const cancelDelete = () => {
    //     message.error('Product deletion cancelled')
    // }

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }
    const getStatusLabel = (status: boolean) => (status ? 'Còn hàng' : 'Hết hàng')

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

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
            // render: (_id) => <p className='text-green-500'>{data.id}</p>
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '10%'
            // render: (_image) => <img src={data.image} alt='Product' width={70} />
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
            dataIndex: 'idCategory',
            key: 'idCategory',
            width: '5%',
            ...getColumnSearchProps('idCategory')
        },

        {
            title: 'Ngày',
            dataIndex: 'import_date',
            key: 'import_date',
            width: '15%',
            ...getColumnSearchProps('import_date'),
            sorter: (a, b) => a.import_date.length - b.import_date.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'expiry',
            key: 'expiry',
            width: '15%',
            ...getColumnSearchProps('expiry'),
            sorter: (a, b) => a.expiry.length - b.expiry.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (_, record) => getStatusLabel(record.status)
            // <option value='record.status'></option

            // render: (status) => <p className='text-green-500'>{status}</p>
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        // onClick={() => {
                        //     const post = posts?.find((post: IPost) => post._id === record._id)

                        //     form.setFieldsValue({
                        //         _id: post?._id,
                        //         title: post?.title,
                        //         images: post?.images,
                        //         description: post?.description
                        //     })
                        //     showModal('edit')
                        // }}
                        ghost
                    >
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Button>

                    <Popconfirm
                        placement='topRight'
                        title='Lưu trữ sản phẩm?'
                        description='Bạn có chắc chắn muốn lưu trữ sản phẩm này không?'
                        onConfirm={() => onStorage(record)}
                        // onConfirm={() => onRemove(record)}
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
                    <p className='text-[20px]'>Sản Phẩm </p>
                </div>
                <div className='flex justify-end mb-2'>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className='bg-[#1677ff]'
                        onClick={() => {
                            form.resetFields()
                            showModal('add')
                        }}
                    ></Button>
                </div>
            </div>
            <Table columns={columns} dataSource={dataProductTrue} />
        </div>
    )
}

export default Product
