import '@/styles/PaymentSuccess.css'
import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { useForm } from 'react-hook-form'

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

                {/* <div className='section section-padding'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_info style-24'>
                                    <div className='sigma_info-title'>
                                        <span className='sigma_info-icon bg-primary-1 text-white'>
                                            <i className='flaticon-pin'></i>
                                        </span>
                                    </div>
                                    <div className='sigma_info-description'>
                                        <h5>Địa chỉ của chúng tôi</h5>
                                        <p>TT.Đạo Đức - Bình Xuyên - Vĩnh Phúc.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_info style-24'>
                                    <div className='sigma_info-title'>
                                        <span className='sigma_info-icon bg-primary-1 text-white'>
                                            <i className='flaticon-call'></i>
                                        </span>
                                    </div>
                                    <div className='sigma_info-description'>
                                        <h5>Số điện thoại của chúng tôi</h5>
                                        <p>Điện thoại: 0559041043</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_info style-24'>
                                    <div className='sigma_info-title'>
                                        <span className='sigma_info-icon bg-primary-1 text-white'>
                                            <i className='flaticon-email'></i>
                                        </span>
                                    </div>
                                    <div className='sigma_info-description'>
                                        <h5>Email của chúng tôi</h5>
                                        <p>Email: meowdelights@website.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className='section pt-0'>
                    <div className='container'>
                        <div className='section-title centered' style={{ width: '100%', marginTop: '5%' }}>
                            <span className='subtitle'>ĐẶT HÀNG THÀNH CÔNG</span>
                            <h3 className='title' style={{ width: '100%' }}>
                                Cảm ơn bạn đã tin tưởng chúng tôi
                                <br />
                                <span style={{ fontSize: '40px' }}>Chúc bạn một ngày vui vui vẻ!</span>
                            </h3>
                        </div>
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default PaymentSuccessPage
