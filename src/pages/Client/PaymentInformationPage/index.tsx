import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { formatPriceBootstrap } from '@/lib/utils'
import '@/styles/PaymentInformation.css'
import { Alert, Flex, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

const ID_USER = '65b9451b0bbb2b6e014e5588'

const PaymentInformationPage = () => {
    //log data order
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const encodedThongTinDonHang: any = searchParams.get('thongtindonhang')
    const thongTinDonHang = JSON.parse(decodeURIComponent(encodedThongTinDonHang))

    const { data } = useAuthQuery(ID_USER)

    useEffect(() => {
        setValue('name', data?.datas?.name || '')
        setValue('adress', data?.datas?.address || '')
        // setValue('city', data?.datas?.city || '')
        // setValue('country', data?.datas?.country || '')
        setValue('phone', data?.datas?.phone || '')
        setValue('email', data?.datas?.email)
        setValue('note', '')
    }, [data])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState({})
    console.log('🚀 ~ PaymentInformationPage ~ order:', order)

    const onSubmit = (data: any) => {
        data.adress = data.adress + '' + data.city + '' + data.country
        const { city, country, ...newData } = data

        setOrder({ thongTinNhanHang: newData, thongTinDonHang: thongTinDonHang })
    }

    useEffect(() => {
        if (Object.keys(order).length > 0) {
            setIsLoading(true)
            const mahoa = encodeURIComponent(JSON.stringify(order))
            setIsLoading(true)
            setTimeout(() => {
                navigate(`/payment_method_momo?order=${mahoa}`)
            }, 5000) // Chờ 2 giây trước khi điều hướng
        }
    }, [order])

    // Function to get city and country from Geocoding
    async function getCityAndCountry(address: any) {
        try {
            const data = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    address
                )}&key=c8109e9c5cef453aa104a5ab288eba6f`
            )

            if (data?.data?.results.length > 0) {
                const city = data?.data?.results[0]?.components?.state
                const country = data?.data?.results[0]?.components?.country
                setValue('city', city)
                setValue('country', country)

                // if (city === undefined) {
                //     const errorElement:any = document.querySelector('.ghiRoDiaChiHon')
                //     errorElement?.innerText = 'Mời ghi rõ địa chỉ hơn!!!'
                // }
            }
        } catch (error) {
            console.error('Error fetching data from OpenCage Geocoding API')
        }
    }

    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-8'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>THANH TOÁN</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Thanh toán
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                {isLoading ? (
                    <Flex vertical style={{ width: '100%', height: '100%', margin: '0 auto' }}>
                        <Spin tip='Loading...'>
                            <Alert message='Chờ chút nhé' description='Đơn hàng của bạn đang được xử lý.' type='info' />
                        </Spin>
                    </Flex>
                ) : (
                    <div className='section section-padding sigma_product-single'>
                        <div className='container'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'>
                                    <div className='col-xl-7'>
                                        <h4>Chi tiết thanh toán</h4>
                                        <div className='row mb-lg-30'>
                                            <div className='form-group col-xl-12'>
                                                <label>
                                                    Họ và tên <span className='text-danger'>*</span>
                                                </label>
                                                <input
                                                    type='text'
                                                    placeholder='Họ và tên'
                                                    className='form-control'
                                                    {...register('name', { required: true })}
                                                />
                                                {errors.name && <i className='text-danger'>Họ và tên là bắt buộc</i>}
                                            </div>

                                            <div className='form-group col-xl-6'>
                                                <label>
                                                    Số điện thoại <span className='text-danger'>*</span>
                                                </label>
                                                <input
                                                    type='text'
                                                    placeholder='Số điện thoại'
                                                    className='form-control'
                                                    {...register('phone', { required: true })}
                                                />
                                                {errors.phone && (
                                                    <i className='text-danger'>Số điện thoại là bắt buộc</i>
                                                )}
                                            </div>
                                            <div className='form-group col-xl-6'>
                                                <label>
                                                    Email <span className='text-danger'>*</span>
                                                </label>
                                                <input
                                                    type='email'
                                                    placeholder='Email'
                                                    className='form-control'
                                                    {...register('email', { required: true })}
                                                    disabled
                                                />
                                                {errors.email && <i className='text-danger'>Email là bắt buộc</i>}
                                            </div>

                                            <div className='form-group col-xl-12'>
                                                <label>
                                                    Địa chỉ nhận hàng <span className='text-danger'>*</span>
                                                </label>
                                                <input
                                                    type='text'
                                                    placeholder='Địa chỉ....'
                                                    className='form-control'
                                                    {...register('adress', { required: true })}
                                                    onChange={(e: any) => getCityAndCountry(e.target.value)}
                                                />
                                                {errors.adress && (
                                                    <i className='text-danger'>
                                                        Địa chỉ nhận hàng là bắt buộc và bạn phải ghi rõ địa chỉ
                                                    </i>
                                                )}
                                                {/* <i className='text-danger ghiRoDiaChiHon'>Địa chỉ nhận hàng là bắt buộc</i> */}
                                            </div>

                                            <div className='form-group col-xl-12'>
                                                <label>Thị trấn/Thành phố</label>
                                                <input
                                                    type='text'
                                                    placeholder='Thị trấn/Thành phố..'
                                                    className='form-control'
                                                    {...register('city', { required: true })}
                                                    disabled
                                                />
                                                {errors.city && (
                                                    <i className='text-danger'>
                                                        Thành phố là bắt buộc, bạn phải ghi rõ địa chỉ hơn
                                                    </i>
                                                )}
                                            </div>

                                            <div className='form-group col-xl-12'>
                                                <label>Quốc gia</label>
                                                <input
                                                    type='text'
                                                    placeholder='Quốc gia...'
                                                    className='form-control'
                                                    {...register('country', { required: true })}
                                                    disabled
                                                />
                                                {errors.country && (
                                                    <i className='text-danger'>
                                                        Quốc gia là bắt buộc, bạn phải ghi rõ địa chỉ hơn
                                                    </i>
                                                )}
                                            </div>

                                            <div className='form-group col-xl-12 mb-0'>
                                                <label>Ghi chú đặt hàng</label>
                                                <textarea
                                                    rows={5}
                                                    className='form-control'
                                                    placeholder='Ghi chú đặt hàng ( Tùy chọn )'
                                                    {...register('note', { required: false })}
                                                ></textarea>
                                                {errors.note && <i className='text-danger'>Ghi chú là bắt buộc</i>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-5 checkout-billing'>
                                        <table className='sigma_responsive-table'>
                                            <thead>
                                                <tr>
                                                    <th>Sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng cộng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {thongTinDonHang?.order.map((item: any, index: any) => (
                                                    <tr key={index + 1}>
                                                        <td data-title='Product'>
                                                            <div className='sigma_cart-product-wrapper'>
                                                                <div className='sigma_cart-product-body'>
                                                                    <h6>
                                                                        <a href={`/products/${item?.product?._id}`}>
                                                                            {item?.product?.name.length > 30
                                                                                ? `${item?.product?.name.substring(
                                                                                      0,
                                                                                      30
                                                                                  )}...`
                                                                                : item?.product?.name}
                                                                        </a>
                                                                    </h6>
                                                                    <p>
                                                                        {item?.typeProduct?.color} -
                                                                        {item?.typeProduct?.size}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td data-title='Quantity'>{item?.quantity}</td>
                                                        <td data-title='Total'>
                                                            <strong
                                                                dangerouslySetInnerHTML={{
                                                                    __html: formatPriceBootstrap(Number(item?.money))
                                                                }}
                                                            ></strong>
                                                        </td>
                                                    </tr>
                                                ))}

                                                <tr className='total'>
                                                    <td>
                                                        <h6 className='mb-0'>Phí vận chuyển</h6>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <strong
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(
                                                                    Number(thongTinDonHang.phiVanChuyen)
                                                                )
                                                            }}
                                                        ></strong>
                                                    </td>
                                                </tr>
                                                <tr className='total'>
                                                    <td>
                                                        <h6 className='mb-0'>Giảm giá</h6>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <strong
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(
                                                                    Number(thongTinDonHang?.voucher?.soTienGiam)
                                                                )
                                                            }}
                                                        ></strong>
                                                    </td>
                                                </tr>
                                                <tr className='total'>
                                                    <td>
                                                        <h6 className='mb-0'>Tổng tiền thanh toán</h6>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <strong
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(
                                                                    Number(thongTinDonHang.tongTien)
                                                                )
                                                            }}
                                                        ></strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className='form-group col-xl-12'>
                                            <label>
                                                Phương thức thanh toán <span className='text-danger'>*</span>
                                            </label>
                                            <select
                                                className='form-control'
                                                {...register('paymentmethods', { required: true })}
                                                style={{ fontSize: '17px', color: 'blue', width: '103%' }}
                                            >
                                                <option disabled style={{ fontSize: '17px' }}>
                                                    ----- Chọn phương thức thanh toán -----
                                                </option>
                                                <option value='Thanh toán qua MoMo' style={{ fontSize: '17px' }}>
                                                    Thanh toán qua MoMo
                                                </option>
                                                <option value='Thanh toán khi nhận hàng' style={{ fontSize: '17px' }}>
                                                    Thanh toán khi nhận hàng
                                                </option>
                                            </select>
                                            {errors.paymentmethods && (
                                                <i className='text-danger'>
                                                    Hãy chọn một phương thức thanh toán thuận tiện với bạn
                                                </i>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                backgroundImage: 'url("src/assets/img/subheader-br.png")'
                                            }}
                                        >
                                            <button
                                                type='submit'
                                                className='sigma_btn-custom primary d-block w-100 btn'
                                                style={{
                                                    height: '140px',
                                                    width: 'auto',
                                                    fontSize: '25px',
                                                    fontWeight: 700
                                                }}
                                            >
                                                --- Đặt Hàng ---
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <FooterTemplate />
            </div>
        </>
    )
}

export default PaymentInformationPage
