import '@/styles/PaymentSuccess.css'
import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { Result } from 'antd'
import { Link } from 'react-router-dom'

const PaymentSuccessPage = () => {
    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-9'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    {/* <form className='search-form' method='post'>
                        <input type='text' placeholder='Search...' value='' />
                        <button type='submit' className='btn search-btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form> */}
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>ĐẶT HÀNG THÀNH CÔNG</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Đặt hàng thành công
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section pt-0'>
                    <div className='container'>
                        <div className='section-title centered' style={{ width: '100%', marginTop: '5%' }}>
                            <span
                                className='subtitle flex'
                                style={{ justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                ĐẶT HÀNG THÀNH CÔNG <Result status='success' style={{ marginTop: '15px' }} />
                            </span>
                            <h3 className='title' style={{ width: '100%' }}>
                                Cảm ơn bạn đã tin tưởng chúng tôi
                                <br />
                                <span style={{ fontSize: '40px' }}>Chúc bạn một ngày vui vui vẻ!</span>
                            </h3>
                        </div>
                        <div style={{ margin: '0 auto', textAlign: 'center' }}>
                            <Link to={'/bill_order'}>
                                <button className='btn'>Danh sách đơn hàng</button>
                            </Link>
                            <Link to={'/bill_order/'} style={{ marginLeft: '20px' }}>
                                <button className='btn'>Xem đơn hàng</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default PaymentSuccessPage
