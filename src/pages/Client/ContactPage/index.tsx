import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import '@/styles/Contact.css'
import { useForm } from 'react-hook-form'

const ContactPage = () => {
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
                            <h1>LIÊN HỆ</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Liên hệ
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section section-padding'>
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
                </div>

                <div className='section pt-0'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>HÀNH ĐỘNG</span>
                            <h3 className='title'>Gửi yêu cầu cho chúng tôi</h3>
                        </div>
                        <div className='sigma_form style-2'>
                            <form
                                className='mf_form_validate ajax_submit'
                                action='https://slidesigma.com/themes/html/petpawz/sendmail.php'
                                method='post'
                            >
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <input type='text' name='name' placeholder='Họ và tên' />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <input type='email' name='email' placeholder='Địa chỉ email' />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <input type='number' name='phone' placeholder='Số điện thoại' />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <select
                                                style={{
                                                    paddingLeft: '30px',
                                                    color: 'gray',
                                                    fontSize: '1rem',
                                                    fontFamily: 'Satoshi'
                                                }}
                                            >
                                                <option value='1' selected>
                                                    Chọn chủ đề
                                                </option>
                                                <option value='2'>Option 1</option>
                                                <option value='3'>Option 2</option>
                                                <option value='4'>Option 3</option>
                                                <option value='5'>Option 4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='form-group'>
                                            <textarea
                                                name='message'
                                                rows={10}
                                                placeholder='Enter Message'
                                                style={{ paddingLeft: '20px', paddingTop: '10px' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className='col-12 text-center'>
                                        <button type='submit' className='btn'>
                                            Gửi yêu cầu
                                        </button>
                                        <div className='server_response w-100'></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='sigma_contact-map'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29749.104516155585!2d105.64853079199642!3d21.246196248327458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134fb99ea769fed%3A0x807621a0d3258205!2zxJDhuqFvIMSQ4bupYywgQsOsbmggWHV5w6puLCBWxKluaCBQaMO6YywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1706604818164!5m2!1svi!2s'
                        height='600'
                    ></iframe>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default ContactPage
