import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { IProduct } from '@/interface/IProduct'
import { Button } from 'antd'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductDialogPage from './productDialog'
import instance from '@/services/core/api'
import { formatPriceBootstrap, formatPriceBootstrapGray } from '@/lib/utils'
import { RiExpandUpDownLine } from 'react-icons/ri'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'

const ListProduct = () => {
    const { data }: any = useCategoryQuery()
    console.log('🚀 ~ ListProduct ~ data:', data)
    const [dataPro, setDataProduct] = useState<any>()
    const [products, setProducts] = useState<IProduct[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(9)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc') // State để lưu trạng thái sắp xếp giá
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null) // State để lưu danh mục được chọn
    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId)
    }
    useEffect(() => {
        if (dataPro) {
            let filteredProducts = [...dataPro]

            // Lọc sản phẩm theo danh mục được chọn
            if (selectedCategory) {
                filteredProducts = filteredProducts.filter((product: any) => product.idCategory === selectedCategory)
            }

            // Sắp xếp sản phẩm theo giá dựa trên trạng thái hiện tại của sắp xếp
            filteredProducts.sort((a: any, b: any) => {
                if (sortDirection === 'asc') {
                    return a.minPrice - b.minPrice
                } else {
                    return b.minPrice - a.minPrice
                }
            })

            setProducts(filteredProducts)
        }
    }, [dataPro, sortDirection, selectedCategory])
    const handleSortPrice = () => {
        // Thay đổi trạng thái sắp xếp giá (nếu đang là 'asc' thì chuyển sang 'desc' và ngược lại)
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    }

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
        if (dataPro) {
            // Tạo bản sao của dữ liệu sản phẩm để không ảnh hưởng đến dữ liệu gốc
            const sortedProducts = [...dataPro]

            // Sắp xếp sản phẩm theo giá dựa trên trạng thái hiện tại của sắp xếp
            sortedProducts.sort((a: any, b: any) => {
                if (sortDirection === 'asc') {
                    return a.minPrice - b.minPrice
                } else {
                    return b.minPrice - a.minPrice
                }
            })

            setProducts(sortedProducts)
        }
    }, [dataPro, sortDirection])

    useEffect(() => {
        if (dataPro) {
            const filteredProducts = dataPro?.filter((product: IProduct) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            if (filteredProducts.length === 0) {
                setProducts(dataPro)
                toast({
                    variant: 'destructive',
                    title: 'Tìm kiếm sản phẩm thất bại!!',
                    description: 'Sảm phẩm không tồn tại'
                })
            } else {
                setProducts(filteredProducts)
            }
        }
    }, [dataPro, searchTerm])

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
                                                <Link to={`${product._id}`}>
                                                    <img src={product.image} alt='product' />
                                                </Link>
                                                <div className='sigma_product-controls'></div>
                                            </div>
                                            <div className='sigma_product-body'>
                                                <h5 className='sigma_product-title'>
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
                                                    </Link>
                                                </h5>

                                                <span>{renderStars(product?.averageStars)}</span>
                                                <div className='sigma_product-price'>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: formatPriceBootstrap(product.minPrice)
                                                        }}
                                                    ></span>
                                                    {product.minPrice != product.maxPrice && (
                                                        <span
                                                            style={{ color: 'gray' }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrapGray(product.maxPrice)
                                                            }}
                                                        ></span>
                                                    )}
                                                </div>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button type='primary' class='btn btn-warning'>
                                                            Thêm giỏ hàng
                                                        </Button>
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
                                <div className='widget widget-search'>
                                    <div
                                        className='input-group'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <input
                                            type='text'
                                            name='search'
                                            placeholder='Tìm kiếm'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ height: '5%' }}
                                        />
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
                                        <div
                                            className='input-group-append ml-3'
                                            style={{
                                                fontSize: '20px',
                                                padding: '8px',
                                                backgroundColor: '#00D8E8',
                                                color: 'white'
                                            }}
                                            onClick={handleSortPrice}
                                        >
                                            <h5 style={{ display: 'flex', alignItems: 'center' }}>
                                                Giá <RiExpandUpDownLine />
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <div className='widget widget-categories'>
                                    <h5 className='widget-title' style={{ fontSize: '27px' }}>
                                        Danh mục sản phẩm
                                    </h5>
                                    <ul>
                                        <li onClick={() => handleCategoryClick('')}>
                                            <h1 style={{ fontSize: '21px' }}>- Tất cả</h1>
                                        </li>
                                        {data?.data?.map((item: any) => (
                                            <li key={item?._id} onClick={() => handleCategoryClick(item?._id)}>
                                                <h1 style={{ fontSize: '21px' }}>- {item?.name}</h1>
                                                {/* category */}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='widget widget-sigma-recent-posts'>
                                    <h5 className='widget-title' style={{ fontSize: '27px' }}>
                                        Đánh giá nhiều nhất
                                    </h5>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListProduct
