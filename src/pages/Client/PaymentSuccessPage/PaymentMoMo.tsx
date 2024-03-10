import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import moment from 'moment' // Import Moment.js
import 'moment/locale/vi'
import moment from 'moment'
import instance from '@/services/core/api'

moment.locale('vi')
const PaymentMoMo = () => {
    const navigate = useNavigate()

    const [paymentStatus, setPaymentStatus] = useState('')

    const initiatePayment = async () => {
        try {
            // Gửi yêu cầu thanh toán đến máy chủ Node.js
            const response = await instance.post('/api/payment/initiate', {
                // Bao gồm các chi tiết thanh toán ở đây
            })

            // Cập nhật trạng thái thanh toán từ phản hồi của máy chủ Node.js
            setPaymentStatus(response.data.status)
        } catch (error) {
            console.error('Lỗi khi khởi tạo thanh toán:', error)
            setPaymentStatus('Thất bại')
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/payment_success')
        }, 3000)

        // Clear the timeout when the component unmounts to avoid memory leaks
        return () => clearTimeout(timer)
    }, [navigate])
    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-9'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Search...' value='' />
                        <button type='submit' className='btn search-btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form>
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>Thanh toán MoMo</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                MoMo
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section section-padding'>
                    <div>
                        <button onClick={initiatePayment}>Khởi tạo thanh toán</button>
                        {paymentStatus && <p>Trạng thái thanh toán: {paymentStatus}</p>}
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default PaymentMoMo
