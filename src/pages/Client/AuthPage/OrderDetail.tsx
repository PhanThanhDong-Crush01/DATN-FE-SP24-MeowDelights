import '../../../styles/BillDetail.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useBillDetailQuery } from '@/hooks/BillDetail/useBillDetailQuery'
import { formatPrice, formatPriceBootstrap } from '@/lib/utils'
import { GrLinkNext } from 'react-icons/gr'
import { IoCardSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    const form = useForm<any>()

    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2 '>
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

                <button
                    className='flex flex-row gap-3 bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 pl-3 mr-32 rounded h-10 w-36 text-right mt-10 hover:bg-blue-300'
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
                        </div>
                        <div className='flex flex-col gap-3' id='trang-thai-thanh-toan'>
                            <p id='ten-cua-hang' className='mt-2 font-serif text-lg'>
                                Phương thức thanh toán: {data?.bill?.paymentmethods}
                            </p>
                            <p
                                id='ten-cua-hang'
                                className='mt-2 font-serif text-lg'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}
                            >
                                Trạng thái thanh toán: &nbsp;
                                <span
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center'
                                    }}
                                >
                                    {data?.bill?.paymentstatus} &nbsp;
                                    {data?.bill?.paymentstatus === 'Chưa thanh toán' &&
                                    data?.bill?.paymentmethods === 'Thanh toán qua PayPal' ? (
                                        <>
                                            <GrLinkNext />
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
                                            >
                                                Thanh toán ngay &nbsp; <IoCardSharp />
                                            </button>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </span>
                            </p>
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
