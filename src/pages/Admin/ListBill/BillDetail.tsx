import '../../../styles/BillDetail.css'
import { useNavigate, useParams } from 'react-router-dom'
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
import { apiCancelOrder, apiChangeStatusOrder } from '@/services/bill'
import { useBillDetailMutation } from '@/hooks/BillDetail/useBillDetailMutation'
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
    useEffect(() => {
        if (data) {
            setBill(data)
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
            console.log('🚀 ~ handleSubmitForm ~ changeStatusOrder:', changeStatusOrder)
            const change = await apiChangeStatusOrder(changeStatusOrder)
            setBill({ ...bill?.billChangeStatusOrderHistory, ...change.changeOrder })
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
        setBill({ ...bill?.billChangeStatusOrderHistory, ...change.changeOrder })
        setOpen(false)

        navigate('/admin/bill')
    }
    const { register, handleSubmit, setValue } = useForm()
    const { onSubmit } = useBillDetailMutation({
        action: 'UPDATE_PAYMENT_STATUS',
        onSuccess: () => {
            navigate('/admin/bill')
        }
    })
    useEffect(() => {
        if (data) {
            console.log('Order status from data:', data?.bill?.paymentstatus)
            setValue('paymentstatus', data?.bill?.paymentstatus)
        }
    }, [data, setValue])

    const handleSubmitPaymentStatus = (data: any) => {
        const updatedPayMents = {
            ...data,
            _id: id,
            paymentstatus: data.paymentstatus
        }
        console.log('🚀 ~ onHandleSubmit ~ updatedCategory:', updatedPayMents)
        onSubmit(updatedPayMents)
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
                            <p id='ten-cua-hang' className='mt-2 font-serif text-lg'>
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

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    {/* <Button>Hủy đơn hàng</Button> */}
                                    <Button
                                        variant='outline'
                                        style={{ backgroundColor: 'white', borderColor: '#93C5FD', color: '#93C5FD' }}
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
                                            <div className='flex flex-row gap-16'>
                                                <Button className='' onClick={() => handleSubmitOrder({})}>
                                                    Hủy đơn hàng
                                                </Button>
                                                <Button type='submit' className=''>
                                                    Submit
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className='flex flex-col gap-3' id='trang-thai-thanh-toan'>
                            <p id='ten-cua-hang' className='mt-2 font-serif text-lg'>
                                Trạng thái thanh toán
                            </p>
                            <form action='' onSubmit={handleSubmit(handleSubmitPaymentStatus)}>
                                <select
                                    {...register('paymentstatus')}
                                    name='paymentstatus'
                                    id='trang-thai-don-hang'
                                    className='w-44 h-12 border-2 px-2 border-blue-300 rounded-md bg-blue-300 text-white '
                                >
                                    {data?.bill?.paymentmethods !== 'Thanh toán MoMo' && (
                                        <>
                                            <option className='font-medium'>{data?.bill?.paymentstatus}</option>
                                            {data?.bill?.paymentstatus !== 'Thanh toán thành công' && (
                                                <>
                                                    <option className='font-medium'>Chưa thanh toán</option>
                                                    <option className='font-medium'>Thanh toán thành công</option>
                                                    <option className='font-medium'>Chờ thanh toán</option>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {data?.bill?.paymentmethods !== 'Thanh toán khi nhận hàng' && (
                                        <>
                                            <option className='font-medium'>{data?.bill?.paymentstatus}</option>
                                            {data?.bill?.paymentstatus !== 'Thanh toán thành công' && (
                                                <>
                                                    <option className='font-medium'>Chờ thanh toán</option>
                                                    <option className='font-medium'>Thanh toán thành công</option>
                                                </>
                                            )}
                                        </>
                                    )}
                                </select>
                                <Button className='mt-2' type='submit'>
                                    Cập nhật
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 border-stroke py-1  dark:border-strokedark   font-thin text-base pt-5'>
                        <div>
                            <p className=' font-serif text-lg'>Thông tin cửa hàng</p>
                            <table>
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
                            <p className=' font-serif text-lg'>Thông tin người nhận</p>
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
                                        <td>{data?.bill?.user.name}</td>
                                        <td>{data?.bill?.tel}</td>
                                        <td>{data?.bill?.adress}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='font-thin text-base pt-5 mb-5'>
                        <p className=' font-serif text-lg '>Thông tin sản phẩm</p>
                        <table className='w-full'>
                            <thead>
                                <tr className=''>
                                    <th className=''>STT </th>
                                    <th className=''>Sản phẩm</th>
                                    <th className=''>Kích thước</th>
                                    <th className=''>Số lượng</th>
                                    <th className=''>Gía</th>
                                    <th className=''>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.billDetails &&
                                    data?.billDetails.map((item: any, index: number) => (
                                        <tr>
                                            <td className=''>{index + 1}</td>
                                            <>
                                                <td className=''>
                                                    <img src={item?.type_product?.image} alt='' /> {item?.product?.name}
                                                </td>
                                                <td className='text-center'>
                                                    {item?.type_product?.color} - {item?.type_product?.size}
                                                </td>
                                                <td className='text-center'>{item?.quantity}</td>
                                                <td
                                                    className='text-base '
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatPriceBootstrap(item?.type_product?.price)
                                                    }}
                                                ></td>
                                                <td
                                                    className='text-xl pt-4'
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatPrice(item?.money)
                                                    }}
                                                ></td>
                                            </>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <p
                        style={{ fontWeight: 900 }}
                        className='text-xl pt-2 text-end bg-blue-400 text-red-500 text-xl  font-extralight px-5 my-3 h-16'
                        dangerouslySetInnerHTML={{
                            __html: formatPrice(data?.bill?.money)
                        }}
                    ></p>
                </div>
            </div>
        </div>
    )
}

export default BillDetail
