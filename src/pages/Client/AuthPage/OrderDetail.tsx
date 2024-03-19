import { Divider, Layout, Steps } from 'antd'
import { useParams } from 'react-router-dom'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { useEffect, useState } from 'react'
import { useBillDetailQuery } from '@/hooks/BillDetail/useBillDetailQuery'
import { formatPrice, formatPriceBootstrap } from '@/lib/utils'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
const { Content } = Layout
type Props = {}
const OrderDetailPage = (_props: Props) => {
    const { id } = useParams()
    console.log(id)
    const { data } = useBillDetailQuery(id || '')
    console.log(data)
    const [currentStep, setCurrentStep] = useState(0)
    useEffect(() => {
        if (data?.bill?.orderstatus) {
            const statusToStep: Record<string, number> = {
                'Chờ xác nhận': 0,
                'Đang chuẩn bị hàng': 1,
                'Đã giao hàng cho đơn vị vận chuyển': 2,
                'Đang giao hàng': 3,
                'Đã giao hàng thành công': 4,
                'Đã hủy hàng': 5
            }
            setCurrentStep(statusToStep[data.bill.orderstatus] || 0)
            if (data.bill.orderstatus === 'Đã hủy hàng' && (currentStep === 0 || currentStep === 1)) {
                // Thực hiện các hành động bạn muốn khi đơn hàng bị hủy ở trạng thái này,
                // ví dụ: hiển thị thông báo cho người dùng
                console.log("Đơn hàng đã bị hủy khi đang ở trạng thái 'Chờ xác nhận' hoặc 'Đang chuẩn bị hàng'.")
            }
        }
    }, [data])

    return (
        <Content>
            <main className=' px-10 py-2'>
                <Divider />
                <div className='flex flex-row gap-64 px-5 '>
                    <div className='pt-1'>
                        <h2 className='text-2xl'>Địa chỉ nhận hàng</h2>
                        <div className='pt-2 px-4'>
                            <p className='font-mono text-lg'>{data?.bill?.user?.name}</p>
                            <p>(+84){data?.bill?.user?.phone}</p>
                            <p>{data?.bill?.address}</p>
                        </div>
                    </div>
                    <div className='pt-1'>
                        {' '}
                        <Steps
                            progressDot
                            current={currentStep}
                            direction='vertical'
                            items={[
                                {
                                    title: 'Chờ xác nhận',
                                    description: 'This is a description.'
                                },
                                {
                                    title: 'Đang chuẩn bị hàng',
                                    description: 'This is a description.'
                                },
                                ...(data?.bill?.orderstatus !== 'Đã hủy hàng'
                                    ? [
                                          {
                                              title: 'Đã giao hàng cho đơn vị vận chuyển',
                                              description: 'This is a description. This is a description.'
                                          },
                                          {
                                              title: 'Đang giao hàng',
                                              description: 'This is a description. This is a description.'
                                          },
                                          {
                                              title: 'Giao hàng thành công',
                                              description: 'This is a description. This is a description.'
                                          }
                                      ]
                                    : []),
                                ...(data?.bill?.orderstatus !== 'Đã giao hàng thành công'
                                    ? [
                                          {
                                              title: 'Đã hủy đơn hàng',
                                              description: 'This is a description. This is a description.'
                                          }
                                      ]
                                    : [])
                            ]}
                        />
                    </div>
                </div>
                <Divider />
                {data?.billDetails?.map((item: any) => (
                    <div className='flex flex-row gap-10 bg-white p-5 rounded-lg' key={item._id}>
                        <img src={item.product.image} alt='Product' style={{ width: 120 }} />
                        <div className='flex flex-row gap-24 '>
                            <div className='flex flex-col gap-5  '>
                                <p className='text-base'>{item.product.name}</p>
                                <p className='text-gray-400'>
                                    Phân loại: {item.type_product.size} - {item.type_product.color}
                                    <p className='text-sm pt-2'>Số lượng: {item?.quantity}</p>
                                </p>
                                <p
                                    className='text-base '
                                    dangerouslySetInnerHTML={{
                                        __html: formatPriceBootstrap(item.type_product.price)
                                    }}
                                ></p>
                            </div>
                            <p
                                className='text-xl pt-20'
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(item?.money)
                                }}
                            ></p>
                        </div>
                    </div>
                ))}

                {/* <Table columns={columns} dataSource={data} /> */}
                <div className=' pt-5 flex flex-col gap-1 text-base'>
                    <Divider />
                    <div className='flex flex-row gap-36 pl-96'>
                        <span>Tổng tiền</span>
                        <span
                            className='text-base '
                            dangerouslySetInnerHTML={{
                                __html: formatPriceBootstrap(data?.bill?.money)
                            }}
                        ></span>
                    </div>
                    <Divider />
                    {/* <p className='pl-96'>
                        Mã khuyến mãi : <span className='pl-24'>{voucher?.data?.datas?.name}</span>
                    </p> */}
                    <Divider />
                    <p className='pl-96'>
                        Phương thức thanh toán : <span className='pl-10'>{data?.bill?.paymentmethods}</span>{' '}
                    </p>
                    <Divider />
                </div>
            </main>
        </Content>
    )
}

export default OrderDetailPage
