import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { toast } from '@/components/ui/use-toast'
import { formatPriceBootstrap } from '@/lib/utils'
import instance from '@/services/core/api'
import '@/styles/Cart.css'
import { Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Cart_virtual_users = () => {
    const [dataCart, setDataCart] = useState<any>()
    useEffect(() => {
        const fetchData = async () => {
            const localStorageDataCart = JSON.parse(localStorage.getItem('Cart_virtual_users') || '[]')
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
        fetchData()
    }, [dataCart])

    // Hàm cập nhật giỏ hàng và lưu vào localStorage
    const updateCartAndLocalStorage = (updatedCart: any) => {
        setDataCart(updatedCart)
        localStorage.setItem('Cart_virtual_users', JSON.stringify(updatedCart.data))
    }

    // Hàm xử lý khi thay đổi số lượng sản phẩm trong giỏ hàng
    const onChangeQuantity_Cart = (cartItem: any, value: any) => {
        const newQuantity = Number(value.target.value)
        if (newQuantity > 0) {
            if (newQuantity > cartItem.typeProduct.quantity) {
                const updatedCart = {
                    ...dataCart,
                    data: dataCart.data.map((item: any) => (item.idpro === cartItem.idpro ? cartItem : item))
                }
                toast({
                    variant: 'destructive',
                    title: 'Đã đạt giới hạn số lượng sản phẩm có trong kho!'
                })

                updateCartAndLocalStorage(updatedCart)
            } else {
                cartItem.quantity = newQuantity
                const updatedCart = {
                    ...dataCart,
                    data: dataCart.data.map((item: any) => (item.idpro === cartItem.idpro ? cartItem : item))
                }

                updateCartAndLocalStorage(updatedCart)
                toast({
                    variant: 'success',
                    title: 'Sẽ mất một chút thời gian để cập nhật số lượng thành công!!'
                })
            }
        } else {
            // Xoá sản phẩm khỏi giỏ hàng
            const confirm = window.confirm('Bạn có chắc muốn xoá sản phẩm này không')
            if (confirm) {
                //onRemove(cartItem) // Gửi yêu cầu xoá lên API (nếu cần)
                // Cập nhật giỏ hàng và localStorage
                const updatedCart = {
                    ...dataCart,
                    data: dataCart.data.filter((item: any) => item.idpro !== cartItem.idpro)
                }
                updateCartAndLocalStorage(updatedCart)
            } else {
                // Nếu không xoá, cập nhật lại số lượng sản phẩm
                cartItem.quantity = 1
                //onSubmit(cartItem) // Gửi yêu cầu cập nhật lên API (nếu cần)
                // Cập nhật giỏ hàng và localStorage
                const updatedCart = {
                    ...dataCart,
                    data: dataCart.data.map((item: any) => (item.idpro === cartItem.idpro ? cartItem : item))
                }
                updateCartAndLocalStorage(updatedCart)
            }
        }
    }

    // Xóa một sản phẩm cụ thể khỏi giỏ hàng và localStorage
    const removeItemFromCart = (cartItem: any) => {
        // Xoá sản phẩm từ giỏ hàng
        const updatedCart = {
            ...dataCart,
            data: dataCart.data.filter((item: any) => {
                return item.idpro !== cartItem.idpro || item.idprotype !== cartItem.idprotype
            })
        }
        updateCartAndLocalStorage(updatedCart)
        toast({
            variant: 'success',
            title: 'Xoá sản phẩm thành công!!',
            description: 'Sản phẩm bạn không thích trong giỏ hàng đã bị xóa'
        })
    }

    let phiVanChuyen = 25000
    const [tongTienCanThanhToan, setTongTienCanThanhToan] = useState<number>(dataCart?.totalAmount + phiVanChuyen)

    useEffect(() => {
        const upTongTienCanThanhToan = dataCart?.totalAmount + phiVanChuyen
        setTongTienCanThanhToan(upTongTienCanThanhToan)
    }, [dataCart])

    const navigate = useNavigate()
    const handleCheckout = () => {
        const thongtindonhang: any = {
            order: dataCart?.data,
            phiVanChuyen: phiVanChuyen,
            voucher: {
                idVc: '',
                soTienGiam: 0
            },
            tongTien: tongTienCanThanhToan
        }
        localStorage.setItem('thongtindonhang', JSON.stringify(thongtindonhang))
        navigate('/payment_information')
    }

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

                {!dataCart ? (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '30px', margin: '50px auto' }}>
                            Giỏ hàng không có gì cả, về trang{' '}
                            <Link to={'/products'}>
                                <u>Cửa hàng</u>
                            </Link>{' '}
                            để chọn sản phẩm nhé!
                        </h1>
                    </div>
                ) : (
                    <>
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
                                        {dataCart?.data.map((cartItem: any) => (
                                            <tr key={cartItem._id}>
                                                <td className='remove'>
                                                    <Popconfirm
                                                        placement='topRight'
                                                        title='Xóa sản phẩm này?'
                                                        description='Bạn có chắc chắn xóa sản phẩm này khỏi giỏ hàng không?'
                                                        onConfirm={() => removeItemFromCart(cartItem)}
                                                        okText='Đồng ý'
                                                        cancelText='Không'
                                                    >
                                                        <button type='button' className='sigma_close remove-from-cart'>
                                                            <span></span>
                                                            <span></span>
                                                        </button>
                                                    </Popconfirm>
                                                </td>
                                                <td data-title='Product' style={{ width: '40%' }}>
                                                    <div className='sigma_cart-product-wrapper'>
                                                        <img src={cartItem?.typeProduct?.image} alt='prod1' />
                                                        <div className='sigma_cart-product-body'>
                                                            <h6 style={{ width: '100%' }}>
                                                                <Link to={'/products/' + cartItem?.product?._id}>
                                                                    {cartItem?.product?.name}
                                                                </Link>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title='Classify'>
                                                    <div className='sigma_cart-classify-wrapper'>
                                                        <div className='sigma_cart-classify-body'>
                                                            <h6 style={{ color: '#FFCC01', fontWeight: 800 }}>
                                                                {cartItem?.typeProduct?.color} -{' '}
                                                                {cartItem?.typeProduct?.size}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title='Price'>
                                                    <strong
                                                        dangerouslySetInnerHTML={{
                                                            __html: formatPriceBootstrap(cartItem?.typeProduct?.price)
                                                        }}
                                                    ></strong>
                                                </td>
                                                <td className='quantity' data-title='Quantity' style={{ width: '10%' }}>
                                                    <input
                                                        type='number'
                                                        className='qty form-control'
                                                        defaultValue={cartItem?.quantity}
                                                        onChange={(event) => onChangeQuantity_Cart(cartItem, event)}
                                                        max={cartItem?.typeProduct?.quantity}
                                                    />
                                                </td>
                                                <td data-title='Total' style={{ color: 'red' }}>
                                                    <strong
                                                        dangerouslySetInnerHTML={{
                                                            __html: formatPriceBootstrap(cartItem?.money)
                                                        }}
                                                    ></strong>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div
                            className='chiu'
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'end',
                                padding: '0 6%',
                                paddingLeft: '7%'
                            }}
                        >
                            <table className='sigma_responsive-table' style={{ width: '35%' }}>
                                <thead>
                                    <tr>
                                        <th className='remove-item'></th>
                                        <th></th>
                                        <th>Tiền </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='remove'></td>
                                        <td data-title='Product'>
                                            <div className='sigma_cart-product-wrapper'>
                                                <div className='sigma_cart-product-body'>
                                                    <h6>Tổng tiền giỏ hàng</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title='Classify'>
                                            <div className='sigma_cart-classify-wrapper'>
                                                <div className='sigma_cart-classify-body'>
                                                    <h6>
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(dataCart?.totalAmount)
                                                            }}
                                                        ></p>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='remove'></td>
                                        <td data-title='Product'>
                                            <div className='sigma_cart-product-wrapper'>
                                                <div className='sigma_cart-product-body'>
                                                    <h6>Phí vận chuyển</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title='Classify'>
                                            <div className='sigma_cart-classify-wrapper'>
                                                <div className='sigma_cart-classify-body'>
                                                    <h6>
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(phiVanChuyen)
                                                            }}
                                                        ></p>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='remove'></td>
                                        <td data-title='Product'>
                                            <div className='sigma_cart-product-wrapper'>
                                                <div className='sigma_cart-product-body'>
                                                    <h6>Voucher giảm giá</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title='Classify'>
                                            <div className='sigma_cart-classify-wrapper'>
                                                <div className='sigma_cart-classify-body'>
                                                    <h6>
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(0)
                                                            }}
                                                        ></p>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='remove'></td>
                                        <td data-title='Product'>
                                            <div className='sigma_cart-product-wrapper'>
                                                <div className='sigma_cart-product-body'>
                                                    <h6>TỔNG TIỀN ĐƠN HÀNG</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title='Classify'>
                                            <div className='sigma_cart-classify-wrapper'>
                                                <div className='sigma_cart-classify-body'>
                                                    <h6>
                                                        <p
                                                            style={{ fontWeight: 900, fontSize: '30px', color: 'red' }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(
                                                                    Number(tongTienCanThanhToan)
                                                                )
                                                            }}
                                                        ></p>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ width: '100%' }}>
                                            <button
                                                onClick={handleCheckout}
                                                type='button'
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    backgroundColor: '#00D8E8'
                                                }}
                                            >
                                                Thanh toán
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                <FooterTemplate />
            </div>
        </>
    )
}

export default Cart_virtual_users
