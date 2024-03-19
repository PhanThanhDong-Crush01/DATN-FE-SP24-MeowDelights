import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { toast } from '@/components/ui/use-toast'
import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useCartQuery } from '@/hooks/Cart/useCartQuery'
import { formatPriceBootstrap } from '@/lib/utils'
import '@/styles/Cart.css'
import { Card, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Select } from 'antd'
import instance from '@/services/core/api'

const CartPage = () => {
    const { dataCart } = useCartQuery()

    const { onRemove } = useCartMutation({
        action: 'DELETE'
    })
    const { onSubmit } = useCartMutation({
        action: 'UPDATE'
    })

    const onChangeQuantity_Cart = (cartItem: any, value: any) => {
        const newQuantity = Number(value.target.value)
        const stockQuantity = cartItem.typeProduct.stockQuantity
        if (newQuantity > 0) {
            // Update quantity
            cartItem.quantity = newQuantity
            onSubmit(cartItem)
        } else if (newQuantity <= 0) {
            const confirm = window.confirm('Bạn có chắc muốn xoá sản phẩm này không')
            if (confirm === true) {
                // Remove product
                onRemove(cartItem)
            } else {
                cartItem.quantity = +1
                onSubmit(cartItem)
            }
        } else if (newQuantity <= stockQuantity) {
        }
    }

    const [idVoucher, setIdVoucher] = useState('')

    const handleChange = async (value: any) => {
        const idVC = value
        const response = await instance.get('/voucher/' + idVC)
        const dataPro = response.data?.datas || []
        setDataVoucherOne(dataPro)
        setIdVoucher(idVC.toLowerCase())
    }

    const [diemTichLuy, setDiem] = useState(0)

    const handleChangeDiamTichLuy = async (value: any) => {
        setDiem(value.target.value)
    }
    const apDungDiem = async () => {
        if (diemTichLuy > auth?.discount_points) {
            toast({
                variant: 'destructive',
                title: 'Bạn làm gì có nhiều điểm thế, nhập lại đi!'
            })
        } else if (diemTichLuy < 0) {
            toast({
                variant: 'destructive',
                title: 'Sao lại nhập âm, nhập lại đi, nhập số lớn hơn 0 ý!'
            })
        } else {
            setTongTienCanThanhToan(tongTienCanThanhToan - diemTichLuy)
            toast({
                variant: 'success',
                title: 'Sử dụng điểm tích lũy thành công!'
            })
            auth.discount_points = auth?.discount_points - diemTichLuy
            await instance.patch(`/auth/${userID}`, auth)
        }
    }

    const [data, setDataVoucherOne] = useState<any>() // Fix variable name

    const xetIdVoucher = () => {
        if (data && idVoucher !== '') {
            return true
        } else if (data === undefined && idVoucher === '') {
            return false
        }
    }
    const XetDieuKienDungVoucher = () => {
        if (data && dataCart?.totalAmount >= data?.conditions) {
            return true
        } else if (!data) {
            return false
        }
    }

    let phiVanChuyen = 25000
    const [voucherGiamGia, setVoucherGiamGia] = useState(0)
    const [tongTienCanThanhToan, setTongTienCanThanhToan] = useState<number>(dataCart?.totalAmount + phiVanChuyen)

    useEffect(() => {
        const upTongTienCanThanhToan = dataCart?.totalAmount + phiVanChuyen - voucherGiamGia
        setTongTienCanThanhToan(upTongTienCanThanhToan)
    }, [dataCart, voucherGiamGia])
    const apDungVoucher = () => {
        if (xetIdVoucher() && XetDieuKienDungVoucher()) {
            setVoucherGiamGia(data?.decrease)
            alert('Áp  dụng thành công')
        } else {
            alert('Mã voucher hoặc điều kiệu áp dụng không hợp lệ !!!')
        }
    }
    const navigate = useNavigate()
    const handleCheckout = () => {
        const thongtindonhang: any = {
            order: dataCart?.data,
            phiVanChuyen: phiVanChuyen,
            voucher: {
                idVc: data?._id || '',
                nameVc: data?.name || 'Không có',
                decreaseVc: voucherGiamGia || 0
            },
            tongTien: tongTienCanThanhToan
        }
        localStorage.setItem('thongtindonhang', JSON.stringify(thongtindonhang))
        navigate('/payment_information')
    }

    const onSearch = (value: string) => {
        console.log('search:', value)
    }

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

    const [userID, setUserID] = useState<any>()
    console.log(userID)
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])
    const [dataMyVoucher, setdataMyVoucher] = useState<any[]>([])
    const [MyVoucher, setMyVoucher] = useState<any[]>([])
    const [auth, setAuth] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userID) {
                    const response = await instance.get('/my_voucher/user/' + userID)
                    const dataPro = response.data?.datas || []

                    const user = await instance.get('/auth/' + userID)
                    setAuth(user.data.datas)
                    // Sort products by createdAt (newest to oldest)
                    dataPro.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

                    const formattedData = dataPro
                        .filter((item: any) => item?.voucher?.status === true)
                        .map((item: any) => ({
                            value: item?.voucher?._id,
                            label: item?.voucher?.name
                        }))

                    setMyVoucher(dataPro)
                    setdataMyVoucher(formattedData)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [userID, tongTienCanThanhToan])

    const [voucherDuocChon, setvoucherDuocChon] = useState<any>(undefined)
    console.log('🚀 ~ CartPage ~ voucherDuocChon:', voucherDuocChon)
    useEffect(() => {
        if (MyVoucher !== undefined && data !== undefined) {
            const voucherDuocChon = MyVoucher.filter((item: any) => item.idVoucher === data?._id)
            setvoucherDuocChon(voucherDuocChon)
        }
    }, [MyVoucher, data])

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
                                {dataCart?.data.map((cartItem: any) => (
                                    <tr key={cartItem._id}>
                                        <td className='remove'>
                                            <Popconfirm
                                                placement='topRight'
                                                title='Xóa sản phẩm này?'
                                                description='Bạn có chắc chắn xóa sản phẩm này khỏi giỏ hàng không?'
                                                onConfirm={() => onRemove(cartItem)}
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
                                                        <Link to={'/products/' + cartItem}>
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
                                                        {cartItem?.typeProduct?.color} - {cartItem?.typeProduct?.size}
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
                                        <td className='quantity' data-title='Quantity' style={{ width: '20%' }}>
                                            <input
                                                type='number'
                                                className='qty form-control'
                                                defaultValue={cartItem?.quantity}
                                                onChange={(event) => onChangeQuantity_Cart(cartItem, event)}
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
                        justifyContent: 'space-between',
                        padding: '0 6%',
                        paddingLeft: '7%'
                    }}
                >
                    <div className='row' style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                        {auth?.discount_points > 0 ? (
                            <div className='form-group mb-3'>
                                <h1 style={{ fontSize: '19px', marginBottom: '5px' }}>
                                    Số điểm tích lũy của bạn:{' '}
                                    <span style={{ color: 'gray' }}>{auth?.discount_points} VNĐ</span>
                                </h1>
                                <div className='input-group mb-0' style={{ display: 'flex' }}>
                                    <input
                                        style={{
                                            width: '75%',
                                            height: '40px',
                                            border: '1px solid #d2d2d2',
                                            borderRadius: '10px'
                                        }}
                                        type='mumber'
                                        className='form-control'
                                        aria-label='Coupon Code'
                                        defaultValue={1}
                                        min={1}
                                        max={auth?.discount_points}
                                        onChange={handleChangeDiamTichLuy}
                                    />
                                    <div className='input-group-append'>
                                        <button
                                            className='sigma_btn-custom shadow-none  btn mt-3'
                                            type='button'
                                            style={{ backgroundColor: '#FFCC01' }}
                                            onClick={apDungDiem}
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}

                        <div className='form-group mb-0'>
                            <div className='input-group mb-0' style={{ display: 'flex' }}>
                                <Select
                                    style={{ width: '77%', height: '40px' }}
                                    showSearch
                                    placeholder='Chọn mã giảm giá'
                                    optionFilterProp='children'
                                    onChange={handleChange}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={dataMyVoucher}
                                />
                                <div className='input-group-append'>
                                    <button
                                        className='sigma_btn-custom shadow-none  btn mt-3'
                                        type='button'
                                        style={{ backgroundColor: '#FFCC01' }}
                                        onClick={apDungVoucher}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                            {xetIdVoucher() ? (
                                XetDieuKienDungVoucher() ? (
                                    <Card
                                        headStyle={{ color: 'white  ', backgroundColor: 'red', marginTop: '20px' }}
                                        bodyStyle={{ padding: '5px 20px' }}
                                        title={voucherDuocChon?.[0]?.voucher?.name}
                                        bordered={false}
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        <h2 style={{ fontSize: '20px', display: 'flex', margin: '5px 0' }}>
                                            Số tiền bạn được giảm: &nbsp;
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: formatPriceBootstrap(
                                                        voucherDuocChon?.[0]?.voucher?.decrease
                                                    )
                                                }}
                                            ></span>
                                        </h2>
                                        <h2 style={{ fontSize: '20px', display: 'flex', margin: '5px 0' }}>
                                            Số lần sử dụng voucher: &nbsp;
                                            <span style={{ color: 'red' }}>{voucherDuocChon?.[0]?.quantity}</span>
                                        </h2>
                                        HSD: &nbsp;
                                        <span style={{ color: 'gray', fontSize: '15px', marginTop: '50px' }}>
                                            {voucherDuocChon?.[0]?.voucher?.expiry}
                                        </span>
                                    </Card>
                                ) : (
                                    <Card
                                        headStyle={{
                                            color: 'white  ',
                                            backgroundColor: 'red',
                                            marginTop: '20px',
                                            wordWrap: 'break-word'
                                        }}
                                        title={
                                            'Bạn cần mua thêm ' +
                                            (data.conditions - dataCart?.totalAmount) +
                                            ' để sử dụng voucher này'
                                        }
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                            height: '50px'
                                        }}
                                    ></Card>
                                )
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
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
                                                        __html: formatPriceBootstrap(voucherGiamGia)
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
                                                        __html: formatPriceBootstrap(Number(tongTienCanThanhToan))
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
                <FooterTemplate />
            </div>
        </>
    )
}

export default CartPage
