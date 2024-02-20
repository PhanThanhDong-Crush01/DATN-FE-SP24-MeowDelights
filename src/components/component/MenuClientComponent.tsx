import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useCartQuery } from '@/hooks/Cart/useCartQuery'
import { Link, useParams } from 'react-router-dom'
import { toast } from '../ui/use-toast'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { useState } from 'react'
const MenuClientComponent = () => {
    const { dataCart } = useCartQuery()
    const { onRemove } = useCartMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá sản phẩm thành công!!',
                description: 'Sản phẩm bạn không thích trong giỏ hàng đã bị xóa'
            })
        }
    })
    return (
        <>
            <div className='sigma_aside-overlay aside-trigger-right'></div>
            <aside className='sigma_aside'>
                <div className='sigma_close aside-trigger'>
                    <span></span>
                    <span></span>
                </div>
                <div className='sigma_logo-wrapper'>
                    <a className='sigma_logo' href='index.html'>
                        <img src='/src/assets/img/logo.png' alt='logo' />
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
                                    <img src='/src/assets/img/logo.png' alt='logo' />
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
                                        {/* <span>{data?.datas?.name}</span> */}
                                        <ul className='sigma_cart-dropdown'>
                                            <li>
                                                <div
                                                    className='sigma_cart-product-body'
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    <h6>
                                                        <Link to={'/signin'}>Tài khoản của tôi</Link>
                                                    </h6>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className='sigma_cart-product-body'
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    <h6>
                                                        <Link to={'/signin'}>Đơn mua</Link>
                                                    </h6>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className='sigma_cart-product-body'
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    <h6>
                                                        <Link to={'/signup'}>Đăng xuất</Link>
                                                    </h6>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='cart-trigger header-controls-item d-none d-sm-block'>
                                        <Link to={'/cart'} className='sigma_header-control-cart'>
                                            <i className='far fa-shopping-basket' />
                                        </Link>
                                        <ul className='sigma_cart-dropdown'>
                                            {dataCart?.data.map((cart: any) => (
                                                <li key={cart?.product?.name + cart?._id}>
                                                    <div className='sigma_cart-product-wrapper'>
                                                        <div className='d-flex'>
                                                            <img src={cart?.typeProduct?.image} alt='cart' />
                                                            <div className='sigma_cart-product-div'>
                                                                <h6>
                                                                    <a href={`/products/${cart?.product?._id}`}>
                                                                        {cart?.product?.name.length > 30
                                                                            ? `${cart?.product?.name.substring(
                                                                                  0,
                                                                                  30
                                                                              )}...`
                                                                            : cart?.product?.name}
                                                                    </a>
                                                                </h6>
                                                                <p>
                                                                    {cart?.quantity} x {cart?.typeProduct?.color} -{' '}
                                                                    {cart?.typeProduct?.size}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type='button'
                                                            className='sigma_close remove-from-cart'
                                                            onClick={() => onRemove(cart)}
                                                        >
                                                            <span></span>
                                                            <span></span>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
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
