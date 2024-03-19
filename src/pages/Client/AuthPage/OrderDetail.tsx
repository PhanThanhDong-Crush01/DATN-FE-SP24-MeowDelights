import '../../../styles/BillDetail.css'
import { Link, useParams } from 'react-router-dom'
import { useBillDetailQuery } from '@/hooks/BillDetail/useBillDetailQuery'
import { formatPrice, formatPriceBootstrap } from '@/lib/utils'
import { GrLinkNext } from 'react-icons/gr'
import { IoCardSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import ThanhToanSau from '../PaymentSuccessPage/ThanhToanSau'
import { Image } from 'antd'

const BillDetail = () => {
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

    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    const [showThanhToanSau, setShowThanhToanSau] = useState(false)
    const [idBill, setIdBill] = useState('')

    const handleThanhToanNgay = (id: string) => {
        setIdBill(id)
        setShowThanhToanSau(true)
    }

    return (
        <div
            className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2 '
            style={{ margin: '0 auto' }}
        >
            <div
                className='mt-4 ml-20 gap-72 pl-10'
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <h4
                    className='text-[30px] font-bold text-black dark:text-white pb-5  mt-10'
                    id='name-bill'
                    style={{ fontWeight: 900 }}
                >
                    Hóa đơn chi tiết
                    <br />
                    <span style={{ fontSize: '19px' }}>Code: {id}</span>
                </h4>
            </div>
            <div id='bill-detail' className=' border-2 border-blue-300  rounded  w-auto mx-28 my-2'>
                <div className='  md:px-6 xl:px-7.5 '>
                    {/* <span className='font-bold text-base text-blue-500'>Thời gian đặt hàng: 17.00pm 12/1/2024</span> */}
                    <div className=' gap-10 font-thin text-base  flex flex-col pt-2'>
                        <div className='flex flex-col pl-2'>
                            <p id='ten-cua-hang' className='mt-2 font-serif text-lg'>
                                Trạng thái giao hàng
                            </p>

                            <ul>
                                {bill?.billChangeStatusOrderHistory &&
                                    bill?.billChangeStatusOrderHistory.map((item: any) => (
                                        <li
                                            key={item?.changeStatusOrder?.createdAt}
                                            style={{
                                                marginTop: '5px',
                                                fontWeight: 500,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span style={{ color: 'gray' }}>
                                                {TimeDate(item?.changeStatusOrder?.createdAt)}
                                            </span>
                                            &nbsp;
                                            <GrLinkNext />
                                            &nbsp;
                                            {item?.changeStatusOrder?.statusOrder}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className='' id='trang-thai-thanh-toan'>
                            <p id='ten-cua-hang' className=' font-serif text-lg'>
                                Phương thức thanh toán: {data?.bill?.paymentmethods}
                            </p>
                            <p
                                className='mt-2 font-serif text-lg'
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
                                    &nbsp;
                                    {data?.bill?.paymentstatus === 'Chờ thanh toán' &&
                                    data?.bill?.paymentmethods === 'Thanh toán qua PayPal' ? (
                                        <>
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
                                                onClick={() => handleThanhToanNgay(data?.bill?._id)}
                                            >
                                                Thanh toán ngay &nbsp; <IoCardSharp />
                                            </button>
                                            {showThanhToanSau && (
                                                <ThanhToanSau money={data?.bill?.money} idBill={idBill} show={true} />
                                            )}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 border-stroke py-1  dark:border-strokedark  pt-5'>
                        <div>
                            <p className='text-lg'>Thông tin cửa hàng</p>
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
