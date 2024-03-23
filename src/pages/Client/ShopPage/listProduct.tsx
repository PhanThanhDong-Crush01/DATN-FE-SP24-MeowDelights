import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { IProduct } from '@/interface/IProduct'
import { formatPriceBootstrap } from '@/lib/utils'
import instance from '@/services/core/api'
import { Label } from '@radix-ui/react-label'
import { Button } from 'antd'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import ProductDialogPage from './productDialog'
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
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button>Thêm giỏ hàng</Button>
                                                    </DialogTrigger>
                                                    <DialogContent
                                                        className='sm:max-w-[900px] sm:max-h-[800px] overflow-y-auto '
                                                        style={{}}
                                                    >
                                                        <ProductDialogPage id={product._id} />
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
