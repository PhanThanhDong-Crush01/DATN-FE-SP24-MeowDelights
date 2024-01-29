import MenuClientComponent from '@/components/component/MenuClientComponent.js'
import FooterTemplate from '@/components/component/Footer.js'

const HomePage = () => {
    return (
        <>
            <div className='sigma_header-absolute btn-style-5 btn-rounded sidebar-style-3'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Search...' value='' />
                        <button type='submit' className='search-btn'>
                            <i className='fal fa-search m-0' />
                        </button>
                    </form>
                </div>
                <div className='sigma_banner light-bg style-10 bg-cover'>
                    <img src='src/assets/img/tr.png' className='tr' alt='img' />
                    <img src='src/assets/img/br.png' className='br' alt='img' />
                    <img src='src/assets/img/bl.png' className='bl' alt='img' />
                    <div className='banner-slider-inner'>
                        <div className='sigma_banner-text'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-lg-6'>
                                        <h5 className='primary-color'>Everything Your Pet Needs</h5>
                                        <h1 className='title'>Mental and Physical Health</h1>
                                        <div className='banner-links d-flex align-items-center'>
                                            <a href='contact-us.html' className='sigma_btn'>
                                                Get a Quote
                                            </a>
                                            <a href='about-us.html' className='sigma_btn light ml-4'>
                                                Read more
                                            </a>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 d-none d-lg-block'>
                                        <div className='sigma_banner-image mt-5 mt-lg-0'>
                                            <img src='src/assets/img/home-2/540x540.jpg' alt='img' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='section section-padding bg-cover bg-center bg-secondary-1'
                    style={{ backgroundImage: 'url(src/assets/img/pattern-3.png)' }}
                >
                    <div className='container'>
                        <div className='sigma_service-wrapper style-18 margin-negative'>
                            <div className='section-title flex-title'>
                                <h3 className='title mb-0'>What your pet needs, when they need it.</h3>
                                <a href='contact-us.html' className='sigma_btn mt-3 mt-sm-0'>
                                    Get a Quote
                                    <i className='fal fa-arrow-right ml-3' />
                                </a>
                            </div>
                            <div className='row'>
                                <div className='col-lg-4 col-md-6'>
                                    <div className='sigma_service style-18'>
                                        <div className='sigma_service-thumb'>
                                            <i className='flaticon-pet-insurance' />
                                        </div>
                                        <div className='sigma_service-body'>
                                            <h5>
                                                <a href='service-details.html'>Cat Care</a>
                                            </h5>
                                            <p>From nutrition to health care. Everything in one.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-6'>
                                    <div className='sigma_service style-18'>
                                        <div className='sigma_service-thumb'>
                                            <i className='flaticon-pet-food' />
                                        </div>
                                        <div className='sigma_service-body'>
                                            <h5>
                                                <a href='service-details.html'>Vet Tips</a>
                                            </h5>
                                            <p>Anything related to your pets furry, flying or crawling.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-6'>
                                    <div className='sigma_service style-18'>
                                        <div className='sigma_service-thumb'>
                                            <i className='flaticon-dog-1' />
                                        </div>
                                        <div className='sigma_service-body'>
                                            <h5>
                                                <a href='service-details.html'>Dog Care</a>
                                            </h5>
                                            <p>Training, nurture or anything else. We are here for you.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_counter style-5'>
                                    <i className='flaticon-pet-insurance text-white' />
                                    <span>
                                        <b className='counter' data-from='0' data-to='3500'>
                                            3,500
                                        </b>
                                    </span>
                                    <p className='text-white'>Happy Customers</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_counter style-5'>
                                    <i className='flaticon-award text-white' />
                                    <span>
                                        <b className='counter' data-from='0' data-to='541'>
                                            541
                                        </b>

                                        <span className='plus'>+</span>
                                    </span>
                                    <p className='text-white'>Project Done</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_counter style-5'>
                                    <i className='flaticon-trophy text-white' />
                                    <span>
                                        <b className='counter' data-from='0' data-to='40'>
                                            40
                                        </b>

                                        <span className='plus'>+</span>
                                    </span>
                                    <p className='text-white'>Awards Win</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_counter style-5'>
                                    <i className='flaticon-vet text-white' />
                                    <span>
                                        <b className='counter' data-from='0' data-to='678'>
                                            678
                                        </b>
                                    </span>
                                    <p className='text-white'>Clients Work</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6'>
                                <div className='sigma_about style-9 w-100 h-100'>
                                    <div className='sigma_about-image-1 has-no-content'>
                                        <img src='src/assets/img/home-2/635x450.jpg' alt='img' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='sigma_about style-9 mt-5 mt-lg-0'>
                                    <div className='section-title'>
                                        <h3 className='title mb-5'>Pet Adoption. Be Part of Something Beautiful!</h3>
                                    </div>
                                    <div className='sigma_about-content'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='sigma_info style-15'>
                                                    <div className='sigma_info-description'>
                                                        <h5>
                                                            <a href='#'>Dog Boarding</a>
                                                        </h5>
                                                        <p>
                                                            We have a large selection of cats and dogs. Our animals are
                                                            spayed-neutered
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='sigma_info style-15'>
                                                    <div className='sigma_info-description'>
                                                        <h5>
                                                            <a href='#'>Cat Boarding</a>
                                                        </h5>
                                                        <p>
                                                            We have a large selection of cats and dogs. Our animals are
                                                            spayed-neutered
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href='contact-us.html' className='sigma_btn'>
                                            Get A Quote
                                            <i className='fal fa-arrow-right ml-3' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding pt-0'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Trending</span>
                            <h3 className='title mb-0'>Pet Supplies</h3>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='sigma_tab-item style-2 with-dots'>
                                    <ul className='nav nav-tabs' id='myTab' role='tablist'>
                                        <li className='nav-item'>
                                            <a
                                                className='nav-link active'
                                                id='photo-tab'
                                                data-toggle='tab'
                                                href='#photo'
                                                role='tab'
                                                aria-controls='photo'
                                                aria-selected='true'
                                            >
                                                <span className='pulsive-dot'></span>
                                                Accessories
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a
                                                className='nav-link'
                                                id='image-tab'
                                                data-toggle='tab'
                                                href='#image'
                                                role='tab'
                                                aria-controls='image'
                                                aria-selected='false'
                                            >
                                                <span className='pulsive-dot'></span>
                                                Belts
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a
                                                className='nav-link'
                                                id='documents-tab'
                                                data-toggle='tab'
                                                href='#documents'
                                                role='tab'
                                                aria-controls='documents'
                                                aria-selected='false'
                                            >
                                                <span className='pulsive-dot'></span>
                                                Cages
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a
                                                className='nav-link'
                                                id='letters-tab'
                                                data-toggle='tab'
                                                href='#letters'
                                                role='tab'
                                                aria-controls='letters'
                                                aria-selected='false'
                                            >
                                                <span className='pulsive-dot'></span>
                                                Food Container
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='tab-content col-12' id='myTabContent'>
                                <div
                                    className='tab-pane fade show active'
                                    id='photo'
                                    role='tabpanel'
                                    aria-labelledby='photo-tab'
                                >
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/1.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Food Dispenser</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>29$</span>
                                                        <span>49$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/2.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Leather Belts</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>78$</span>
                                                        <span>99$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/3.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Cat Play House</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>36$</span>
                                                        <span>55$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/4.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Pet Crate</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>45$</span>
                                                        <span>87$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tab-pane fade' id='image' role='tabpanel' aria-labelledby='image-tab'>
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/5.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Food Dispenser</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>29$</span>
                                                        <span>49$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/6.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Leather Belts</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>78$</span>
                                                        <span>99$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/7.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Cat Play House</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>36$</span>
                                                        <span>55$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/8.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Pet Crate</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>45$</span>
                                                        <span>87$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='tab-pane fade'
                                    id='documents'
                                    role='tabpanel'
                                    aria-labelledby='documents-tab'
                                >
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/9.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Food Dispenser</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>29$</span>
                                                        <span>49$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/10.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Leather Belts</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>78$</span>
                                                        <span>99$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/11.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Cat Play House</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>36$</span>
                                                        <span>55$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/12.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Pet Crate</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>45$</span>
                                                        <span>87$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='tab-pane fade'
                                    id='letters'
                                    role='tabpanel'
                                    aria-labelledby='letters-tab'
                                >
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/5.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Food Dispenser</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>29$</span>
                                                        <span>49$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/9.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Leather Belts</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>78$</span>
                                                        <span>99$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/1.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Cat Play House</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>36$</span>
                                                        <span>55$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className='sigma_product style-8'>
                                                <div className='sigma_product-thumb'>
                                                    <a href='product-details.html'>
                                                        <img src='src/assets/img/shop/6.png' alt='product' />
                                                    </a>
                                                    <div className='sigma_product-controls'>
                                                        <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                            {' '}
                                                            <i className='far fa-heart' />{' '}
                                                        </a>
                                                        <a
                                                            href='product-details.html'
                                                            data-toggle='tooltip'
                                                            title='Add To Cart'
                                                        >
                                                            {' '}
                                                            <i className='far fa-shopping-basket' />{' '}
                                                        </a>
                                                        <a href='#' data-toggle='tooltip' title='Quick View'>
                                                            {' '}
                                                            <i
                                                                data-toggle='modal'
                                                                data-target='#quickViewModal'
                                                                className='far fa-eye'
                                                            />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='sigma_product-body'>
                                                    <h5 className='sigma_product-title'>
                                                        {' '}
                                                        <a href='product-details.html'>Pet Crate</a>{' '}
                                                    </h5>
                                                    <div className='sigma_rating'>
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fas fa-star' />
                                                        <i className='fal fa-star' />
                                                    </div>
                                                    <div className='sigma_product-price'>
                                                        <span>45$</span>
                                                        <span>87$</span>
                                                    </div>
                                                    <a href='#' className='sigma_btn btn-sm'>
                                                        Add to Cart
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
                <div className='section section-padding bg-gray'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Our Team</span>
                            <h3 className='title mb-0'>Meet Our Team of True Pet Lovers</h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/home-2/255x255.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Peter Ronson</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Founder
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
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
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/home-2/255x255-0.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Emilia Johnson</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Pet instructor
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
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
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/home-2/255x255-1.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Barbra Stevens</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Assistent
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
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
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6'>
                                <div className='sigma_team style-15'>
                                    <div className='sigma_team-thumb'>
                                        <img src='src/assets/img/home-2/255x255-2.jpg' alt='team' />
                                    </div>
                                    <div className='sigma_team-body'>
                                        <h5>
                                            <a href='#'>Isabella</a>
                                        </h5>
                                        <div className='sigma_team-categories'>
                                            <a href='#' className='sigma_team-category'>
                                                Pet Doctor
                                            </a>
                                        </div>
                                        <ul className='sigma_social-icons'>
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
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Best Seller</span>
                            <h3 className='title mb-0'>Everything your pet needs</h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/4.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Food Dispenser</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>29$</span>
                                            <span>49$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/7.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Organic Food</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>55$</span>
                                            <span>76$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/1.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Renee Beanie</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>29$</span>
                                            <span>49$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/9.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Mouse bell</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>56$</span>
                                            <span>87$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/3.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Party Hat</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>65$</span>
                                            <span>98$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/12.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Rubber Bone</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>39$</span>
                                            <span>59$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/4.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Organic Food</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>55$</span>
                                            <span>76$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-6'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/11.png' alt='product' />
                                        </a>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Mouse bell</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>55$</span>
                                            <span>76$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                        <a
                                            href='#'
                                            className='sigma_btn btn-sm light'
                                            data-toggle='modal'
                                            data-target='#quickViewModal'
                                        >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding pt-0'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Trending</span>
                            <h3 className='title mb-0'>Our Top Products</h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-8'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/1.png' alt='product' />
                                        </a>
                                        <div className='sigma_product-controls'>
                                            <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                {' '}
                                                <i className='far fa-heart' />{' '}
                                            </a>
                                            <a href='product-details.html' data-toggle='tooltip' title='Add To Cart'>
                                                {' '}
                                                <i className='far fa-shopping-basket' />{' '}
                                            </a>
                                            <a href='#' data-toggle='tooltip' title='Quick View'>
                                                {' '}
                                                <i
                                                    data-toggle='modal'
                                                    data-target='#quickViewModal'
                                                    className='far fa-eye'
                                                />{' '}
                                            </a>
                                        </div>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Food Dispenser</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fal fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>29$</span>
                                            <span>49$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-8'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/2.png' alt='product' />
                                        </a>
                                        <div className='sigma_product-controls'>
                                            <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                {' '}
                                                <i className='far fa-heart' />{' '}
                                            </a>
                                            <a href='product-details.html' data-toggle='tooltip' title='Add To Cart'>
                                                {' '}
                                                <i className='far fa-shopping-basket' />{' '}
                                            </a>
                                            <a href='#' data-toggle='tooltip' title='Quick View'>
                                                {' '}
                                                <i
                                                    data-toggle='modal'
                                                    data-target='#quickViewModal'
                                                    className='far fa-eye'
                                                />{' '}
                                            </a>
                                        </div>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Leather Belts</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fal fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>78$</span>
                                            <span>99$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-8'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/3.png' alt='product' />
                                        </a>
                                        <div className='sigma_product-controls'>
                                            <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                {' '}
                                                <i className='far fa-heart' />{' '}
                                            </a>
                                            <a href='product-details.html' data-toggle='tooltip' title='Add To Cart'>
                                                {' '}
                                                <i className='far fa-shopping-basket' />{' '}
                                            </a>
                                            <a href='#' data-toggle='tooltip' title='Quick View'>
                                                {' '}
                                                <i
                                                    data-toggle='modal'
                                                    data-target='#quickViewModal'
                                                    className='far fa-eye'
                                                />{' '}
                                            </a>
                                        </div>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Cat Play House</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fal fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>36$</span>
                                            <span>55$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='sigma_product style-8'>
                                    <div className='sigma_product-thumb'>
                                        <a href='product-details.html'>
                                            <img src='src/assets/img/shop/4.png' alt='product' />
                                        </a>
                                        <div className='sigma_product-controls'>
                                            <a href='#' data-toggle='tooltip' title='Wishlist'>
                                                {' '}
                                                <i className='far fa-heart' />{' '}
                                            </a>
                                            <a href='product-details.html' data-toggle='tooltip' title='Add To Cart'>
                                                {' '}
                                                <i className='far fa-shopping-basket' />{' '}
                                            </a>
                                            <a href='#' data-toggle='tooltip' title='Quick View'>
                                                {' '}
                                                <i
                                                    data-toggle='modal'
                                                    data-target='#quickViewModal'
                                                    className='far fa-eye'
                                                />{' '}
                                            </a>
                                        </div>
                                    </div>
                                    <div className='sigma_product-body'>
                                        <h5 className='sigma_product-title'>
                                            {' '}
                                            <a href='product-details.html'>Pet Crate</a>{' '}
                                        </h5>
                                        <div className='sigma_rating'>
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fas fa-star' />
                                            <i className='fal fa-star' />
                                        </div>
                                        <div className='sigma_product-price'>
                                            <span>45$</span>
                                            <span>87$</span>
                                        </div>
                                        <a href='#' className='sigma_btn btn-sm'>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='section section-padding bg-cover bg-center bg-secondary-1'
                    style={{ backgroundImage: 'url(src/assets/img/pattern-4.png)' }}
                >
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle text-white'>What We Do</span>
                            <h3 className='title text-white'>Services for You</h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_service style-18 has-bg'>
                                    <div className='sigma_service-thumb'>
                                        <i className='flaticon-dog-1' />
                                    </div>
                                    <div className='sigma_service-body'>
                                        <h5>
                                            <a href='service-details.html'>Dog Care</a>
                                        </h5>
                                        <p>You Can adopt or list a pet for adoption lorem ipsum dolor sitam amet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_service style-18 has-bg'>
                                    <div className='sigma_service-thumb'>
                                        <i className='flaticon-pet-insurance' />
                                    </div>
                                    <div className='sigma_service-body'>
                                        <h5>
                                            <a href='service-details.html'>Cat Care</a>
                                        </h5>
                                        <p>You Can adopt or list a pet for adoption lorem ipsum dolor sitam amet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_service style-18 has-bg'>
                                    <div className='sigma_service-thumb'>
                                        <i className='flaticon-mobile' />
                                    </div>
                                    <div className='sigma_service-body'>
                                        <h5>
                                            <a href='service-details.html'>Vet Tips</a>
                                        </h5>
                                        <p>You Can adopt or list a pet for adoption lorem ipsum dolor sitam amet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_service style-18 has-bg'>
                                    <div className='sigma_service-thumb'>
                                        <i className='flaticon-collar' />
                                    </div>
                                    <div className='sigma_service-body'>
                                        <h5>
                                            <a href='service-details.html'>Adoption Center</a>
                                        </h5>
                                        <p>You Can adopt or list a pet for adoption lorem ipsum dolor sitam amet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_service style-18 has-bg'>
                                    <div className='sigma_service-thumb'>
                                        <i className='flaticon-beauty-saloon' />
                                    </div>
                                    <div className='sigma_service-body'>
                                        <h5>
                                            <a href='service-details.html'>Grooming</a>
                                        </h5>
                                        <p>You Can adopt or list a pet for adoption lorem ipsum dolor sitam amet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='sigma_service style-18 has-bg'>
                                    <div className='sigma_service-thumb'>
                                        <i className='flaticon-vaccine' />
                                    </div>
                                    <div className='sigma_service-body'>
                                        <h5>
                                            <a href='service-details.html'>Agility</a>
                                        </h5>
                                        <p>You Can adopt or list a pet for adoption lorem ipsum dolor sitam amet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='section section-padding p-0 margin-negative'>
                        <div className='container-fluid p-0'>
                            <div className='sigma_instagram style-1 insta-images'>
                                <div className='chiu_roi' style={{ marginLeft: '10px' }}>
                                    <a href='#'>
                                        <img src='src/assets/img/home-2/376x430.jpg' alt='img' />
                                    </a>
                                    <a href='#'>
                                        <img src='src/assets/img/home-2/376x430-0.jpg' alt='img' />
                                    </a>
                                    <a href='#'>
                                        <img src='src/assets/img/home-2/376x430-1.jpg' alt='img' />
                                    </a>
                                    <a href='#'>
                                        <img src='src/assets/img/home-2/376x430-2.jpg' alt='img' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding bg-gray'></div>
                <div className='section section-padding bg-gray'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Client Testimonials</span>
                            <h3 className='title'>What Our Clients Say</h3>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='sigma_testimonial style-13 text-left bg-white'>
                                    <div className='sigma_author-info'>
                                        <div className='sigma_testimonial-thumb mr-4'>
                                            <img src='src/assets/img/home-2/90x90.png' alt='testimonial' />
                                            <span className='fas fa-quote-left sigma_testimonial-icon'></span>
                                        </div>
                                        <div className='sigma_author-block'>
                                            <h5>Isadora</h5>
                                            <span className='sigma_testimonial-category'>Doctor</span>
                                        </div>
                                    </div>
                                    <div className='sigma_testimonial-body'>
                                        <p className='mb-0'>
                                            "Just wanted to let you know how blessed I have been to have you guys care
                                            for me over the past few years"
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='sigma_testimonial style-13 text-left bg-white'>
                                    <div className='sigma_author-info'>
                                        <div className='sigma_testimonial-thumb mr-4'>
                                            <img src='src/assets/img/home-2/90x90-0.png' alt='testimonial' />
                                            <span className='fas fa-quote-left sigma_testimonial-icon'></span>
                                        </div>
                                        <div className='sigma_author-block'>
                                            <h5>Smith</h5>
                                            <span className='sigma_testimonial-category'>Professor</span>
                                        </div>
                                    </div>
                                    <div className='sigma_testimonial-body'>
                                        <p className='mb-0'>
                                            "Just wanted to let you know how blessed I have been to have you guys care
                                            for me over the past few years"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='section p-0 margin-negative sm'>
                        <div className='container'>
                            <div
                                className='sigma_cta style-9 bg-cover bg-center bg-secondary-1 shadow-none'
                                style={{ backgroundImage: 'url(src/assets/img/section-tr.png)' }}
                            >
                                <div className='row align-items-center'>
                                    <div className='col-lg-5'>
                                        <div className='sigma_cta-content'>
                                            <h3 className='mb-0 text-white'>
                                                Get notified about the event! Subscribe Today
                                            </h3>
                                        </div>
                                    </div>
                                    <div className='col-lg-7 mt-lg-0 mt-3'>
                                        <form method='post'>
                                            <div className='input-group'>
                                                <input type='email' name='email' placeholder='Email Address' />
                                                <div className='input-group-append'>
                                                    <button type='button' className='light'>
                                                        <i className='fal fa-envelope mr-2' />
                                                        Subscribe
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding'></div>
                <div className='section'>
                    <div className='container'>
                        <div className='row justify-content-end position-relative'>
                            <div
                                className='sigma_contact-image style-6 d-none d-lg-block'
                                style={{
                                    width: '50%',
                                    marginTop: '5%'
                                }}
                            >
                                <img src='src/assets/img/home-2/480x590.jpg' alt='img' style={{ width: '70%' }} />
                            </div>
                            <div
                                className='col-lg-8 '
                                style={{
                                    width: '50%'
                                }}
                            >
                                <div className='sigma_form style-6'>
                                    <div className='section-title'>
                                        <h3 className='title mb-1 text-white'>Get in Touch</h3>
                                        <p className='text-white'>We Will Be Happy To Assist You</p>
                                    </div>
                                    <form method='post'>
                                        <div className='form-group'>
                                            <i className='fal fa-user' />
                                            <input type='text' name='fname' placeholder='Name' />
                                        </div>
                                        <div className='form-group'>
                                            <i className='fal fa-envelope' />
                                            <input type='email' name='email' placeholder='Email' />
                                        </div>
                                        <div className='form-group'>
                                            <textarea name='message' rows={5} placeholder='Message'></textarea>
                                        </div>
                                        <button type='button' className='btn btn-block secondary'>
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section section-padding pt-0'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Latest Pet</span>
                            <h3 className='title'>Our Insights & Articles</h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6'>
                                <article className='sigma_post style-15'>
                                    <div className='sigma_post-thumb'>
                                        <a href='blog-details.html'>
                                            <img src='src/assets/img/home-2/350x300.jpg' alt='img' />
                                        </a>
                                    </div>
                                    <div className='sigma_post-body'>
                                        <div className='sigma_post-content'>
                                            <div className='sigma_post-meta is-absolute'>
                                                <a href='blog-details.html' className='sigma_post-date'>
                                                    28 January, 2024
                                                </a>
                                            </div>
                                            <div className='sigma_post-meta'>
                                                <ul>
                                                    <li>
                                                        <a href='blog-details.html'>
                                                            <i className='fal fa-user' />
                                                            By Jean
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='blog-details.html'>
                                                            <i className='fal fa-folder-open' />
                                                            Health
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h5>
                                                <a href='blog-details.html'>Taking Your Dog Out On The First Date</a>
                                            </h5>
                                        </div>
                                        <a href='#' className='btn-link'>
                                            Read more
                                        </a>
                                    </div>
                                </article>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <article className='sigma_post style-15'>
                                    <div className='sigma_post-thumb'>
                                        <a href='blog-details.html'>
                                            <img src='src/assets/img/home-2/350x300-0.jpg' alt='img' />
                                        </a>
                                    </div>
                                    <div className='sigma_post-body'>
                                        <div className='sigma_post-content'>
                                            <div className='sigma_post-meta is-absolute'>
                                                <a href='blog-details.html' className='sigma_post-date'>
                                                    28 January, 2024
                                                </a>
                                            </div>
                                            <div className='sigma_post-meta'>
                                                <ul>
                                                    <li>
                                                        <a href='blog-details.html'>
                                                            <i className='fal fa-user' />
                                                            By Jean
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='blog-details.html'>
                                                            <i className='fal fa-folder-open' />
                                                            Health
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h5>
                                                <a href='blog-details.html'>What Your Cat Breed Says About You</a>
                                            </h5>
                                        </div>
                                        <a href='#' className='btn-link'>
                                            Read more
                                        </a>
                                    </div>
                                </article>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <article className='sigma_post style-15'>
                                    <div className='sigma_post-thumb'>
                                        <a href='blog-details.html'>
                                            <img src='src/assets/img/home-2/350x300-1.jpg' alt='img' />
                                        </a>
                                    </div>
                                    <div className='sigma_post-body'>
                                        <div className='sigma_post-content'>
                                            <div className='sigma_post-meta is-absolute'>
                                                <a href='blog-details.html' className='sigma_post-date'>
                                                    28 January, 2024
                                                </a>
                                            </div>
                                            <div className='sigma_post-meta'>
                                                <ul>
                                                    <li>
                                                        <a href='blog-details.html'>
                                                            <i className='fal fa-user' />
                                                            By Jean
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='blog-details.html'>
                                                            <i className='fal fa-folder-open' />
                                                            Medical
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h5>
                                                <a href='blog-details.html'>Secrets to a Better Life With Your Dog</a>
                                            </h5>
                                        </div>
                                        <a href='#' className='btn-link'>
                                            Read more
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal fade sigma_quick-view-modal' id='quickViewModal' role='dialog' aria-hidden='true'>
                    <div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
                        <div className='modal-content'>
                            <div className='modal-body sigma_modal-sec'>
                                <div className='sigma_close' data-dismiss='modal'>
                                    <span></span>
                                    <span></span>
                                </div>

                                <div className='row sigma_product-single'>
                                    <div className='col-md-6'>
                                        <div className='sigma_product-single-thumb'>
                                            <img src='src/assets/img/shop/quick-view.png' alt='product' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='sigma_product-single-content'>
                                            <div className='sigma_product-price'>
                                                <span>352$</span>
                                                <span>245$</span>
                                            </div>
                                            <div className='sigma_rating-wrapper'>
                                                <div className='sigma_rating'>
                                                    <i className='fas fa-star active' />
                                                    <i className='fas fa-star active' />
                                                    <i className='fas fa-star active' />
                                                    <i className='fas fa-star active' />
                                                    <i className='fas fa-star' />
                                                </div>
                                                <span>255 Reviews</span>
                                            </div>

                                            <hr />

                                            <p className='sigma_product-excerpt'>
                                                We love every pet, so your pet feel relaxed and stress free. We take
                                                pride in giving you and your pet personalized attention. Our
                                                professional team provide exceptional grooming service,
                                            </p>

                                            <div className='sigma_product-meta'>
                                                <p>
                                                    <strong>
                                                        Product SKU: <span>#3382dk</span>
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>
                                                        Availablity: <span>In Stock</span>
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>Tags: </strong> <a href='#'>Fashion</a>,{' '}
                                                    <a href='#'>ClassNameic</a>{' '}
                                                </p>
                                            </div>

                                            <hr />

                                            <form className='sigma_product-atc-form'>
                                                <div className='sigma_product-buttons d-block'>
                                                    <a href='product-details.html' className='ml-0 btn-block sigma_btn'>
                                                        Buy Now <i className='far fa-shopping-basket' />{' '}
                                                    </a>
                                                    <a
                                                        href='product-details.html'
                                                        className='ml-0 btn-block sigma_btn light'
                                                    >
                                                        Wishlist <i className='far fa-heart' />{' '}
                                                    </a>
                                                    <a
                                                        href='product-details.html'
                                                        className='ml-0 btn-block sigma_btn light'
                                                    >
                                                        Compare <i className='far fa-compress' />{' '}
                                                    </a>
                                                </div>
                                            </form>

                                            <div className='sigma_post-single-meta'>
                                                <div className='sigma_post-single-meta-item sigma_post-share'>
                                                    <h5>Share</h5>
                                                    <ul className='sigma_sm'>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-facebook-f' />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-linkedin-in' />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-twitter' />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#'>
                                                                <i className='fab fa-youtube' />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterTemplate />
            </div>
        </>
    )
}

export default HomePage
