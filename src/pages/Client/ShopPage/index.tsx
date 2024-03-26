import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import ListProduct from './listProduct'

const ShopPage = () => {
    return (
        <>
            <div className='btn-style-5    btn-rounded sidebar-style-8'>
                {/* sigma_header-absolute */}
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Tìm kiếm' value='' />
                        <button type='submit' className='search-btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form>
                </div>
                {/* <!--Section End-->
  <!--Section Start--> */}
                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>Trang sản phẩm</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Sản phẩm
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>
                {/* <!--Section End-->
  <!--Section Start--> */}
                <ListProduct />
                {/* <!--Section End-->
  <!--Quick View Start--> */}
                <div className='modal fade sigma_quick-view-modal' id='quickViewModal' role='dialog' aria-hidden='true'>
                    <div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
                        <div className='modal-content'>
                            <div className='modal-body sigma_modal-sec'>
                                <div className='sigma_close' data-dismiss='modal'>
                                    <span></span>
                                    <span></span>
                                </div>

                                <div className='row sigma_product-single'>
                                    <div className='col-md-6'>
                                        <div className='sigma_product-single-thumb'>
                                            <img src='src/assets/img/shop/quick-view.png' alt='product' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='sigma_product-single-content'>
                                            <div className='sigma_product-price'>
                                                <span>352$</span>
                                                <span>245$</span>
                                            </div>
                                            <div className='sigma_rating-wrapper'>
                                                <div className='sigma_rating'>
                                                    <i className='fas fa-star active'></i>
                                                    <i className='fas fa-star active'></i>
                                                    <i className='fas fa-star active'></i>
                                                    <i className='fas fa-star active'></i>
                                                    <i className='fas fa-star'></i>
                                                </div>
                                                <span>255 Đánh giá</span>
                                            </div>

                                            <hr />

                                            <p className='sigma_product-excerpt'>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                                dignissimos repellendus numquam nam fugit nesciunt fuga ex aut quo qui
                                                sit voluptatibus ea ipsum assumenda nemo, saepe animi sint tempore?
                                            </p>

                                            <div className='sigma_product-meta'>
                                                <p>
                                                    <strong>
                                                        Mã sản phẩm: <span>#3382dk</span>
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>
                                                        Trạng thái: <span>Còn hàng</span>
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>Tags: </strong> <a href='#'>Fashion</a>,{' '}
                                                    <a href='#'>ClassNameic</a>{' '}
                                                </p>
                                            </div>

                                            <hr />

                                            <form className='sigma_product-atc-form'>
                                                <div className='sigma_product-buttons d-block'>
                                                    <a href='product-details.html' className='ml-0 btn-block sigma_btn'>
                                                        Mua ngay <i className='far fa-shopping-basket'></i>{' '}
                                                    </a>
                                                    <a
                                                        href='product-details.html'
                                                        className='ml-0 btn-block sigma_btn light'
                                                    >
                                                        Yêu thích <i className='far fa-heart'></i>{' '}
                                                    </a>
                                                    <a
                                                        href='product-details.html'
                                                        className='ml-0 btn-block sigma_btn light'
                                                    >
                                                        So sánh <i className='far fa-compress'></i>{' '}
                                                    </a>
                                                </div>
                                            </form>

                                            <div className='sigma_post-single-meta'>
                                                <div className='sigma_post-single-meta-item sigma_post-share'>
                                                    <h5>Chia sẻ</h5>
                                                    <ul className='sigma_sm'>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-facebook-f'></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-linkedin-in'></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-twitter'></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-youtube'></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* <!-- Post Meta End --> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <FooterTemplate />
            </div>
        </>
    )
}

export default ShopPage
