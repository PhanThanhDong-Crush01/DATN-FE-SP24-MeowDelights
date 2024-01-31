import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { IProduct } from '@/interface/IProduct'
import { Link } from 'react-router-dom'

const ListProduct = () => {
    const { data } = useProductQuery()
    console.log(data)
    // const dataProduct = data?.datas.docs.map((item: any, index: any) => ({
    //     ...item,
    //     key: index + 1
    // }))
    return (
        <>
            <div className='section section-padding'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='row'>
                                {/*  */}
                                {data?.datas.map((product: IProduct) => (
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
                                                <div className='sigma_rating'>
                                                    <i className='fas fa-star'></i>
                                                    <i className='fas fa-star'></i>
                                                    <i className='fas fa-star'></i>
                                                    <i className='fas fa-star'></i>
                                                    <i className='fal fa-star'></i>
                                                </div>
                                                <div className='sigma_product-price'>
                                                    <span>{product.price}</span>
                                                    {/* <span>{product.price}</span> */}
                                                </div>
                                                <a href='#' className='sigma_btn btn-sm'>
                                                    Thêm giỏ hàng
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <!-- Pagination --> */}
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a className='page-link' href='#'>
                                        1
                                    </a>
                                </li>
                                <li className='page-item active'>
                                    <a className='page-link' href='#'>
                                        2 <span className='sr-only'>(current)</span>
                                    </a>
                                </li>
                                <li className='page-item'>
                                    <a className='page-link' href='#'>
                                        3
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-4'>
                            <div className='sidebar'>
                                {/* <!-- Search Widget --> */}
                                <div className='widget widget-search'>
                                    <div className='input-group'>
                                        <input type='text' name='search' placeholder='Tìm kiếm' />
                                        <div className='input-group-append'>
                                            <button type='button'>
                                                <i className='fal fa-search mr-0'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Filter: Price Start --> */}
                                <div className='widget'>
                                    <h5 className='widget-title'> Giá </h5>
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
                                        data-postfix=' $'
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
                                    <h5 className='widget-title'>Bình luận nhiều nhất</h5>
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

                                {/* <!-- Recent Posts Widget --> */}
                                <div className='widget widget-sigma-recent-posts style-3'>
                                    <h5 className='widget-title'>Bài đăng gần đây</h5>
                                    <div className='sigma_recent-post'>
                                        <div className='sigma_post-categories'>
                                            <a href='#'>Loại</a>
                                        </div>
                                        <div className='recent-post-descr'>
                                            <h6>
                                                <a href='blog-details.html'>
                                                    Mỗi cấp độ tiếp theo trong cuộc sống của bạn sẽ đòi hỏi điều gì đó
                                                </a>
                                            </h6>
                                            <div className='author-info d-flex align-items-center'>
                                                <span>TA</span>
                                                <div>
                                                    <a href='#' className='author-name'>
                                                        Tim Abell
                                                    </a>
                                                    <a href='blog-details.html' className='date'>
                                                        June 4, 2024
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='sigma_recent-post'>
                                        <div className='sigma_post-categories'>
                                            <a href='#'>Loại</a>
                                        </div>
                                        <div className='recent-post-descr'>
                                            <h6>
                                                <a href='blog-details.html'>
                                                    Chúng ta là nhà vô địch, chúng ta không bỏ cuộc, chúng ta cố gắng
                                                </a>
                                            </h6>
                                            <div className='author-info d-flex align-items-center'>
                                                <span>TA</span>
                                                <div>
                                                    <a href='#' className='author-name'>
                                                        Tim Abell
                                                    </a>
                                                    <a href='blog-details.html' className='date'>
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
                </div>
            </div>
        </>
    )
}

export default ListProduct
