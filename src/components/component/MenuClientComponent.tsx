import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useCartQuery } from '@/hooks/Cart/useCartQuery'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from '../ui/use-toast'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { useEffect, useState } from 'react'
import { MenuProps } from 'antd'
import '@/styles/MenuClient.css'
import { UnorderedListOutlined } from '@ant-design/icons'
import MenuItem from 'antd/es/menu/MenuItem'
import instance from '@/services/core/api'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}
const items: MenuItem[] = [
    getItem('Navigation Two', 'sub2', <UnorderedListOutlined />, [
        getItem('Trang chủ', '1', <Link to='/'></Link>),
        getItem('Cửa hàng', '2', '', [
            getItem('Phụ kiện mèo', '3', <Link to='/products'></Link>),
            getItem('Đồ ăn mèo', '4', <Link to='/products'></Link>)
        ]),
        getItem('Giới thiệu', '5', <Link to='/introduce'></Link>),
        getItem('Liên hệ', '6', <Link to='/contact'></Link>)
    ])
]
const onClick: MenuProps['onClick'] = (e: any) => {
    console.log('click', e)
}
const MenuClientComponent = () => {
    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    const [dataCarts, setDataCart] = useState<any>()
    useEffect(() => {
        const fetch = async () => {
            if (userID) {
                const response = await instance.get('/cart/user/' + userID)
                setDataCart(response?.data)
            }
        }
        fetch()
    }, [userID])

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
        navigate('/')
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
                <ul className='navbar-nav'></ul>
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
                                                <Link to={'/updateProfile'}>
                                                    <p
                                                        className='sigma_header-control-cart'
                                                        title='Your Cart'
                                                        style={{ borderRadius: '50%', overflow: 'hidden' }}
                                                    >
                                                        <img
                                                            src={data?.datas?.imgUser}
                                                            alt='usser '
                                                            style={{ width: '110px', height: '55px' }}
                                                        />
                                                    </p>
                                                </Link>

                                                <ul
                                                    className='sigma_cart-dropdown'
                                                    style={{ textAlign: 'left', width: '5%', marginRight: '100px' }}
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
                                                            justifyContent: 'space-between',
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
                                                                <button className='btn btn-primary'>Quản lý web</button>
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
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='30'
                                            height='30'
                                            fill='currentColor'
                                            className='bi bi-list'
                                            viewBox='0 0 16 16'
                                        >
                                            <path
                                                fill-rule='evenodd'
                                                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
                                            />
                                        </svg>
                                        <div className='menu'>
                                            <ul className=''>
                                                <Link to={'/'}>Trang chủ</Link>
                                            </ul>

                                            <ul className='submenu'>
                                                Cửa hàng
                                                <div className='dropdown-content'>
                                                    <Link to={'/products'} className='item'>
                                                        Đồ ăn
                                                    </Link>
                                                    <Link to={'/products'} className='item'>
                                                        Phụ kiện
                                                    </Link>
                                                </div>
                                            </ul>
                                            <ul>
                                                <Link to={'/'}>Giới thiệu</Link>
                                            </ul>
                                            <ul>
                                                <Link to={'/contact'}>Liên hệ </Link>
                                            </ul>
                                        </div>

                                        {/* d-block d-sm-none */}
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
