import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Image, Input, Popconfirm, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import { useProductMutation } from '@/hooks/Product/useProductMutation'
import { toast } from '@/components/ui/use-toast'
import { TbEyeShare } from 'react-icons/tb'
import { IProduct } from '@/interface/IProduct'
import instance from '@/services/core/api'
import { formatPriceBootstrap } from '@/lib/utils'
import '@/styles/lisstProduct.css'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

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
    categoryName: string
    colors: any
    sizes: any
    totalQuantity: number
    minPrice: number
    averagePrice: number
    soldAmount: number
    soldQuantity: number
}
type DataIndex = keyof DataType
const Product = () => {
    const [dataProduct, setDataProduct] = useState<IProduct[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/products')
                const dataPro = response.data?.datas || []

                // Sort products by createdAt (newest to oldest)
                dataPro.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

                const formattedData = dataPro.map((item: any, index: any) => ({
                    ...item,
                    key: index + 1
                }))
                setDataProduct(formattedData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])
    const dataProductTrue = dataProduct.filter((item: any) => {
        return item.status === true
    })

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
                    placeholder={`Tìm kiếm theo ${dataIndex} hoặc id`}
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
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value: any, record: any) => {
            // Lọc cả trường `name` và `_id`
            return (
                record.name.toLowerCase().includes(value.toLowerCase()) ||
                (record._id && record._id.toLowerCase().includes(value.toLowerCase()))
            )
        }
    })

    const [getBill, setGetBill] = useState<any>()
    console.log('🚀 ~ Product ~ getBill:', getBill)
    const getProductOneBill = async (id: any) => {
        const response = await instance.get(`/products/${id}`)
        setGetBill(response.data)
    }
    const columns: TableColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '0.05%'
        },

        {
            title: 'Sản Phẩm',
            dataIndex: '_id',
            key: '_id',
            width: '18%',
            ...getColumnSearchProps('name'),
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src={record.image}
                        alt='ảnh loại sản phẩm'
                        style={{ marginRight: '15px', borderRadius: '15%', width: '60px' }}
                    />
                    <div>
                        <h1 style={{ textAlign: 'left', fontSize: '18px', fontWeight: 600 }}>{record.name}</h1>
                        <p>
                            <span style={{ fontWeight: 600 }}>Mã: </span>
                            <span style={{ fontSize: '12px' }}>{record._id}</span>
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: 'Giá',
            dataIndex: 'minPrice',
            key: 'minPrice',
            width: '1%',
            sorter: (a, b) => a.averagePrice - b.averagePrice,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <div className='flex'>
                    <p
                        style={{ fontWeight: 700 }}
                        dangerouslySetInnerHTML={{
                            __html: formatPriceBootstrap(record.averagePrice)
                        }}
                    ></p>
                </div>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            width: '5%'
        },
        {
            title: 'Loại',
            dataIndex: 'color',
            key: 'color',
            width: '7%',
            render: (_, record) => (
                <div className='flex'>
                    <p>
                        {record.colors.map((item: any) => {
                            return <span key={item}>{`${item}, `}</span>
                        })}
                    </p>
                </div>
            )
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'sizes',
            key: 'sizes',
            width: '7%',
            render: (_, record) => (
                <div className='flex'>
                    <p>
                        {record.sizes.map((item: any) => {
                            return <span key={item}>{`${item}, `}</span>
                        })}
                    </p>
                </div>
            )
        },
        {
            title: 'Danh Mục',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '9%'
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            width: '6%',
            sorter: (a, b) => a.soldAmount - b.soldAmount,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <div className=''>
                    <p
                        style={{ fontWeight: 700 }}
                        dangerouslySetInnerHTML={{
                            __html: formatPriceBootstrap(record.soldAmount)
                        }}
                    ></p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <u className='sp_da_ban' onClick={() => getProductOneBill(record._id)}>
                                {record.soldQuantity} sp đã bán
                            </u>
                        </DialogTrigger>
                        <DialogContent style={{ width: '30%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={getBill?.data?.image}
                                    alt='ảnh loại sản phẩm'
                                    width={'70px'}
                                    style={{ marginRight: '20px', borderRadius: '15%' }}
                                />
                                <DialogHeader>
                                    <DialogTitle style={{ textAlign: 'left' }}>{getBill?.data?.name}</DialogTitle>
                                    <DialogDescription>
                                        <span style={{ fontWeight: 700 }}>Mã sản phẩm: </span>
                                        {getBill?.data?._id}
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                            <div>
                                <h2>Đã bán: </h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Loại Sản phẩm</th>
                                            <th>Số Lượng</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getBill?.typeProduct_bill.map((item: any, index: number) => (
                                            <tr key={item?.color}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {item?.color} x {item?.size}
                                                    <br />
                                                    <img src={item?.image} alt='ảnh loại sản phẩm' width={'70px'} />
                                                </td>
                                                <td>{item?.soldQuantity}</td>
                                                <td
                                                    style={{ fontWeight: 700 }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatPriceBootstrap(item?.soldAmount)
                                                    }}
                                                ></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <DialogFooter style={{ marginLeft: '80%' }}>
                                <DialogClose asChild>
                                    <Button type='primary' style={{ color: 'red', borderColor: 'red' }}>
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '2%',
            render: (_, record) => (
                <Space size='small' direction='vertical'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => getProductOneBill(record._id)}
                                style={{
                                    color: 'blue',
                                    borderColor: 'blue'
                                }}
                            >
                                <TbEyeShare />
                            </Button>
                        </DialogTrigger>
                        <DialogContent style={{ width: '60%' }}>
                            <h1 style={{ textAlign: 'center', fontSize: '30px', color: 'black' }}>Chi Tiết Sản Phẩm</h1>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                                        <img
                                            src={getBill?.data?.image}
                                            alt='ảnh loại sản phẩm'
                                            width={'70px'}
                                            style={{ marginRight: '20px', borderRadius: '15%' }}
                                        />
                                        <DialogHeader>
                                            <DialogTitle style={{ textAlign: 'left' }}>
                                                {getBill?.data?.name}
                                            </DialogTitle>
                                            <DialogDescription style={{ textAlign: 'left' }}>
                                                <span style={{ fontWeight: 700 }}>Mã sản phẩm: </span>
                                                {getBill?.data?._id}
                                            </DialogDescription>
                                        </DialogHeader>
                                    </div>
                                    <p style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 600 }}>Số lượng: </span>
                                        {getBill?.totalQuantity}
                                    </p>
                                    <p style={{ marginBottom: '5px', display: 'flex' }}>
                                        <span style={{ fontWeight: 600 }}>Giá trung bình: </span>
                                        &nbsp;
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: formatPriceBootstrap(getBill?.maxPrice)
                                            }}
                                        ></span>
                                    </p>

                                    <p style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 600 }}>Ngày nhập: </span>
                                        {getBill?.data?.import_date.slice(0, 10)}
                                    </p>
                                    <p style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 600 }}>Hạn sử dụng: </span>
                                        {getBill?.data?.expiry}
                                    </p>
                                    <p style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 600 }}>Mô tả: </span>
                                        <br />
                                        <span
                                            style={{ width: '50%', fontSize: '14px' }}
                                            dangerouslySetInnerHTML={{ __html: getBill?.data?.description }}
                                        ></span>
                                    </p>
                                </div>

                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Loại Sản phẩm</th>
                                                <th>Số Lượng</th>
                                                <th>Khối Lượng</th>
                                                <th>Giá Tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getBill?.typeProduct.map((item: any) => (
                                                <tr key={item._id}>
                                                    <td>
                                                        {item?.color} x {item?.size}
                                                        <br />
                                                        <img src={item?.image} alt='ảnh loại sản phẩm' width={'70px'} />
                                                    </td>
                                                    <td>{item?.quantity}</td>
                                                    <td>{item?.weight}</td>
                                                    <td
                                                        style={{ fontWeight: 700 }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: formatPriceBootstrap(item?.price)
                                                        }}
                                                    ></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <DialogFooter style={{ marginLeft: '80%' }}>
                                <Link to={`/admin/products/${getBill?.data?._id}/edit`}>
                                    <Button type='link' style={{ color: 'orange', borderColor: 'orange' }}>
                                        Edit
                                    </Button>
                                </Link>
                                <DialogClose asChild>
                                    <Button type='primary' style={{ color: 'red', borderColor: 'red' }}>
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Link to={`/admin/products/${record?._id}/edit`}>
                        <Button style={{ color: 'orange', borderColor: 'orange' }}>
                            <EditOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    </Link>

                    <Popconfirm
                        placement='topRight'
                        title='Lưu trữ sản phẩm?'
                        description='Bạn có chắc chắn muốn lưu trữ sản phẩm này không?'
                        onConfirm={() => onStorage(record)}
                        onCancel={cancel}
                        okText={<span style={{ color: 'green' }}>Đồng ý</span>} // Thay đổi màu của văn bản nút "Đồng ý"
                        cancelText='Không'
                    >
                        <Button type='default' style={{ color: 'red', borderColor: 'red' }}>
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
            <Table columns={columns} dataSource={dataProductTrue} />
        </div>
    )
}

export default Product
