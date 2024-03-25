import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, Input, Rate, Space, Table, Tabs } from 'antd'
import type { InputRef, TableColumnType, TableProps, TabsProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Link, useNavigate } from 'react-router-dom'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'
import { SearchOutlined } from '@ant-design/icons'
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
import { formatPrice } from '@/lib/utils'
import { useWhyCancelOrder } from '@/hooks/Bill/useWhyCancelOrder'
import { FcNext } from 'react-icons/fc'
import ThanhToanSau from '../PaymentSuccessPage/ThanhToanSau'
interface DataType {
    key: string
    _id: string
    iduser: string
    nameUser: string
    email: string
    tel: number
    address: string
    idvc: string
    nameVc: string
    decreaseVc: number
    date: any
    money: number
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
    createdAt: any
    updatedAt: any
    totalQuantity: number
    billDetails: any[]
}
type DataIndex = keyof DataType
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
    const [filteredData, setfilteredData] = useState<any>()
    const [soDonHangChoXacNhan, setsoDonHangChoXacNhan] = useState<any>(0)
    const [soDonHangDangChuanBiHang, setsoDonHangDangChuanBiHang] = useState<any>(0)
    const [soDonHangGiao, setsoDonHangGiao] = useState<any>(0)
    const [soDonHangGiaoHangThanhCong, setsoDonHangGiaoHangThanhCong] = useState<any>(0)
    const [soDonHangDaHuy, setsoDonHangDaHuy] = useState<any>(0)
    useEffect(() => {
        const filtered = data?.bill
            ?.filter((item: DataType) => {
                switch (selectedTab) {
                    case '1':
                        return true
                    case '2':
                        return item.orderstatus === 'Chờ xác nhận'
                    case '3':
                        return item.orderstatus === 'Đang chuẩn bị hàng'
                    case '4':
                        return (
                            item.orderstatus === 'Đang giao hàng' ||
                            item.orderstatus === 'Đã giao hàng cho đơn vị vận chuyển'
                        )
                    case '5':
                        return item.orderstatus === 'Đã giao hàng thành công'
                    case '6':
                        return item.orderstatus === 'Đã hủy hàng'
                    default:
                        return true
                }
            })
            .sort((a: any, b: any) => {
                // Sắp xếp từ mới nhất đến cũ nhất dựa trên thời gian tạo ra (createdAt)
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
        setfilteredData(filtered)

        // Đếm số lượng các đơn hàng trong mỗi trạng thái
        const countPendingConfirmation = data?.bill.filter((item: any) => item.orderstatus === 'Chờ xác nhận').length
        const countPreparing = data?.bill.filter((item: any) => item.orderstatus === 'Đang chuẩn bị hàng').length
        const countPreparingLoading = data?.bill.filter(
            (item: any) => item.orderstatus === 'Đã giao hàng cho đơn vị vận chuyển'
        ).length
        const countShipping = data?.bill.filter((item: any) => item.orderstatus === 'Đang giao hàng').length
        const countDelivered = data?.bill.filter((item: any) => item.orderstatus === 'Đã giao hàng thành công').length
        const countCancelled = data?.bill.filter((item: any) => item.orderstatus === 'Đã hủy hàng').length

        // Cập nhật số đơn hàng trong mỗi trạng thái bằng cách gọi các hàm setsoDonHang... tương ứng
        setsoDonHangChoXacNhan(countPendingConfirmation)
        setsoDonHangDangChuanBiHang(countPreparing)
        setsoDonHangGiao(() => {
            if (countShipping >= 0 && countPreparingLoading >= 0) {
                return countShipping + countPreparingLoading
            }
        })
        setsoDonHangGiaoHangThanhCong(countDelivered)
        setsoDonHangDaHuy(countCancelled)
    }, [data, selectedTab])
    const onChangeTab = (key: string) => {
        console.log(key)
        setSelectedTab(key)
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Tất cả <span className='text-[red] ml-1 mb-3'> {data?.bill?.length}</span> &nbsp;
                    <FcNext />
                </span>
            )

            // children: 'Content of Tab Pane 1'
        },
        {
            key: '2',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Chờ xác nhận <span className='text-[red] ml-1 mb-3'> {soDonHangChoXacNhan}</span> &nbsp;
                    <FcNext />
                </span>
            )
            // children: 'Content of Tab Pane 2'
        },
        {
            key: '3',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Đang chuẩn bị hàng <span className='text-[red] ml-1 mb-3'> {soDonHangDangChuanBiHang}</span>
                    &nbsp;
                    <FcNext />
                </span>
            )
            // children: 'Content of Tab Pane 3'
        },
        {
            key: '4',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Đang giao hàng <span className='text-[red] ml-1 mb-3'> {soDonHangGiao}</span> &nbsp;
                    <FcNext />
                </span>
            )
            // children: 'Content of Tab Pane 3'
        },

        {
            key: '5',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Giao hàng thành công <span className='text-[red] ml-1 mb-3'> {soDonHangGiaoHangThanhCong}</span>{' '}
                    &nbsp;
                </span>
            )
            // children: 'Content of Tab Pane 3'
        },
        {
            key: '6',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Đơn hàng đã hủy<span className='text-[red] ml-1 mb-3'> {soDonHangDaHuy}</span>
                </span>
            )
            // children: 'Content of Tab Pane 3'
        }
    ]

    // const [isReviewDialogVisible, setIsReviewDialogVisible] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string>('')
    const [selectedProductTypeId, setSelectedProductTypeId] = useState<string>('')
    const [selectedIdBill, setSelectedIdBill] = useState<string>('')

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
    const handleWhyCancelButtonClick = (idbill: string) => {
        setSelectedIdBill(idbill)
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
    }
    const { onSubmit } = useCommentMutation({
        action: 'ADD'
    })
    const handleAddWhy = () => {
        const dataWhy = {
            idbill: selectedIdBill,
            iduser: userID || '',
            message: newWhy
        }
        onSubmitWhy(dataWhy)
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

            window.location.reload()
        }
    })

    const TimeDate = (time: any) => {
        const createdAtDate = new Date(time)
        const day = createdAtDate.getDate().toString().padStart(2, '0')
        const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0')
        const year = createdAtDate.getFullYear().toString().slice(-2)

        const formattedDate = `${day}/${month}/${year}`
        const timeTmas = createdAtDate.toLocaleTimeString('en-GB', { hour12: false })

        const inRa = timeTmas + ' - ' + formattedDate
        return inRa
    }
    const [showThanhToanSau, setShowThanhToanSau] = useState(false)
    const [idBill, setIdBill] = useState('')

    const handleThanhToanNgay = (id: string) => {
        setIdBill(id)
        setShowThanhToanSau(true)
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Đơn hàng',
            dataIndex: '_id',
            key: '_id',
            ...getColumnSearchProps('_id'),
            render: (_: any, record: DataType) => (
                <>
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div className='thongtindonhang' style={{ flex: 1 }}>
                            <div className='mb-3'>
                                <h1 style={{ fontSize: '20px' }}>
                                    Mã: <u>{record?._id}</u>
                                </h1>
                            </div>
                            {record?.billDetails.map((item: any) => (
                                <div
                                    className='flex mb-3'
                                    style={{ alignItems: 'flex-start' }}
                                    key={item?.imageTypePro}
                                >
                                    <Image
                                        src={item?.imageTypePro}
                                        alt='Product'
                                        width={70}
                                        style={{
                                            boxShadow:
                                                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                            padding: '5px'
                                        }}
                                    />
                                    <div className='flex flex-col ml-2'>
                                        <p className='text-base'>{item?.namePro}</p>
                                        <p className='text-gray-400'>
                                            Phân loại: &nbsp;
                                            {item?.nameTypePro}
                                        </p>
                                        <p className='text-sm'>x{item?.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className='thongtingia'
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'end'
                            }}
                        >
                            <h1 style={{ fontSize: '20px', color: 'red' }}>
                                <i>{record?.orderstatus}</i>,<br />
                                <span style={{ fontSize: '16px', color: 'black' }}>{TimeDate(record?.updatedAt)}</span>
                            </h1>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <p>{record.paymentstatus === 'Đã thanh toán' ? 'Đã thanh toán: ' : ''} &nbsp;</p>
                                <p
                                    style={{ fontWeight: '700' }}
                                    className='text-lg text-[red]'
                                    dangerouslySetInnerHTML={{
                                        __html: formatPrice(record?.money)
                                    }}
                                ></p>
                            </div>
                        </div>
                    </div>
                    <hr style={{ marginBottom: '20px', border: '1px solid #DCDCDC' }} />
                </>
            )
        },

        {
            // title: 'Hành động',
            dataIndex: '',
            key: '',
            render: (_: any, record: DataType) => (
                <Space>
                    <div className=' flex flex-col gap-3'>
                        {/* Nút "Xem chi tiết" hiển thị luôn */}
                        <Link to={`order_detail/${record._id}`}>
                            <Button>Xem chi tiết</Button>
                        </Link>

                        {/* Nút thanh toán PayPal */}
                        <>
                            {record.paymentmethods === 'Thanh toán qua PayPal' &&
                                record.paymentstatus === 'Chờ thanh toán' && (
                                    <Button
                                        style={{ backgroundColor: 'orange', color: 'red' }}
                                        onClick={() => handleThanhToanNgay(record._id)}
                                    >
                                        Thanh toán ngay
                                    </Button>
                                )}

                            {showThanhToanSau && <ThanhToanSau money={record.money} idBill={idBill} show={true} />}
                        </>

                        {/* Nút "Hủy đơn hàng" hiển thị khi trạng thái là "Chờ xác nhận" hoặc "Đang chuẩn bị hàng" */}
                        {(record.orderstatus === 'Chờ xác nhận' || record.orderstatus === 'Đang chuẩn bị hàng') &&
                            record.paymentstatus !== 'Đã thanh toán' && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            type='primary'
                                            danger
                                            onClick={() => handleWhyCancelButtonClick(record?._id)}
                                        >
                                            Hủy đơn hàng
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className='sm:max-w-[425px]'>
                                        <DialogHeader>
                                            <DialogTitle>Hủy đơn</DialogTitle>
                                            <DialogDescription>
                                                Mời bạn viết lí do hủy đơn hàng {record?._id}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form action=''>
                                            <Input
                                                className='col-span-3'
                                                onChange={(e) => setNewWhy(e.target.value)}
                                                placeholder='Lí do...'
                                                style={{
                                                    border: '1px solid gray',
                                                    borderRadius: '10px',
                                                    marginBottom: '10px'
                                                }}
                                            />
                                            <DialogFooter>
                                                <Button
                                                    type='primary'
                                                    style={{ backgroundColor: 'blueviolet' }}
                                                    onClick={handleAddWhy}
                                                >
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
                                    // onClick={() =>
                                    //     handleReviewButtonClick(
                                    //         record?.products[0]?.product?._id,
                                    //         record?.products[0]?.productType?._id
                                    //     )
                                    // }
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
                                            <Button onClick={handleAddComment}>Lưu</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}

                        {record.orderstatus === 'Đã hủy hàng' && (
                            <Button style={{ backgroundColor: 'gray', color: 'white' }}>Đã hủy</Button>
                        )}
                    </div>
                </Space>
            )
        }
    ]
    return (
        <Content>
            <main className=''>
                <div>
                    <div className='flex flex-col gap-5 '>
                        <Tabs defaultActiveKey='1' items={items} onChange={onChangeTab} style={{ padding: '0 30px' }} />
                        <Table columns={columns} dataSource={filteredData} />;
                    </div>
                </div>
            </main>
        </Content>
    )
}
export default OrderPage
