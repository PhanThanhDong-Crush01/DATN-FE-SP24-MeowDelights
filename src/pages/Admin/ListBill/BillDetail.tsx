import '../../../styles/BillDetail.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBillDetailQuery } from '@/hooks/BillDetail/useBillDetailQuery'
import { formatPrice, formatPriceBootstrap } from '@/lib/utils'
import { GrLinkNext } from 'react-icons/gr'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { apiCancelOrder, apiChangeStatusOrder, getOneCancelOrder } from '@/services/bill'
import { useBillDetailMutation } from '@/hooks/BillDetail/useBillDetailMutation'
import { Image } from 'antd'
import { IoCardSharp } from 'react-icons/io5'
const BillDetail = () => {
    const handlePrint = () => {
        const printContent = document.getElementById('bill-detail')
        const originalContents = document.body.innerHTML

        document.body.innerHTML = printContent.innerHTML

        window.print()

        document.body.innerHTML = originalContents
    }
    const [open, setOpen] = useState(false)
    const { id } = useParams()
    const { data } = useBillDetailQuery(id)
    const [bill, setBill] = useState<any>()
    console.log('🚀 ~ BillDetail ~ bill:', bill)
    const [messgaseCanCelOrder, setmessgaseCanCelOrder] = useState<any>()
    useEffect(() => {
        if (data) {
            setBill(data)
            if (data?.bill?.orderstatus == 'Đã hủy hàng') {
                const fetch = async () => {
                    const mess = await getOneCancelOrder(id)
                    setmessgaseCanCelOrder(mess?.datas)
                }
                fetch()
            }
        }
    }, [data, open, id])

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

    const validOrderStatuses = [
        'Chờ xác nhận',
        'Đang chuẩn bị hàng',
        'Đã giao hàng cho đơn vị vận chuyển',
        'Đang giao hàng',
        'Đã giao hàng thành công'
    ]

    // Lọc ra các order status chưa có trong billChangeStatusOrderHistory
    // Lấy ra trạng thái mới nhất từ billChangeStatusOrderHistory
    const latestStatus =
        data?.billChangeStatusOrderHistory.length > 0
            ? data.billChangeStatusOrderHistory[data.billChangeStatusOrderHistory.length - 1].changeStatusOrder
                  .statusOrder
            : null

    // Tìm trạng thái tiếp theo trong mảng validOrderStatuses
    const nextStatusIndex = latestStatus ? validOrderStatuses.indexOf(latestStatus) + 1 : 0
    const nextStatus = validOrderStatuses.slice(nextStatusIndex, nextStatusIndex + 1)

    // Chỉ hiển thị trạng thái tiếp theo trong dropdown
    const missingOrderStatusesFormatted = nextStatus.map((status: string) => ({ status: status }))

    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    const form = useForm<any>()

    const handleSubmitForm = async (data: any) => {
        if (!data) {
            toast({
                variant: 'destructive',
                title: 'Mời chọn trạng thái !'
            })
        } else {
            const changeStatusOrder = {
                idBill: id,
                idStaff: userID,
                orderstatus: data?.status
            }
            const change = await apiChangeStatusOrder(changeStatusOrder)
            window.location.reload()
            setOpen(false)
        }
    }
    const navigate = useNavigate()

    const handleSubmitOrder = async (data: any) => {
        const CancelOrder: any = {
            _id: id,
            idStaff: userID,
            orderstatus: data?.status
        }
        const change = await apiCancelOrder(CancelOrder)
        setOpen(false)
        navigate('/admin/bill')
    }
    const { onSubmit } = useBillDetailMutation({
        action: 'UPDATE_PAYMENT_STATUS',
        onSuccess: () => {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    })

    const handleSubmitPaymentStatus = (data: any) => {
        const confirm = window.confirm('Xác nhận lại là đơn hàng đã thanh toán!')
        if (confirm) {
            const confirm2 = window.confirm('Xác nhận lại lần 2 là đơn hàng đã thanh toán!')
            if (confirm2) {
                const updatedPayMents = {
                    ...data,
                    _id: id,
                    paymentstatus: 'Đã thanh toán'
                }
                onSubmit(updatedPayMents)
            }
        }
    }

    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2 '>
            <div className='flex flex-row  mt-4 ml-20 gap-72 pl-10'>
                <h4
                    className='text-[30px] font-bold text-black dark:text-white pb-5  mt-10'
                    id='name-bill'
                    style={{ fontWeight: 900 }}
                >
                    Hóa đơn chi tiết
                </h4>

                <button
                    className='flex flex-row gap-3 bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 pl-3 rounded h-10 w-36 text-right mx-16 mt-10 hover:bg-blue-300'
                    onClick={handlePrint}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-printer mt-1'
                        viewBox='0 0 16 16'
                    >
                        <path d='M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1' />
                        <path d='M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1' />
                    </svg>
                    In hóa đơn
                </button>
            </div>
            <div id='bill-detail' className=' border-2 border-blue-300  rounded  w-auto mx-28 my-2'>
                <div className='  md:px-6 xl:px-7.5 '>
                    {/* <span className='font-bold text-base text-blue-500'>Thời gian đặt hàng: 17.00pm 12/1/2024</span> */}
                    <div className=' gap-72 font-thin text-base  flex flex-row pt-2'>
                        <div className='flex flex-col gap-3 pl-2'>
                            <p id='ten-cua-hang' className='mt-2 font-serif'>
                                Trạng thái giao hàng
                            </p>

                            <ul>
                                {bill?.billChangeStatusOrderHistory &&
                                    bill?.billChangeStatusOrderHistory.map((item: any) => (
                                        <li
                                            style={{
                                                listStyle: 'inside',
                                                marginTop: '5px',
                                                fontWeight: 500,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {TimeDate(item?.changeStatusOrder?.createdAt)}
                                            &nbsp;
                                            <GrLinkNext />
                                            &nbsp;
                                            {item?.changeStatusOrder?.statusOrder}
                                        </li>
                                    ))}
                            </ul>

                            {data?.bill?.orderstatus != 'Đã hủy hàng' && (
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        {/* <Button>Hủy đơn hàng</Button> */}
                                        <Button
                                            variant='outline'
                                            style={{
                                                backgroundColor: 'white',
                                                borderColor: '#93C5FD',
                                                color: '#93C5FD'
                                            }}
                                        >
                                            Cập nhật trạng thái
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className='sm:max-w-[425px]'>
                                        <DialogHeader>
                                            <DialogTitle>Thay đổi trạng thái giao hàng</DialogTitle>
                                            <DialogDescription>
                                                Cập nhật trạng thái giao hàng do nhân viên hoặc shiper thông báo
                                            </DialogDescription>
                                        </DialogHeader>

                                        <Form {...form}>
                                            <form
                                                onSubmit={form.handleSubmit(handleSubmitForm)}
                                                className='w-2/3 space-y-6'
                                                style={{ textAlign: 'center' }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name='status'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className='w-[370px]'>
                                                                        <SelectValue
                                                                            placeholder='Trạng thái'
                                                                            style={{ color: 'black' }}
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {missingOrderStatusesFormatted.map(
                                                                        (item: any, index: number) => (
                                                                            <SelectItem key={index} value={item.status}>
                                                                                {item.status}
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className='flex'>
                                                    <Button className='bg-[red]' onClick={() => handleSubmitOrder({})}>
                                                        Hủy đơn hàng
                                                    </Button>

                                                    <Button type='submit' className='ml-10'>
                                                        Submit
                                                    </Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {data?.bill?.orderstatus == 'Đã hủy hàng' && (
                                <h1 style={{ fontSize: '20px', color: 'black' }}>
                                    Lí do: <span style={{ color: 'red' }}>{messgaseCanCelOrder?.message}</span>
                                </h1>
                            )}
                        </div>
                        <div className='mt-2' id='trang-thai-thanh-toan'>
                            <p id='ten-cua-hang' className=' font-serif'>
                                Phương thức thanh toán: {data?.bill?.paymentmethods}
                            </p>
                            <p
                                className='mt-2 font-serif'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center'
                                }}
                            >
                                Trạng thái thanh toán: &nbsp;
                                <span
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center'
                                    }}
                                >
                                    {data?.bill?.paymentstatus == 'Chưa thanh toán' ||
                                    data?.bill?.paymentstatus == 'Chờ thanh toán' ? (
                                        <span style={{ color: 'red', fontWeight: 700 }}>Chưa thanh toán</span>
                                    ) : (
                                        <span style={{ color: 'green', fontWeight: 700 }}>Đã thanh toán</span>
                                    )}
                                </span>
                            </p>
                            {data?.bill?.paymentstatus == 'Chưa thanh toán' ||
                            data?.bill?.paymentstatus == 'Chờ thanh toán' ? (
                                <div className='flex mt-2' style={{ alignItems: 'center' }}>
                                    <GrLinkNext /> &nbsp;
                                    <button
                                        style={{
                                            backgroundColor: 'orangered',
                                            color: 'wheat',
                                            padding: '5px',
                                            border: '1px solid gray',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '12px'
                                        }}
                                        onClick={() => handleSubmitPaymentStatus(data?.bill?._id)}
                                    >
                                        Cập nhật thanh toán &nbsp; <IoCardSharp />
                                    </button>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 border-stroke py-1  dark:border-strokedark pt-5'>
                        <div>
                            <p className='text-lg'>Thông tin cửa hàng</p>
                            <table style={{ textAlign: 'left' }}>
                                <thead>
                                    <tr>
                                        <th>Tên cửa hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tr>
                                    <td>MeoDelight</td>
                                    <td>0334370130</td>
                                    <td>ngõ 71, Phương Canh, Nam Từ Liêm</td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <p className='text-lg'>Thông tin người nhận</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tên cửa hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data?.bill?.nameUser}</td>
                                        <td>{data?.bill?.tel}</td>
                                        <td>{data?.bill?.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='pt-5 mb-5'>
                        <p className=' text-lg '>Thông tin sản phẩm</p>
                        <table className='w-full' style={{ textAlign: 'center' }}>
                            <thead>
                                <tr className=''>
                                    <th className=''>#</th>
                                    <th className='w-[40%]'>Sản phẩm</th>
                                    <th className=''>Kích thước</th>
                                    <th className=''>Số lượng</th>
                                    <th className=''>Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.billDetails &&
                                    data?.billDetails.map((item: any, index: number) => (
                                        <tr key={item?.imageTypePro}>
                                            <td className=''>{index + 1}</td>
                                            <td
                                                style={{
                                                    textAlign: 'left',
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Image
                                                    src={item?.imageTypePro}
                                                    alt='product'
                                                    width={100}
                                                    style={{
                                                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                    }}
                                                />
                                                <Link to={'/products/' + item?.idpro} className='ml-3'>
                                                    {item?.namePro}
                                                </Link>
                                            </td>
                                            <td className='text-center'>{item?.nameTypePro}</td>
                                            <td className='text-center'>{item?.quantity}</td>
                                            <td
                                                style={{ fontWeight: 700 }}
                                                dangerouslySetInnerHTML={{
                                                    __html: formatPriceBootstrap(item?.money)
                                                }}
                                            ></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='text-xl pt-2 text-end bg-blue-200 px-5 py-2'>
                        <p className='mb-2'>
                            Giảm: &nbsp;
                            <span
                                style={{ fontWeight: 700 }}
                                className='text-red-500 text-xl'
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(data?.bill?.decreaseVc)
                                }}
                            ></span>
                        </p>
                        <p className='mb-2'>
                            Vận chuyển: &nbsp;
                            <span
                                style={{ fontWeight: 700 }}
                                className='text-red-500 text-xl'
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(25000)
                                }}
                            ></span>
                        </p>
                        <p className='mb-2'>
                            Tổng tiền: &nbsp;
                            <span
                                style={{ fontWeight: 700 }}
                                className='text-red-500 text-xl'
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(data?.bill?.money)
                                }}
                            ></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetail
