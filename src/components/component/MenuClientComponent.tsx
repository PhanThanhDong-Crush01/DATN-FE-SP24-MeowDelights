import { Link } from 'react-router-dom'

const MenuClientComponent = () => {
    return (
        <>
            <aside className='sigma_aside sigma_aside-desktop'>
                <div className='sidebar'>
                    <div className='widget widget-sigma-recent-posts style-3'>
                        <h5 className='widget-title'>Recent Post</h5>
                        <div className='sigma_recent-post'>
                            <div className='sigma_post-categories'>
                                <a href='#'>Category</a>
                            </div>
                            <div className='recent-post-descr'>
                                <h6>
                                    <a href='blog-details.html'>Every Next Level Of Your Life Will Demand Something</a>
                                </h6>
                                <div className='author-info d-flex align-items-center'>
                                    <span>TA</span>
                                    <div>
                                        <a href='#' className='author-name'>
                                            Tim Abell
                                        </a>
                                        <a href='blog-details.html' className='date'>
                                            June 4, 2024
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sigma_recent-post'>
                            <div className='sigma_post-categories'>
                                <a href='#'>Category</a>
                            </div>
                            <div className='recent-post-descr'>
                                <h6>
                                    <a href='blog-details.html'>We are the champions, we do not give up, we try</a>
                                </h6>
                                <div className='author-info d-flex align-items-center'>
                                    <span>TA</span>
                                    <div>
                                        <a href='#' className='author-name'>
                                            Tim Abell
                                        </a>
                                        <a href='blog-details.html' className='date'>
                                            June 4, 2024
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='widget widget-follow'>
                        <h5 className='widget-title'>Follow Us</h5>
                        <div className='social-buttons'>
                            <a href='#' className='btn-block sigma_btn'>
                                <div className='follow-icon d-flex align-items-center'>
                                    <i className='fab fa-instagram' />
                                    <p className='mb-0'>
                                        Instagram
                                        <span>225.5k Followers</span>
                                    </p>
                                </div>
                                <i className='fal fa-chevron-right' />
                            </a>
                            <a href='#' className='btn-block sigma_btn'>
                                <div className='follow-icon d-flex align-items-center'>
                                    <i className='fab fa-twitter' />
                                    <p className='mb-0'>
                                        Twitter
                                        <span>225.5k Followers</span>
                                    </p>
                                </div>
                                <i className='fal fa-chevron-right' />
                            </a>
                            <a href='#' className='btn-block sigma_btn'>
                                <div className='follow-icon d-flex align-items-center'>
                                    <i className='fab fa-facebook-f' />
                                    <p className='mb-0'>
                                        Facebook
                                        <span>225.5k Followers</span>
                                    </p>
                                </div>
                                <i className='fal fa-chevron-right' />
                            </a>
                            <a href='#' className='btn-block sigma_btn'>
                                <div className='follow-icon d-flex align-items-center'>
                                    <i className='fab fa-youtube' />
                                    <p className='mb-0'>
                                        Youtube
                                        <span>225.5k Followers</span>
                                    </p>
                                </div>
                                <i className='fal fa-chevron-right' />
                            </a>
                        </div>
                    </div>
                    <div className='widget widget-newsletter'>
                        <h5 className='widget-title'>Join Petletter</h5>
                        <form method='post'>
                            <input type='email' name='email' placeholder='Enter your email' />
                            <button type='button' className='btn-block mt-4'>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
            <div className='sigma_aside-overlay aside-trigger-right'></div>
            <aside className='sigma_aside'>
                <div className='sigma_close aside-trigger'>
                    <span></span>
                    <span></span>
                </div>
                <div className='sigma_logo-wrapper'>
                    <a className='sigma_logo' href='index.html'>
                        <img src='src/assets/img/logo.png' alt='logo' />
                    </a>
                </div>
                <ul className='navbar-nav'>
                    <li className='menu-item menu-item-has-children'>
                        <Link to={'/'}>Trang chủ</Link>
                    </li>
                </ul>
            </aside>
            <div className='sigma_aside-overlay aside-trigger'></div>
            <header className='sigma_header style-5 bg-transparent shadow-none can-sticky'>
                <div className='container'>
                    <div className='sigma_header-top d-none d-md-block'>
                        <div className='sigma_header-top-inner'>
                            <div className='sigma_header-top-links'>
                                <ul className='sigma_header-top-nav'>
                                    <li>
                                        <a href='#'>
                                            <i className='fal fa-envelope' />
                                            meowdelights@website.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i className='fal fa-map-marker-alt' />
                                            TT.Đạo Đức - Bình Xuyên - Vĩnh Phúc
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='sigma_header-top-contacts'>
                                <ul className='sigma_header-top-nav'>
                                    <li>
                                        <a href='#'>
                                            <i className='fab fa-facebook-f' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i className='fab fa-twitter' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i className='fab fa-linkedin-in' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            <i className='fab fa-google' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='sigma_header-middle pl-4 pr-4'>
                        <div className='navbar'>
                            <div className='sigma_logo-wrapper'>
                                <a className='sigma_logo' href='index.html'>
                                    <img src='src/assets/img/logo.png' alt='logo' />
                                </a>
                            </div>
                            <ul className='navbar-nav' style={{ textAlign: 'left' }}>
                                <ul className='navbar-nav'>
                                    <li className='menu-item menu-item-has-children'>
                                        <Link to={'/'}>Trang chủ</Link>
                                    </li>
                                    <li className='menu-item menu-item-has-children'>
                                        <Link to={'/products'}>Cửa hàng</Link>
                                        <ul className='sub-menu'>
                                            <li className='menu-item'>
                                                <Link to={'/products'}>Phụ kiện mèo</Link>
                                            </li>
                                            <li className='menu-item'>
                                                <Link to={'/products'}>Đồ ăn mèo</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='menu-item menu-item-has-children'>
                                        <Link to={'/introduce'}>Giới thiệu</Link>
                                    </li>
                                    <li className='menu-item menu-item-has-children'>
                                        <Link to={'/contact'}>Liên hệ</Link>
                                    </li>
                                </ul>
                            </ul>
                            <div className='sigma_header-controls style-2'>
                                <ul className='sigma_header-controls-inner'>
                                    <li className='cart-trigger header-controls-item d-none d-sm-block'>
                                        <a className='sigma_header-control-cart' title='Your Cart' href='cart.html'>
                                            <i className='fal fa-solid fa-user' />
                                        </a>
                                        <ul className='sigma_cart-dropdown'>
                                            <li>
                                                <div
                                                    className='sigma_cart-product-body'
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    <h6>
                                                        <Link to={'/signin'}>Đăng nhập</Link>
                                                    </h6>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className='sigma_cart-product-body'
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    <h6>
                                                        <Link to={'/signup'}>Đăng ký</Link>
                                                    </h6>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='cart-trigger header-controls-item d-none d-sm-block'>
                                        <a className='sigma_header-control-cart' title='Your Cart' href='cart.html'>
                                            <i className='far fa-shopping-basket' />
                                        </a>
                                        <ul className='sigma_cart-dropdown'>
                                            <li>
                                                <div className='sigma_cart-product-wrapper'>
                                                    <div className='d-flex'>
                                                        <img src='src/assets/img/shop/cart/c-1.png' alt='prod1' />
                                                        <div className='sigma_cart-product-div'>
                                                            <h6>
                                                                {' '}
                                                                <a href='#'>Rubber Bone</a>{' '}
                                                            </h6>
                                                            <p>2 Pieces</p>
                                                        </div>
                                                    </div>
                                                    <button type='button' className='sigma_close remove-from-cart'>
                                                        <span></span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sigma_cart-product-wrapper'>
                                                    <div className='d-flex'>
                                                        <img src='src/assets/img/shop/cart/c-2.png' alt='prod1' />
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                {' '}
                                                                <a href='#'>Organic Food</a>{' '}
                                                            </h6>
                                                            <p>2 Pieces</p>
                                                        </div>
                                                    </div>
                                                    <button type='button' className='sigma_close remove-from-cart'>
                                                        <span></span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='sigma_cart-product-wrapper'>
                                                    <div className='d-flex'>
                                                        <img src='src/assets/img/shop/cart/c-3.png' alt='prod1' />
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                {' '}
                                                                <a href='#'>Mouse bell</a>{' '}
                                                            </h6>
                                                            <p>2 Pieces</p>
                                                        </div>
                                                    </div>
                                                    <button type='button' className='sigma_close remove-from-cart'>
                                                        <span></span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='d-none d-sm-block'>
                                        <a href='shop-grid.html' className='sigma_btn btn-sm'>
                                            Order Here
                                            <i className='fal fa-plus ml-3' />
                                        </a>
                                    </li>
                                    <li className='aside-toggle aside-trigger'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default MenuClientComponent
