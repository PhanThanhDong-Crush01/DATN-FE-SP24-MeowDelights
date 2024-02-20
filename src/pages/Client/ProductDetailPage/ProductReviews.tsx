import MenuClientComponent from '@/components/component/MenuClientComponent'

const ProductReviews = () => {
    return (
        <>
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
                                <h2 className='text-2xl pt-3'>Đánh giá</h2>{' '}
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
                                <form>
                                    <div className='row'>
                                        <div className='col-md-6 form-group'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Full Name'
                                                name='name'
                                            />
                                        </div>
                                        <div className='col-md-6 form-group'>
                                            <input
                                                type='email'
                                                className='form-control'
                                                placeholder='Email Address'
                                                name='email'
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
                            ></div>
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
                                                Leverage agile frameworks to provide a robust synopsis for high level
                                                overviews. Iterative approaches to corporate strategy foster
                                                collaborative thinking to further the overall value proposition.
                                            </p>
                                            <a href='#' className='btn-link'>
                                                {' '}
                                                Reply <i className='far fa-reply'></i>{' '}
                                            </a>
                                        </div>
                                    </li>
                                    <li className='comment-item'>
                                        <img src='/src/assets/img/blog-details/150-0.png' alt='comment author' />
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
                                                Leverage agile frameworks to provide a robust synopsis for high level
                                                overviews. Iterative approaches
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
        </>
    )
}
export default ProductReviews
