import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Menu, Rate, Space, Table, Tabs } from 'antd'
import type { InputRef, TableColumnType, TableProps, TabsProps } from 'antd'
import Layout, { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { AiOutlineAccountBook, AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Search, { SearchProps } from 'antd/es/input/Search'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'
import { SearchOutlined, StarOutlined } from '@ant-design/icons'
import { FilterDropdownProps } from 'antd/es/table/interface'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useCommentMutation } from '@/hooks/Comment/useCommentMutation'
import { toast } from '@/components/ui/use-toast'
import ProductReviews from '../ProductDetailPage/ProductReviews'
import { formatPrice, formatPriceBootstrap } from '@/lib/utils'
import { useWhyCancelOrder } from '@/hooks/Bill/useWhyCancelOrder'
import { useForm } from 'react-hook-form'
interface DataType {
    key: string
    products: {
        // hasReviewed: boolean
        product: Product
        productType: ProductType
    }[]
    _id: string
    tel: string
    address: string
    totalQuantity: number
    money: number
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
}
type DataIndex = keyof DataType
// const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra)
// }

const items: TabsProps['items'] = [
    {
        key: '1',
        label: (
            <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Tất cả
            </span>
        )

        // children: 'Content of Tab Pane 1'
    },
    {
        key: '2',
        label: (
            <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Chờ xác nhận
            </span>
        )
        // children: 'Content of Tab Pane 2'
    },
    // {
    //     key: '3',
    //     label: (
    //         <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
    //             Đã giao cho đơn vị vận chuyển
    //         </span>
    //     )
    //     // children: 'Content of Tab Pane 3'
    // },
    {
        key: '3',
        label: (
            <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Đang chuẩn bị hàng
            </span>
        )
        // children: 'Content of Tab Pane 3'
    },
    {
        key: '4',
        label: (
            <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Đang giao hàng
            </span>
        )
        // children: 'Content of Tab Pane 3'
    },

    {
        key: '5',
        label: (
            <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Giao hàng thành công
            </span>
        )
        // children: 'Content of Tab Pane 3'
    },
    {
        key: '6',
        label: (
            <span style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Hủy đơn hàng
            </span>
        )
        // children: 'Content of Tab Pane 3'
    }
]
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
const OrderPage: React.FC = () => {
    const navigate = useNavigate()
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
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()} placeholder='Tìm kiếm...'>
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
    const { data } = useBillQuery(userID || '')
    const filteredData = data?.bill?.filter((item: DataType) => {
        switch (selectedTab) {
            case '1':
                return true // All orders
            case '2':
                return item.orderstatus === 'Chờ xác nhận'
            case '3':
                return (
                    item.orderstatus === 'Đang chuẩn bị hàng' ||
                    item.orderstatus === 'Đã giao hàng cho đơn vị vận chuyển'
                )
            case '4':
                return item.orderstatus === 'Đang giao hàng'
            case '5':
                return item.orderstatus === 'Đã giao hàng thành công'
            case '6':
                return item.orderstatus === 'Đã hủy hàng'
            default:
                return true
        }
    })
    const onChangeTab = (key: string) => {
        console.log(key)
        setSelectedTab(key)
    }
    // const [isReviewDialogVisible, setIsReviewDialogVisible] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string>('')
    const [selectedProductTypeId, setSelectedProductTypeId] = useState<string>('')
    const [selectedIdBill, setSelectedIdBill] = useState<string>('')
    const [selectedIdPro, setSelectedIdPro] = useState<string>('')
    const [selectedIdProTye, setSelectedIdProTye] = useState<string>('')

    const [newWhy, setNewWhy] = useState('')
    const [newImg, setNewImg] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newStar, setNewStar] = useState(0)
    const [newComment, setNewComment] = useState('')

    const handleReviewButtonClick = (productId: string, productTypeId: string) => {
        setSelectedProductId(productId)
        setSelectedProductTypeId(productTypeId)
        // setIsReviewDialogVisible(true)
    }
    const handleWhyCancelButtonClick = (idbill: string, idpro: string, idprotype: string) => {
        setSelectedIdBill(idbill)
        setSelectedIdPro(idpro)
        setSelectedIdProTye(idprotype)
        console.log(` idProduct: ${idpro}, idProductType: ${idprotype} ,idbill: ${idbill}`)
    }
    const handleAddComment = () => {
        const dataComment = {
            userId: userID || '', // Thêm ID của người dùng vào dữ liệu đánh giá
            productId: selectedProductId,
            productTypeId: selectedProductTypeId,
            img: newImg,
            title: newTitle,
            star: newStar,
            comment: newComment
        }
        onSubmit(dataComment)
        console.log(dataComment)
    }
    const { onSubmit } = useCommentMutation({
        action: 'ADD'
    })
    const handleAddWhy = () => {
        const dataWhy = {
            idbill: selectedIdBill,

            iduser: userID || '', // Thêm ID của người dùng vào dữ liệu đánh giá
            idpro: selectedIdPro,
            idprotype: selectedIdProTye,
            message: newWhy
        }
        onSubmitWhy(dataWhy)
        console.log(dataWhy)
    }

    const { onSubmitWhy } = useWhyCancelOrder({
        action: 'ADD',
        onSuccess: () => {
            // navigate('/order')
            const updatedData = filteredData.map((item: DataType) => {
                if (item._id === selectedIdBill) {
                    return {
                        ...item,
                        orderstatus: 'Đã hủy hàng' // Cập nhật trạng thái của đơn hàng thành hủy hàng
                    }
                }
                return item
            })

            // Lọc ra các đơn hàng cần di chuyển sang tab "Hủy đơn hàng"
            const canceledOrders = updatedData.filter((item: DataType) => item.orderstatus === 'Đã hủy hàng')

            // Xác định tab hiện tại và loại bỏ các đơn hàng hủy khỏi filteredData của tab đó
            const updatedFilteredData = filteredData.filter((item: DataType) => item.orderstatus !== 'Đã hủy hàng')

            // Thêm các đơn hàng hủy vào filteredData của tab "Hủy đơn hàng"
            filteredData(updatedFilteredData.concat(canceledOrders))
        }
    })
    // const { register, handleSubmit, errors }: any = useForm()

    // const onSubmitHanled = (data: any) => {
    //     onSubmitWhy({ ...data })
    // }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Mã bill',
            dataIndex: '_id',
            key: '_id',
            ...getColumnSearchProps('_id')
        },
        {
            // title: 'Hình ảnh',
            dataIndex: 'products',
            key: 'image',
            render: (
                _,
                record: DataType

                // products: {
                //     product: product
                //     productType: ProductType
                // }[]
            ) =>
                record?.products[0]?.productType?.image ? (
                    <>
                        <div className='flex flex-row gap-10'>
                            <img src={record?.products[0].productType.image} alt='Product' style={{ width: 120 }} />
                            <div className='flex flex-row gap-24 '>
                                <div className='flex flex-col gap-5  '>
                                    <p className='text-base'>{record?.products[0].product.name}</p>
                                    <p className='text-gray-400'>
                                        Phân loại:
                                        {record?.products[0].productType.color} - {record?.products[0].productType.size}
                                        <p className='text-sm pt-2'>Số lượng: {record?.totalQuantity}</p>
                                    </p>
                                    <p
                                        className='text-base '
                                        dangerouslySetInnerHTML={{
                                            __html: formatPriceBootstrap(record?.products[0].productType.price)
                                        }}
                                    ></p>
                                </div>
                                <p
                                    className='text-lg pt-20'
                                    dangerouslySetInnerHTML={{
                                        __html: formatPrice(record?.money)
                                    }}
                                ></p>
                            </div>
                        </div>
                    </>
                ) : null
        },

        {
            // title: 'Hành động',
            dataIndex: '',
            key: '',
            render: (_, record: DataType) => (
                <Space>
                    <div className=' flex flex-col gap-3'>
                        {/* Nút "Xem chi tiết" hiển thị luôn */}
                        <Link to={`order_detail/${record._id}`}>
                            <Button>Xem chi tiết</Button>
                        </Link>

                        {/* Nút "Hủy đơn hàng" hiển thị khi trạng thái là "Chờ xác nhận" hoặc "Đang chuẩn bị hàng" */}
                        {(record.orderstatus === 'Chờ xác nhận' || record.orderstatus === 'Đang chuẩn bị hàng') && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            handleWhyCancelButtonClick(
                                                record?._id,
                                                record?.products[0]?.product?._id,
                                                record?.products[0]?.productType?._id
                                            )
                                        }
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>Hủy đơn</DialogTitle>
                                        <DialogDescription>Mời bạn viết lí do hủy đơn hàng</DialogDescription>
                                    </DialogHeader>
                                    <form action=''>
                                        <div className='grid gap-4 py-5'>
                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                <Label htmlFor='message' className='text-right'>
                                                    Lí do
                                                </Label>
                                                <Input
                                                    className='col-span-3'
                                                    onChange={(e) => setNewWhy(e.target.value)}
                                                />
                                                {/* {errors?.message && (
                                                <span className='error'>Vui lòng viết lí do hủy đơn hàng</span>
                                            )} */}
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type='submit' onClick={handleAddWhy}>
                                                Lưu
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}

                        {/* Nút "Đánh giá" hiển thị khi trạng thái là "Giao hàng thành công" */}
                        {record.orderstatus === 'Đã giao hàng thành công' && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            handleReviewButtonClick(
                                                record?.products[0]?.product?._id,
                                                record?.products[0]?.productType?._id
                                            )
                                        }
                                    >
                                        Đánh giá
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>Đánh giá</DialogTitle>
                                        <DialogDescription>
                                            Mời bạn đánh giá và góp ý cho sản phẩm này
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form action=''>
                                        <div className='grid gap-4 py-5'>
                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                <Label htmlFor='img' className='text-right'>
                                                    Hình ảnh
                                                </Label>
                                                <Input
                                                    onChange={(e) => setNewImg(e.target.value)}
                                                    id='img'
                                                    className='col-span-3'
                                                    type='text'
                                                />
                                            </div>
                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                <Label htmlFor='title' className='text-right'>
                                                    Tiêu đề
                                                </Label>
                                                <Input
                                                    onChange={(e) => setNewTitle(e.target.value)}
                                                    id='title'
                                                    className='col-span-3'
                                                />
                                            </div>
                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                <Label htmlFor='star' className='text-right'>
                                                    Chọn sao
                                                </Label>
                                                <Rate
                                                    onChange={(value) => setNewStar(value)}
                                                    allowHalf
                                                    // value={rating}
                                                    className='col-span-3'
                                                />
                                            </div>
                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                <Label htmlFor='comment' className='text-right'>
                                                    Nhận xét
                                                </Label>
                                                <Input
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    id='comment'
                                                    className='col-span-3'
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type='submit' onClick={handleAddComment}>
                                                Lưu
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                        {record.paymentmethods === 'Thanh toán MoMo' && record.paymentstatus === 'Chờ thanh toán' && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            handleWhyCancelButtonClick(
                                                record?._id,
                                                record?.products[0]?.product?._id,
                                                record?.products[0]?.productType?._id
                                            )
                                        }
                                    >
                                        Thanh toán ngay
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>Hủy đơn</DialogTitle>
                                        <DialogDescription>Mời bạn viết lí do hủy đơn hàng</DialogDescription>
                                    </DialogHeader>
                                    <form action=''>
                                        <div className='grid gap-4 py-5'>
                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                <Label htmlFor='message' className='text-right'>
                                                    Lí do
                                                </Label>
                                                <Input
                                                    className='col-span-3'
                                                    onChange={(e) => setNewWhy(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type='submit' onClick={handleAddWhy}>
                                                Lưu
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </Space>
            )
        }
    ]
    return (
        <Content>
            <main className=' px-8'>
                <div>
                    <div className='flex flex-col gap-5 '>
                        <Tabs defaultActiveKey='1' items={items} onChange={onChangeTab} style={{ padding: '0 40px' }} />
                        <Table columns={columns} dataSource={filteredData} />;
                    </div>
                </div>
            </main>
        </Content>
    )
}
export default OrderPage
