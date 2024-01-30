import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import '@/styles/Cart.css'
import { FaTruckMoving } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const CartPage = () => {
    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-8'>
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
                            <h1>GIỎ HÀNG</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Giỏ hàng
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section section-padding sigma_product-single'>
                    <div className='container'>
                        <table className='sigma_responsive-table'>
                            <thead>
                                <tr>
                                    <th className='remove-item'></th>
                                    <th>Sản phẩm</th>
                                    <th>Phân loại</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng cộng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='remove'>
                                        <button type='button' className='sigma_close remove-from-cart'>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </td>
                                    <td data-title='Product'>
                                        <div className='sigma_cart-product-wrapper'>
                                            <img src='src/assets/img/shop/cart/c-1.png' alt='prod1' />
                                            <div className='sigma_cart-product-body'>
                                                <h6>
                                                    {' '}
                                                    <a href='#'>Rubber Bone</a>{' '}
                                                </h6>
                                                <p>2 Pieces</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title='Classify'>
                                        <div className='sigma_cart-classify-wrapper'>
                                            <div className='sigma_cart-classify-body'>
                                                <h6>
                                                    {' '}
                                                    <a href='#'>Rubber Bone</a>{' '}
                                                </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title='Price'>
                                        {' '}
                                        <strong>12.99$</strong>{' '}
                                    </td>
                                    <td className='quantity' data-title='Quantity'>
                                        <input type='number' className='qty form-control' value='1' />
                                    </td>
                                    <td data-title='Total'>
                                        {' '}
                                        <strong>12.99$</strong>{' '}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='remove'>
                                        <button type='button' className='sigma_close remove-from-cart'>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </td>
                                    <td data-title='Product'>
                                        <div className='sigma_cart-product-wrapper'>
                                            <img src='src/assets/img/shop/cart/c-2.png' alt='prod1' />
                                            <div className='sigma_cart-product-body'>
                                                <h6>
                                                    {' '}
                                                    <a href='#'>Organic Food</a>{' '}
                                                </h6>
                                                <p>1 Piece</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td data-title='Classify'>
                                        <div className='sigma_cart-classify-wrapper'>
                                            <div className='sigma_cart-classify-body'>
                                                <h6>
                                                    {' '}
                                                    <a href='#'>Rubber Bone</a>{' '}
                                                </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title='Price'>
                                        {' '}
                                        <strong>9.99$</strong>{' '}
                                    </td>
                                    <td className='quantity' data-title='Quantity'>
                                        <input type='number' className='qty form-control' value='1' />
                                    </td>
                                    <td data-title='Total'>
                                        {' '}
                                        <strong>9.99$</strong>{' '}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='remove'>
                                        <button type='button' className='sigma_close remove-from-cart'>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </td>
                                    <td data-title='Product'>
                                        <div className='sigma_cart-product-wrapper'>
                                            <img src='src/assets/img/shop/cart/c-3.png' alt='prod1' />
                                            <div className='sigma_cart-product-body'>
                                                <h6>
                                                    {' '}
                                                    <a href='#'>Mouse bell</a>{' '}
                                                </h6>
                                                <p>3 Pieces</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title='Classify'>
                                        <div className='sigma_cart-classify-wrapper'>
                                            <div className='sigma_cart-classify-body'>
                                                <h6>
                                                    {' '}
                                                    <a href='#'>Rubber Bone</a>{' '}
                                                </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title='Price'>
                                        {' '}
                                        <strong>13.99$</strong>{' '}
                                    </td>
                                    <td className='quantity' data-title='Quantity'>
                                        <input type='number' className='qty form-control' value='1' />
                                    </td>
                                    <td data-title='Total'>
                                        {' '}
                                        <strong>13.99$</strong>{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='row'>
                            <div className='col-lg-5'>
                                <div className='form-group mb-0'>
                                    <div className='input-group mb-0'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Nhập mã giảm giá'
                                            aria-label='Coupon Code'
                                        />
                                        <div className='input-group-append'>
                                            <button className='sigma_btn-custom shadow-none  btn' type='button'>
                                                Áp dụng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterTemplate />
            </div>
        </>
    )
}

export default CartPage
