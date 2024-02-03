import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { toast } from '@/components/ui/use-toast'
import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { formatPriceBootstrap } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { data } = useProductQuery(id)
    const { register, handleSubmit } = useForm()

    const productId = data?.data?._id

    const uniqueColorsWithImage = data?.typeProduct.reduce((unique: any, item: any) => {
        if (!unique.some((color: any) => color.color === item.color)) {
            unique.push({
                color: item.color,
                image: item.image // Thêm link ảnh vào đây
            })
        }
        return unique
    }, [])
    const uniqueSizes = [...new Set(data?.typeProduct.map((itemSize: any) => itemSize.size))]

    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedPrice, setSelectedPrice] = useState<number | null>(0)
    const [TypeProductID, setTypeProductID] = useState<string | null>(null)
    const [imageChinh, setImageChinh] = useState<any>('')
    useEffect(() => {
        setImageChinh(data?.data?.image)
        setSelectedPrice(data?.minPrice)
    }, [data])
    const handleColorChange = (color: string, image: string) => {
        setSelectedColor(color)
        setImageChinh(image)
        updatePrice(color, selectedSize)
    }

    const handleSizeChange = (size: string) => {
        setSelectedSize(size)
        updatePrice(selectedColor, size)
    }

    const updatePrice = (color: string, size: string) => {
        const selectedTypeProduct = data?.typeProduct.find((item: any) => item.color === color && item.size === size)

        if (selectedTypeProduct) {
            setSelectedPrice(selectedTypeProduct.price)
            setTypeProductID(selectedTypeProduct._id)
        } else {
            setSelectedPrice(null)
        }
    }

    const { onSubmit } = useCartMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Thêm sản phẩm vào giỏ hàng thành công!!',
                description: 'Hãy kiểm tra giỏ hàng và đi đến trang thanh toán để mang đồ về cho boss nào!'
            })
        }
    })

    const onHandleSubmit = (data: any) => {
        const cart = {
            iduser: '65b9451b0bbb2b6e014e5588',
            idpro: productId,
            idprotype: TypeProductID,
            quantity: data.quantity
        }
        if (selectedColor == '' || selectedSize == '') {
            toast({
                variant: 'destructive',
                title: 'Mời bạn chọn màu và kích cỡ!!',
                description: 'Bạn phải chọn 1 màu và 1 size để thêm vào giỏ hàng !'
            })
        } else {
            onSubmit(cart)
        }
        console.log(data)
    }
    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-8'>
                {/* <!--Section Start--> */}
                <MenuClientComponent />
                <div className='sigma_aside-overlay aside-trigger-right'></div>

                <div className='sigma_aside-overlay aside-trigger'></div>

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
                {/* <!--Section End-->
  <!--Section Start--> */}
                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>Trang sản phẩm chi tiết</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Sản phẩm chi tiết
                            </li>
                        </ol>
                    </div>

                    <img src='/src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='/src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='/src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>
                {/* <!--Section End-->
  <!--Section Start--> */}
                <div className='section section-padding sigma_product-single'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-5 col-md-6'>
                                <div className='sigma_product-single-thumb mb-lg-30'>
                                    <div className='slider'>
                                        <img src={imageChinh} alt='product' />
                                    </div>
                                    <div className='slider-nav flex flex-row w-28'>
                                        {uniqueColorsWithImage &&
                                            uniqueColorsWithImage.map((item: any) => (
                                                <img
                                                    src={item.image}
                                                    alt='product'
                                                    onClick={() => setImageChinh(item.image)}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-7 col-md-6'>
                                <div className='sigma_product-single-content'>
                                    <div className='sigma_product-price'>
                                        <span>{data?.data?.name}</span>
                                        {/* <h1>{data?.maxPrice}</h1> */}
                                        {/* <h1>số lượng: {data?.totalQuantity}</h1> */}
                                        {selectedPrice !== null && (
                                            <span>
                                                Giá:
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatPriceBootstrap(Number(selectedPrice))
                                                    }}
                                                ></span>
                                            </span>
                                        )}
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

                                    <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
                                        <div className='sigma_product-meta'>
                                            <p>
                                                <strong>
                                                    Mã sản phẩm <span>{data?.data?._id}</span>
                                                    <input type='hidden' {...register('product')} value={productId} />
                                                    {/* <input type='' {...register('product')} value={data?.data?._id} /> */}
                                                </strong>
                                            </p>
                                            <p>
                                                <strong className='flex items-baseline mb-3 pb-3 mt-3 pt-3 border-slate-200'>
                                                    <div className='space-x-2 flex text-sm'>
                                                        <span className='pt-1 text-base font-sans pr-7'>Màu sắc</span>
                                                        {uniqueColorsWithImage &&
                                                            uniqueColorsWithImage.map((itemColor: any) => (
                                                                <label key={itemColor.color}>
                                                                    <input
                                                                        {...register('color')}
                                                                        className='sr-only peer'
                                                                        name='color'
                                                                        type='radio'
                                                                        value={itemColor.color}
                                                                        onChange={() =>
                                                                            handleColorChange(
                                                                                itemColor.color,
                                                                                itemColor.image
                                                                            )
                                                                        }
                                                                    />
                                                                    <div
                                                                        className='rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-yellow-600 peer-checked:text-white'
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: '10px',
                                                                            border: '1px solid #EEEEEE'
                                                                        }}
                                                                    >
                                                                        {itemColor.color}
                                                                    </div>
                                                                </label>
                                                            ))}
                                                    </div>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong className='flex items-baseline mb-6 pb-6 mt-3 border-b border-slate-200'>
                                                    <div className='space-x-2 flex text-sm gap-3 '>
                                                        <span className='pt-1 text-base font-sans pr-7'>Kích cỡ</span>
                                                        {uniqueSizes.map((size: any) => (
                                                            <label key={size}>
                                                                <input
                                                                    {...register('size')}
                                                                    className='sr-only peer'
                                                                    name='size'
                                                                    type='radio'
                                                                    value={size}
                                                                    onChange={() => handleSizeChange(size)}
                                                                />
                                                                <div
                                                                    className='rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-yellow-600 peer-checked:text-white'
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '10px',
                                                                        border: '1px solid #EEEEEE'
                                                                    }}
                                                                >
                                                                    {size}
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong className='flex items-baseline mb-6 pb-6 mt-3 border-b border-slate-200'>
                                                    <div className='space-x-2 flex text-sm gap-3 '>
                                                        <span className='pt-1 text-base font-sans pr-7'>SỐ lượng</span>
                                                        <input
                                                            {...register('quantity')}
                                                            className='sr-only peer'
                                                            name='quantity'
                                                            type='number'
                                                        />
                                                    </div>
                                                </strong>
                                            </p>
                                        </div>

                                        <hr />

                                        <div className='sigma_product-atc-form'>
                                            <div className='sigma_product-buttons'>
                                                <button type='submit' className='ms-0 sigma_btn'>
                                                    Thêm giỏi hàng <i className='far fa-shopping-basket'></i>{' '}
                                                </button>
                                                <a
                                                    href='product-details.html'
                                                    data-toggle='tooltip'
                                                    title='Wishlist'
                                                    className='ml-2 sigma_btn light'
                                                >
                                                    {' '}
                                                    <i className='m-0 far fa-heart'></i>{' '}
                                                </a>
                                                <a
                                                    href='product-details.html'
                                                    data-toggle='tooltip'
                                                    title='Compare'
                                                    className='ml-2 sigma_btn light'
                                                >
                                                    {' '}
                                                    <i className='m-0 far fa-compress'></i>{' '}
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                    {/* <!-- Post Meta Start --> */}
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
                                    <p
                                        className='sigma_productnp-excerpt'
                                        dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                                    ></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--Section End-->
  <!-- Additional Information Start --> */}
                <div className='section bg-gray'>
                    <div className='container'>
                        <div className='sigma_product-additional-info'>
                            <ul className='nav' id='bordered-tab' role='tablist'>
                                <li className='nav-item'>
                                    <a
                                        className='nav-link active'
                                        id='tab-product-desc-tab'
                                        data-toggle='pill'
                                        href='#tab-product-desc'
                                        role='tab'
                                        aria-controls='tab-product-desc'
                                        aria-selected='true'
                                    >
                                        Mô tả
                                    </a>
                                </li>
                            </ul>

                            <div className='tab-content' id='bordered-tabContent'>
                                <div
                                    className='tab-pane fade show active'
                                    id='tab-product-desc'
                                    role='tabpanel'
                                    aria-labelledby='tab-product-desc-tab'
                                >
                                    <h4>Mô tả</h4>
                                    <p> {data?.data?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section bg-gray'>
                    <div className='container'>
                        <div className='sigma_product-additional-info'>
                            <ul className='nav' id='bordered-tab' role='tablist'>
                                <li className='nav-item'>
                                    <a
                                        className='nav-link active'
                                        id='tab-product-desc-tab'
                                        data-toggle='pill'
                                        href='#tab-product-desc'
                                        role='tab'
                                        aria-controls='tab-product-desc'
                                        aria-selected='true'
                                    >
                                        Thông tin sản phẩm
                                    </a>
                                </li>
                            </ul>

                            <div className='tab-content' id='bordered-tabContent'>
                                <div
                                    className='tab-pane fade show active'
                                    id='tab-product-desc'
                                    role='tabpanel'
                                    aria-labelledby='tab-product-desc-tab'
                                >
                                    <h4>Thêm thông tin</h4>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Thuộc tính</th>
                                                <th scope='col'>Giá trị</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {' '}
                                                    <strong>Màu săc</strong>{' '}
                                                </td>
                                                <td>{data?.typeProduct?.color}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {' '}
                                                    <strong>Kích thích</strong>{' '}
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section bg-gray'>
                    <div className='container'>
                        <div className='sigma_product-additional-info'>
                            <ul className='nav' id='bordered-tab' role='tablist'>
                                <li className='nav-item'>
                                    <a
                                        className='nav-link'
                                        id='tab-product-reviews-tab'
                                        data-toggle='pill'
                                        href='#tab-product-reviews'
                                        role='tab'
                                        aria-controls='tab-product-reviews'
                                        aria-selected='false'
                                    >
                                        Đánh giá{' '}
                                    </a>
                                </li>
                            </ul>

                            <div className='tab-content' id='bordered-tabContent'>
                                <div
                                    className='tab-pane fade show active'
                                    id='tab-product-desc'
                                    role='tabpanel'
                                    aria-labelledby='tab-product-desc-tab'
                                >
                                    <h4>Đánh giá</h4>

                                    <div className='sigma_rating-wrapper'>
                                        <div className='sigma_rating m-0'>
                                            <i className='fas fa-star'></i>
                                            <i className='fas fa-star'></i>
                                            <i className='fas fa-star'></i>
                                            <i className='fas fa-star'></i>
                                            <i className='fas fa-star'></i>
                                        </div>
                                        <span>Your Review</span>
                                    </div>

                                    {/* <!-- Review Form start --> */}
                                    {/* form đánh giá */}
                                    <div className='comment-form'>
                                        <form method='post'>
                                            <div className='row'>
                                                <div className='col-md-6 form-group'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        placeholder='Full Name'
                                                        name='fname'
                                                        value=''
                                                    />
                                                </div>
                                                <div className='col-md-6 form-group'>
                                                    <input
                                                        type='email'
                                                        className='form-control'
                                                        placeholder='Email Address'
                                                        name='email'
                                                        value=''
                                                    />
                                                </div>
                                                <div className='col-md-12 form-group'>
                                                    <textarea
                                                        className='form-control'
                                                        placeholder='Type your comment...'
                                                        name='comment'
                                                        // rows='7'
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <button type='submit' className='sigma_btn-custom w-24 h-12' name='button'>
                                                Gửi
                                            </button>
                                        </form>
                                    </div>
                                    <div
                                        className='tab-pane fade'
                                        id='tab-product-info'
                                        role='tabpanel'
                                        aria-labelledby='tab-product-info-tab'
                                    ></div>
                                    <div
                                        className='tab-pane fade'
                                        id='tab-product-reviews'
                                        role='tabpanel'
                                        aria-labelledby='tab-product-reviews-tab'
                                    >
                                        {/* <!-- Review Form End -->

              <!-- Reviews Start --> */}
                                        {/* NHững đánh giá */}

                                        {/* <!-- Reviews End --> */}
                                    </div>
                                    <div className='comments-list'>
                                        <ul>
                                            <li className='comment-item'>
                                                <img src='/src/assets/img/blog-details/150.png' alt='comment author' />
                                                <div className='comment-body'>
                                                    <h5>Robert John</h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star'></i>
                                                    </div>
                                                    <span>
                                                        {' '}
                                                        <i className='far fa-clock'></i> January 13 2024
                                                    </span>
                                                    <p>
                                                        Leverage agile frameworks to provide a robust synopsis for high
                                                        level overviews. Iterative approaches to corporate strategy
                                                        foster collaborative thinking to further the overall value
                                                        proposition.
                                                    </p>
                                                    <a href='#' className='btn-link'>
                                                        {' '}
                                                        Reply <i className='far fa-reply'></i>{' '}
                                                    </a>
                                                </div>
                                            </li>
                                            <li className='comment-item'>
                                                <img
                                                    src='/src/assets/img/blog-details/150-0.png'
                                                    alt='comment author'
                                                />
                                                <div className='comment-body'>
                                                    <h5>Christine Hill</h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star active'></i>
                                                        <i className='fa fa-star'></i>
                                                    </div>
                                                    <span>
                                                        {' '}
                                                        <i className='far fa-clock'></i> December 27 2024
                                                    </span>
                                                    <p>
                                                        Leverage agile frameworks to provide a robust synopsis for high
                                                        level overviews. Iterative approaches
                                                    </p>
                                                    <a href='#' className='btn-link'>
                                                        {' '}
                                                        Trả lời <i className='far fa-reply'></i>{' '}
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Additional Information End -->
  <!--Section Start--> */}
                <FooterTemplate />
            </div>
        </>
    )
}

export default ProductDetailPage
