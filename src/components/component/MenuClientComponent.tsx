import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useCartQuery } from '@/hooks/Cart/useCartQuery'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from '../ui/use-toast'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { useEffect, useState } from 'react'
import instance from '@/services/core/api'
const MenuClientComponent = () => {
    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    const { dataCart } = useCartQuery()

    const [dataCarts, setDataCart] = useState<any>()
    const localStorageDataCart = JSON.parse(localStorage.getItem('Cart_virtual_users') || '[]')
    useEffect(() => {
        const fetchData = async () => {
            if (localStorageDataCart.length > 0) {
                let totalAmount = 0
                const datanew = await Promise.all(
                    localStorageDataCart.map(async (item: any) => {
                        const idpro = item.idpro
                        const idprotype = item.idprotype
                        const product = await instance.get('/products/' + idpro)
                        const type_product = await instance.get('/type_product/' + idprotype)
                        const money = item.quantity * type_product?.data?.data?.price
                        totalAmount += money
                        return {
                            ...item,
                            product: product?.data?.data,
                            typeProduct: type_product?.data?.data,
                            money: money
                        }
                    })
                )
                setDataCart({ data: datanew, totalAmount })
            }
        }
        if (userID) {
            setDataCart(dataCart)
        } else {
            fetchData()
        }
    }, [localStorageDataCart])

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

    const { data }: any = useAuthQuery(userID)

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('userID')
        localStorage.removeItem('user')
        navigate('/signin')
    }

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
                        <img
                            src='https://res.cloudinary.com/drwpkuqxv/image/upload/v1709051842/logo_meowdelights.jpg'
                            alt=''
                        />
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
                                        {!data?.datas ? (
                                            <>
                                                <Link to={'/signin'}>
                                                    <p
                                                        className='sigma_header-control-cart'
                                                        title='Your Cart'
                                                        style={{ borderRadius: '50%', overflow: 'hidden' }}
                                                    >
                                                        <i className='fal fa-solid fa-user' />
                                                    </p>
                                                </Link>

                                                <ul
                                                    className='sigma_cart-dropdown'
                                                    style={{ textAlign: 'left', width: '3%', marginRight: '100px' }}
                                                >
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
                                            </>
                                        ) : (
                                            <>
                                                <Link to={'/signin'}>
                                                    <p
                                                        className='sigma_header-control-cart'
                                                        title='Your Cart'
                                                        style={{ borderRadius: '50%', overflow: 'hidden' }}
                                                    >
                                                        <img
                                                            src={data?.datas?.imgUser}
                                                            alt='usser '
                                                            style={{ width: '100%', height: 'auto' }}
                                                        />
                                                    </p>
                                                </Link>

                                                <ul
                                                    className='sigma_cart-dropdown pl-10'
                                                    style={{ textAlign: 'left', width: '3%', marginRight: '100px' }}
                                                >
                                                    <li>
                                                        <h1
                                                            style={{
                                                                fontSize: '20px',
                                                                color: 'black',
                                                                fontWeight: 700
                                                            }}
                                                        >
                                                            Xin chào {data?.datas?.name}
                                                        </h1>
                                                    </li>
                                                    <li>
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                <Link to={'/updateProfile'}>Tài khoản của tôi</Link>
                                                            </h6>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                <Link to={'/order'}>Đơn mua</Link>
                                                            </h6>
                                                        </div>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-around',
                                                            width: '80%'
                                                        }}
                                                    >
                                                        <div className='sigma_cart-product-body'>
                                                            <button className='btn btn-danger' onClick={handleLogout}>
                                                                Đăng xuất
                                                            </button>
                                                        </div>
                                                        &nbsp;
                                                        <div className='sigma_cart-product-body'>
                                                            <Link to={'/admin'}>
                                                                <button
                                                                    className='btn btn-primary'
                                                                    onClick={handleLogout}
                                                                >
                                                                    Quản lý web
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </>
                                        )}
                                    </li>

                                    <li className='cart-trigger header-controls-item d-none d-sm-block'>
                                        <Link to={'/cart'} className='sigma_header-control-cart'>
                                            <i className='far fa-shopping-basket' />
                                        </Link>
                                        <ul className='sigma_cart-dropdown'>
                                            {dataCarts?.data.map((cart: any) => (
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
                                                        {userID && (
                                                            <button
                                                                type='button'
                                                                className='sigma_close remove-from-cart'
                                                                onClick={() => onRemove(cart)}
                                                            >
                                                                <span></span>
                                                                <span></span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className='d-none d-sm-block'>
                                        <a href='shop-grid.html' className='sigma_btn btn-sm'>
                                            <Link to={'/order'}>
                                                Đơn mua
                                                <i className='fal fa-plus ml-3' />
                                            </Link>
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
