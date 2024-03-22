import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { IProduct } from '@/interface/IProduct'
import { formatPriceBootstrap } from '@/lib/utils'
import instance from '@/services/core/api'
import { Button } from 'antd'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

const ListProduct = () => {
    const [data, setDataProduct] = useState<any>()
    const [products, setProducts] = useState<IProduct[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(9)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const renderStars = (starCount: number) => {
        // Làm tròn số lượng sao
        const roundedStars = Math.round(starCount)

        // Phần nguyên của số sao
        const fullStars = Math.floor(starCount)

        // Phần dư
        const remainder = starCount - fullStars

        // Mảng sao đầy đủ
        const starsArray = []

        // Thêm số lượng sao nguyên
        for (let i = 0; i < fullStars; i++) {
            starsArray.push(<i key={i} className='fa fa-star active text-yellow-400'></i>)
        }

        // Thêm nửa sao nếu có phần dư >= 0.5
        if (remainder >= 0.5) {
            starsArray.push(<i key='half-star' className='fa fa-star-half active text-yellow-400'></i>)
        }

        // Thêm sao rỗng cho các sao còn lại
        const remainingStars = 5 - starsArray.length
        for (let i = 0; i < remainingStars; i++) {
            starsArray.push(<i key={`empty-star-${i}`} className='fa fa-star text-gray-200'></i>)
        }

        // Trả về mảng sao
        return starsArray
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/products')
                const data = response.data?.datas || []

                // Sort products by createdAt (newest to oldest)
                data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

                const formattedData = data.map((item: any, index: any) => ({
                    ...item,
                    key: index + 1
                }))
                const productTrue = formattedData.filter((item: any) => item.status == true)
                setDataProduct(productTrue)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (data) {
            const filteredProducts = data?.filter((product: IProduct) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            if (filteredProducts.length === 0) {
                setProducts(data)
                toast({
                    variant: 'destructive',
                    title: 'Tìm kiếm sản phẩm thất bại!!',
                    description: 'Sảm phẩm không tồn tại'
                })
            } else {
                setProducts(filteredProducts)
            }
        }
    }, [data, searchTerm])

    const totalPages = Math.ceil((products?.length || 0) / pageSize)

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentPageData = products?.slice(startIndex, endIndex) || []
    console.log(currentPageData)

    const [selectedProductId, setSelectedProductId] = useState('')

    // Hàm xử lý khi nhấn vào nút "Thêm vào giỏ hàng"
    const [dataDialog, setDataDialog] = useState<any>()
    const addToCart = (productId: any) => {
        // Tìm sản phẩm trong danh sách sản phẩm dựa trên productId
        const selectedProduct = data.find((product) => product._id === productId)
        // const id = selectedProduct?._id;
        console.log(productId)
        if (selectedProduct) {
            // Xử lý logic thêm sản phẩm vào giỏ hàng ở đây
            console.log('Sản phẩm được chọn:', selectedProduct)
            // Gán ID của sản phẩm cho biến selectedProductId
            setSelectedProductId(productId)
            // Bạn có thể gọi hàm hoặc thực hiện các thao tác cần thiết để thêm sản phẩm vào giỏ hàng ở đây
        } else {
            console.error('Không tìm thấy sản phẩm với ID:', productId)
        }
    }

    const productDialogId = selectedProductId
    console.log(productDialogId)

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await instance.get(`/products/${productDialogId}`)
                console.log(response)
                const dataDialog = response?.data || []
                console.log(dataDialog)
                setDataDialog(dataDialog)
                // Sort products by createdAt (newest to oldest)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchDatas()
    }, [])
    // const { register, handleSubmit } = useForm()

    // const uniqueColorsWithImage = dataDialog?.typeProduct.reduce((unique: any, item: any) => {
    //     if (!unique.some((color: any) => color.color === item.color)) {
    //         unique.push({
    //             color: item.color,
    //             image: item.image // Thêm link ảnh vào đây
    //         })
    //     }
    //     return unique
    // }, [])
    // console.log(uniqueColorsWithImage)
    // const uniqueSizes = [...new Set(dataDialog?.typeProduct.map((itemSize: any) => itemSize.size))]

    // const [selectedColor, setSelectedColor] = useState('')
    // const [selectedSize, setSelectedSize] = useState('')
    // const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
    // const [selectedPrice, setSelectedPrice] = useState<number | null>(0)
    // const [TypeProductID, setTypeProductID] = useState<string | null>(null)
    // const [imageChinh, setImageChinh] = useState<any>('')
    // useEffect(() => {
    //     setImageChinh(dataDialog?.image)
    //     setSelectedPrice(dataDialog?.minPrice)
    // }, [dataDialog])
    // const handleColorChange = (color: string, image: string) => {
    //     setSelectedColor(color)
    //     setImageChinh(image)
    //     updatePrice(color, selectedSize)
    //     updateQuantily(color, selectedSize)
    // }

    // const handleSizeChange = (size: string) => {
    //     setSelectedSize(size)
    //     updatePrice(selectedColor, size)
    //     updateQuantily(selectedColor, size)
    // }
    // const updatePrice = (color: string, size: string) => {
    //     const selectedTypeProduct = dataDialog?.typeProduct.find(
    //         (item: any) => item.color === color && item.size === size
    //     )

    //     if (selectedTypeProduct) {
    //         setSelectedPrice(selectedTypeProduct.price)
    //         setTypeProductID(selectedTypeProduct._id)
    //     } else {
    //         setSelectedPrice(null)
    //     }
    // }
    // const [selectedTypeProductDaChon, setSelectedTypeProductDaChon] = useState<any>()
    // const updateQuantily = (color: string, size: string) => {
    //     const selectedTypeProduct = dataDialog?.typeProduct.find(
    //         (item: any) => item.color === color && item.size === size
    //     )

    //     if (selectedTypeProduct) {
    //         setSelectedQuantity(selectedTypeProduct.quantity)
    //         setTypeProductID(selectedTypeProduct._id)
    //         setSelectedTypeProductDaChon(selectedTypeProduct)
    //     } else {
    //         setSelectedQuantity(0)
    //     }
    // }

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

    const storedUserID = localStorage.getItem('userID')

    const onHandleSubmit = (data: any) => {
        if (selectedColor == '') {
            toast({
                variant: 'destructive',
                title: 'Mời bạn chọn màu!!',
                description: 'Bạn phải chọn 1 màu để thêm vào giỏ hàng !'
            })
        } else if (selectedSize == '') {
            toast({
                variant: 'destructive',
                title: 'Mời bạn chọn kích cỡ!!',
                description: 'Bạn phải chọn 1 size để thêm vào giỏ hàng !'
            })
        } else if (data.quantity > selectedQuantity) {
            toast({
                variant: 'destructive',
                title: 'Mời bạn chọn số lượng ít hơn!',
                description: 'Tồn kho không đủ số lượng bạn chọn!'
            })
        } else {
            const cart = {
                iduser: storedUserID || '',
                idpro: selectedProductId,
                idprotype: TypeProductID,
                quantity: data.quantity
            }

            if (storedUserID) {
                onSubmit(cart)
            } else {
                // Lấy danh sách sản phẩm từ localStorage
                let cartItems = JSON.parse(localStorage.getItem('Cart_virtual_users') || '[]')

                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItemIndex = cartItems.findIndex(
                    (item: any) => item.idpro === selectedProductId && item.idprotype === TypeProductID
                )

                if (existingCartItemIndex !== -1) {
                    // Nếu sản phẩm đã tồn tại trong giỏ hàng
                    const updatedQuantity = Number(cartItems[existingCartItemIndex].quantity) + Number(data.quantity)

                    // Kiểm tra xem số lượng mới có vượt quá số lượng tối đa cho phép hay không
                    if (updatedQuantity <= selectedTypeProductDaChon.quantity) {
                        // Nếu không vượt quá, cập nhật số lượng
                        cartItems[existingCartItemIndex].quantity = updatedQuantity
                    } else {
                        // Nếu vượt quá, thông báo lỗi và không thực hiện thêm sản phẩm vào giỏ hàng
                        toast({
                            variant: 'destructive',
                            title: 'Số lượng vượt quá giới hạn!!',
                            description: `Vì trong giỏ hàng bạn, loại sản phẩm này đã có ${cartItems[existingCartItemIndex].quantity} số sản phẩm`
                        })
                        return // Return early to prevent further execution
                    }
                } else {
                    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào danh sách
                    cartItems.push(cart)
                }

                // Lưu danh sách sản phẩm mới vào localStorage
                localStorage.setItem('Cart_virtual_users', JSON.stringify(cartItems))
                toast({
                    variant: 'success',
                    title: 'Thêm sản phẩm vào giỏ hàng thành công!!',
                    description: 'Hãy kiểm tra giỏ hàng và đi đến trang thanh toán để mang đồ về cho boss nào!'
                })
            }
        }
    }
    return (
        <>
            <div className='section section-padding'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='row'>
                                {/*  */}
                                {currentPageData.map((product: any) => (
                                    <div key={product._id} className='col-lg-4 col-md-6'>
                                        <div className='sigma_product style-8'>
                                            <div className='sigma_product-thumb'>
                                                <a href='product-details.html'>
                                                    <img src={product.image} alt='product' />
                                                </a>
                                                <div className='sigma_product-controls'>
                                                    <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                        {' '}
                                                        <i className='far fa-heart'></i>{' '}
                                                    </a>
                                                    <a href='#' data-toggle='tooltip' title='Quick View'>
                                                        {' '}
                                                        <i
                                                            data-toggle='modal'
                                                            data-target='#quickViewModal'
                                                            className='far fa-eye'
                                                        ></i>{' '}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='sigma_product-body'>
                                                <h5 className='sigma_product-title'>
                                                    {' '}
                                                    <Link
                                                        to={`${product._id}`}
                                                        style={{
                                                            // display: 'inline-block',
                                                            wordWrap: 'break-word',
                                                            whiteSpace: 'normal',
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            textOverflow: 'ellipsis',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Link>{' '}
                                                </h5>
                                                {/* <div className='sigma_rating'>
                                                    <div className='flex'>
                                                        <p
                                                            style={{ fontWeight: 700 }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(product.minPrice)
                                                            }}
                                                        ></p>
                                                    </div>
                                                </div> */}
                                                <div className='sigma_product-price'>
                                                    <span>{renderStars(product?.averageStars)}</span>
                                                </div>
                                                <Dialog key={product?._id}>
                                                    <DialogTrigger asChild>
                                                        <Button onClick={() => addToCart(product._id)}>
                                                            Thêm giỏ hàng
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className='sm:max-w-[800px] sm:max-h-[800px]'>
                                                        <div className='grid gap px-10'>
                                                            <div className='section section-padding sigma_product-single'>
                                                                <div className='container'>
                                                                    <div className='row'>
                                                                        <div className='col-lg-5 col-md-6'>
                                                                            <div className='sigma_product-single-thumb mb-lg-30'>
                                                                                <div className='slider'>
                                                                                    <img
                                                                                        style={{}}
                                                                                        src={product?.image}
                                                                                        alt='product'
                                                                                    />
                                                                                </div>
                                                                                <div className='slider-nav flex flex-row gap-2'></div>
                                                                            </div>
                                                                        </div>
                                                                        <img src={product?.productType?.image} alt='' />
                                                                        <div className='col-lg-7 col-md-6'>
                                                                            <div className='sigma_product-single-content'>
                                                                                <div
                                                                                    className='sigma_product-price'
                                                                                    style={{ textAlign: 'left' }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            display: 'block',
                                                                                            width: '100%',
                                                                                            fontSize: '17px'
                                                                                        }}
                                                                                    >
                                                                                        {product?.name}
                                                                                    </span>
                                                                                </div>
                                                                                <hr />{' '}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                {/* </a> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex items-center justify-center px-2' style={{ textAlign: 'center' }}>
                                <div className='flex items-center space-x-6 lg:space-x-8'>
                                    <div className='flex w-[200px] items-center justify-center text-sm font-medium'>
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <Button onClick={handlePrevPage}>
                                            <ChevronLeftIcon />
                                        </Button>
                                        <Button onClick={handleNextPage}>
                                            <ChevronRightIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='sidebar'>
                                {/* <!-- Search Widget --> */}
                                <div className='widget widget-search'>
                                    <div
                                        className='input-group'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div
                                            className='input-group-append'
                                            style={{
                                                fontSize: '22px',
                                                padding: '10px',
                                                backgroundColor: '#00D8E8    ',
                                                color: 'white'
                                            }}
                                        >
                                            <i className='fa fa-search' aria-hidden='true'></i>
                                        </div>
                                        <input
                                            type='text'
                                            name='search'
                                            placeholder='Tìm kiếm'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ height: '5%' }}
                                        />
                                    </div>
                                </div>
                                {/* <!-- Filter: Price Start --> */}
                                <div
                                    className='widget'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <h5
                                        className='widget-title'
                                        style={{
                                            fontSize: '22px',
                                            padding: '10px',
                                            backgroundColor: '#00D8E8    ',
                                            color: 'white'
                                        }}
                                    >
                                        Giá
                                    </h5>
                                    <input
                                        type='text'
                                        className='js-range-slider'
                                        name='freshness_range'
                                        value=''
                                        data-type='double'
                                        data-min='0'
                                        data-max='500'
                                        data-from='10'
                                        data-to='100'
                                        data-grid='true'
                                        data-postfix='đ'
                                        style={{ height: '5%', marginTop: '-30px' }}
                                    />
                                </div>
                                {/* <!-- Filter: Price End -->
            <!-- Category Widget --> */}
                                <div className='widget widget-categories'>
                                    <h5 className='widget-title'>Loại</h5>
                                    <ul>
                                        <li>
                                            <a href='#'>
                                                Accesories
                                                <span>12</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                Nutrition
                                                <span>9</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                Pet
                                                <span>7</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                Cats
                                                <span>5</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#'>
                                                Dogs
                                                <span>3</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- Recent Posts Widget --> */}
                                <div className='widget widget-sigma-recent-posts'>
                                    <h5 className='widget-title'>Đánh giá nhiều nhất</h5>
                                    <div className='sigma_recent-post'>
                                        <a href='blog-details.html' className='recent-post-image'>
                                            <img src='src/assets/img/blog-standard/80x80.jpg' alt='img' />
                                            <span>12</span>
                                        </a>
                                        <div className='recent-post-descr'>
                                            <h6>
                                                <a href='blog-details.html'>
                                                    Mỗi cấp độ tiếp theo của cuộc sống của bạn sẽ đòi hỏi
                                                </a>
                                            </h6>
                                            <a href='blog-details.html' className='date'>
                                                <i className='far fa-clock mr-2'></i>
                                                June 4, 2024
                                            </a>
                                        </div>
                                    </div>
                                    <div className='sigma_recent-post'>
                                        <a href='blog-details.html' className='recent-post-image'>
                                            <img src='src/assets/img/blog-standard/80x80-0.jpg' alt='img' />
                                            <span>9</span>
                                        </a>
                                        <div className='recent-post-descr'>
                                            <h6>
                                                <a href='blog-details.html'>
                                                    Đây là một thử nghiệm để thử xem mọi thứ hoạt động như thế nào
                                                </a>
                                            </h6>
                                            <a href='blog-details.html' className='date'>
                                                <i className='far fa-clock mr-2'></i>
                                                January 4, 2024
                                            </a>
                                        </div>
                                    </div>
                                    <div className='sigma_recent-post'>
                                        <a href='blog-details.html' className='recent-post-image'>
                                            <img src='src/assets/img/blog-standard/80x80-1.jpg' alt='img' />
                                            <span>6</span>
                                        </a>
                                        <div className='recent-post-descr'>
                                            <h6>
                                                <a href='blog-details.html'>Chính họ sẽ tìm ra mô hình</a>
                                            </h6>
                                            <a href='blog-details.html' className='date'>
                                                <i className='far fa-clock mr-2'></i>
                                                June 4, 2024
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Subscribe Widget --> */}
                                <div className='widget widget-newsletter'>
                                    <h5 className='widget-title'>Join Petletter</h5>
                                    <form method='post'>
                                        <input type='email' name='email' placeholder='Email của bạn' />
                                        <button type='button' className='btn-block mt-4 py-3'>
                                            Đặt mua
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListProduct
