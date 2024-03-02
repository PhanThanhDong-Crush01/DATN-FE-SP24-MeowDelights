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

    const idUser = data?.bill?.iduser
    const user = useAuthQuery(idUser || '')
    console.log(user)

    const idVC = data?.bill?.idvc
    const voucher = useVoucherQuery(idVC || '')
    console.log(voucher)
    const idproduct = data?.billDetails?.[0]?.idpro
    console.log(idproduct)
    const product = useProductQuery(idproduct || '')
    console.log(product)

    const idTypePro = data?.billDetails?.[0]?.idprotype
    console.log(idTypePro)
    const typeProduct = product?.data?.typeProduct
    console.log(typeProduct)
    // Lọc mảng typeProduct dựa vào idTypePro
    const filteredTypeProduct = typeProduct
        ? typeProduct.filter((item: any) => {
              return item._id === idTypePro
          })
        : []

    const [currentStep, setCurrentStep] = useState(0)
    useEffect(() => {
        if (data?.bill?.orderstatus) {
            const statusToStep: Record<string, number> = {
                'Chờ xác nhận': 0,
                'Đang chuẩn bị hàng': 1,
                'Đang giao hàng': 2,
                'Giao hàng thành công': 3
            }
            setCurrentStep(statusToStep[data.bill.orderstatus] || 0)
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
                            <p className='font-mono text-lg'>{user?.data?.datas?.name}</p>
                            <p>(+84){data?.bill?.tel}</p>
                            <p>{data?.bill?.adress}</p>
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
                                {
                                    title: 'Đang giao hàng',
                                    description: 'This is a description. This is a description.'
                                },
                                {
                                    title: 'Giao hàng thành công',
                                    description: 'This is a description. This is a description.'
                                }
                            ]}
                        />
                    </div>
                </div>
                <Divider />
                <div className='flex flex-row gap-10 bg-white p-5 rounded-lg'>
                    <img src={product?.data?.data?.image} alt='Product' style={{ width: 120 }} />
                    <div className='flex flex-row gap-24 '>
                        <div className='flex flex-col gap-5  '>
                            <p className='text-base'>{product?.data?.data?.name}</p>
                            <p className='text-gray-400'>
                                Phân loại:{filteredTypeProduct?.[0]?.color} - {filteredTypeProduct?.[0]?.size}
                                <p className='text-sm pt-2'>Số lượng: {data?.billDetails?.[0]?.quantity}</p>
                            </p>
                            <p
                                className='text-base '
                                dangerouslySetInnerHTML={{
                                    __html: formatPriceBootstrap(filteredTypeProduct?.[0]?.price)
                                }}
                            ></p>
                        </div>
                        <p
                            className='text-xl pt-20'
                            dangerouslySetInnerHTML={{
                                __html: formatPrice(data?.bill?.money)
                            }}
                        ></p>
                    </div>
                </div>

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
                    <p className='pl-96'>
                        Mã khuyến mãi : <span className='pl-24'>{voucher?.data?.datas?.name}</span>
                    </p>
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
