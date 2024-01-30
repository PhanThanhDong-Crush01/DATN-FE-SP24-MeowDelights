import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'

const IntroducePage = () => {
    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-3'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Search...' value='' />
                        <button type='submit' className='search-btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form>
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>VỀ CHÚNG TÔI</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Về chúng tôi
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>
                <div className='section section-padding'>
                    <div className='container'>
                        <div className='row align-items-center mb-5'>
                            <div className='col-lg-5'>
                                <div className='section-title'>
                                    <span className='subtitle'>Quy trình làm việc</span>
                                    <h3 className='title mb-0'>Làm thế nào nó hoạt động?</h3>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <p className='mb-0'>
                                    Chúng tôi đã chải chuốt nhiều năm nay và chúng tôi yêu thích mọi phần công việc của
                                    mình! Chúng tôi cung cấp một môi trường rất ấm áp và thân thiện cho vật nuôi của
                                    bạn. Đội ngũ chuyên nghiệp của chúng tôi đảm bảo chất lượng về thức ăn và phụ kiện
                                    cho mèo của bạn ở mức cao nhất vì chúng tôi đối xử với tất cả thú cưng như thể chúng
                                    là của mình!!
                                </p>
                            </div>
                            <div className='col-lg-3 text-lg-right'>
                                <a href='contact-us.html' className='sigma_btn mt-4 mt-lg-0'>
                                    Đặt lịch hẹn
                                </a>
                            </div>
                        </div>
                        <div className='row sigma_info-wrapper style-25'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_info style-25 d-block d-xl-flex'>
                                    <div className='sigma_info-title'>
                                        <span className='sigma_info-icon'>
                                            <i className='flaticon-vet'></i>
                                        </span>
                                    </div>
                                    <div className='sigma_info-description mt-4 mt-xl-0'>
                                        <h5>
                                            Tìm kiếm chuyên gia trực tuyến tốt nhất <br />
                                        </h5>
                                        <p>
                                            Đội ngũ chuyên nghiệp của chúng tôi cung cấp thức ăn và phụ kiện đặc biệt.
                                        </p>
                                        <span className='steps'>Step 1</span>
                                        <span className='pulsive-dot'></span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_info style-25 d-block d-xl-flex'>
                                    <div className='sigma_info-title'>
                                        <span className='sigma_info-icon'>
                                            <i className='flaticon-beauty-saloon'></i>
                                        </span>
                                    </div>
                                    <div className='sigma_info-description mt-4 mt-xl-0'>
                                        <h5>
                                            Nhận cuộc hẹn ngay lập tức <br />
                                        </h5>
                                        <p>
                                            Đội ngũ chuyên nghiệp của chúng tôi cung cấp thức ăn và phụ kiện đặc biệt.
                                        </p>
                                        <span className='steps'>Step 2</span>
                                        <span className='pulsive-dot'></span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_info style-25 d-block d-xl-flex'>
                                    <div className='sigma_info-title'>
                                        <span className='sigma_info-icon'>
                                            <i className='flaticon-collar'></i>
                                        </span>
                                    </div>
                                    <div className='sigma_info-description mt-4 mt-xl-0'>
                                        <h5>
                                            Để lại phản hồi của bạn <br />
                                        </h5>
                                        <p>
                                            Đội ngũ chuyên nghiệp của chúng tôi cung cấp thức ăn và phụ kiện đặc biệt.
                                        </p>
                                        <span className='steps'>Step 3</span>
                                        <span className='pulsive-dot'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section bg-secondary-1' style={{ backgroundImage: 'url(assets/img/pattern.png)' }}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-5 order-2 order-lg-1'>
                                <div className='sigma_about style-21'>
                                    <div className='section-title'>
                                        <h3 className='title text-white'>
                                            Tại sao phải chọn phụ kiện và thức ăn tốt cho thú cưng của bạn?
                                        </h3>
                                    </div>
                                    <div className='sigma_about-content'>
                                        <br />
                                        <p>
                                            Vì sức khỏe và hạnh phúc của thú cưng phụ thuộc lớn vào chế độ dinh dưỡng và
                                            môi trường sống của chúng.
                                            <br /> Phụ kiện và thức ăn chất lượng không chỉ giữ cho thú cưng khỏe mạnh
                                            mà còn giúp chúng phát triển đúng cách. <br />
                                            Chăm sóc cẩn thận cho thú cưng không chỉ là trách nhiệm của chúng ta, mà còn
                                            là biểu hiện của tình yêu và sự quan tâm đến thành viên của gia đình nhỏ của
                                            chúng ta.
                                        </p>
                                        <div className='sigma_info style-15'>
                                            <div className='sigma_info-title'>
                                                <i className='flaticon-stethoscope sigma_info-icon'></i>
                                            </div>
                                            <div className='sigma_info-description'></div>
                                        </div>
                                        <div className='sigma_info style-15 mb-0'>
                                            <div className='sigma_info-title'>
                                                <i className='flaticon-group sigma_info-icon'></i>
                                            </div>
                                            <div className='sigma_info-description'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 offset-lg-1 order-1 order-lg-2'>
                                <div className='sigma_about style-21 mt-0 w-100 h-100'>
                                    <div className='sigma_about-image-1'>
                                        <img src='src/assets/img/home-1/400x280.jpg' alt='img' />
                                    </div>
                                    <div className='sigma_about-image-2 d-none d-sm-block'>
                                        <img src='src/assets/img/home-1/370x250.jpg' alt='img' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className='sigma_counter-wrapper margin-negative bg-primary-1 style-5'
                            style={{ backgroundImage: 'url(assets/img/pattern-2.png)' }}
                        >
                            <div className='row'>
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                    <div className='sigma_counter style-5'>
                                        <span>
                                            <b className='counter' data-from='0' data-to='340'>
                                                340
                                            </b>

                                            <span className='plus'>+</span>
                                        </span>
                                        <p className='text-white'>Customers</p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                    <div className='sigma_counter style-5'>
                                        <span>
                                            <b className='counter' data-from='0' data-to='120'>
                                                120
                                            </b>

                                            <span className='plus'>+</span>
                                        </span>
                                        <p className='text-white'>Years Practical Experience</p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                    <div className='sigma_counter style-5'>
                                        <span>
                                            <b className='counter' data-from='0' data-to='120'>
                                                120
                                            </b>

                                            <span className='plus'>+</span>
                                        </span>
                                        <p className='text-white'>Awesome Team Members</p>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                    <div className='sigma_counter style-5'>
                                        <span>
                                            <b className='counter' data-from='0' data-to='80'>
                                                80
                                            </b>

                                            <span className='plus'>+</span>
                                        </span>
                                        <p className='text-white'>Customers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section pb-0 bg-gray'></div>

                <div className='section section-padding bg-gray'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>CHUYÊN GIA TƯ VẤN</span>
                            <h3 className='title mb-0'>
                                Gặp gỡ đội ngũ chuyên gia tư vấn về phụ kiện và thức ăn cho mèo của chúng tôi
                            </h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/about-us/255x255.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Peter Ronson</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Founder
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-facebook-f'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-instagram'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/about-us/255x255-0.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Emilia Johnson</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Pet instructor
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-facebook-f'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-instagram'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/about-us/255x255-1.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Barbra Stevens</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Assistent
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-facebook-f'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-instagram'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/about-us/255x255-2.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Lina Smith</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Pet Doctor
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-facebook-f'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <i className='fab fa-instagram'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section section-padding p-0'>
                    <div className='container-fluid p-0'>
                        <div className='sigma_instagram style-1 insta-images'>
                            <div className='' style={{ display: 'flex' }}>
                                <a href='#'>
                                    <img
                                        src='src/assets/img/about-us/376x430.jpg'
                                        alt='img'
                                        style={{ width: '100%' }}
                                    />
                                </a>
                                <a href='#'>
                                    <img
                                        src='src/assets/img/about-us/376x430-0.jpg'
                                        alt='img'
                                        style={{ width: '100%' }}
                                    />
                                </a>
                                <a href='#'>
                                    <img
                                        src='src/assets/img/about-us/376x430-1.jpg'
                                        alt='img'
                                        style={{ width: '100%' }}
                                    />
                                </a>
                                <a href='#'>
                                    <img
                                        src='src/assets/img/about-us/376x430-2.jpg'
                                        alt='img'
                                        style={{ width: '100%' }}
                                    />
                                </a>
                                <a href='#'>
                                    <img
                                        src='src/assets/img/about-us/376x430-3.jpg'
                                        alt='img'
                                        style={{ width: '100%' }}
                                    />
                                </a>
                                <a href='#'>
                                    <img
                                        src='src/assets/img/about-us/376x430-4.jpg'
                                        alt='img'
                                        style={{ width: '100%' }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default IntroducePage
