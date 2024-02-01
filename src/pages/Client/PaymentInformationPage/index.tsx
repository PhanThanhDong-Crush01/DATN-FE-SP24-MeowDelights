import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import '@/styles/PaymentInformation.css'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

const PaymentInformationPage = ({ state }: any) => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const encodedThongTinDonHang: any = searchParams.get('thongtindonhang')
    const thongTinDonHang = JSON.parse(decodeURIComponent(encodedThongTinDonHang))
    console.log('🚀 ~ PaymentInformationPage ~ thongTinDonHang:', thongTinDonHang)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data) // Đây là nơi bạn có thể xử lý dữ liệu khi form được submit
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
                    {/* <form className='search-form' method='post'>
                        <input type='text' placeholder='Tìm kiếm' value='' />
                        <button type='submit' className='search-btn btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form> */}
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>THANH TOÁN</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Thanh toán
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section section-padding sigma_product-single'>
                    <div className='container'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='row'>
                                <div className='col-xl-7'>
                                    <h4>Chi tiết thanh toán</h4>
                                    <div className='row mb-lg-30'>
                                        <div className='form-group col-xl-12'>
                                            <label>
                                                Họ và tên <span className='text-danger'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Họ và tên'
                                                className='form-control'
                                                {...register('name', { required: true })}
                                            />
                                            {errors.name && <i className='text-danger'>Họ và tên là bắt buộc</i>}
                                        </div>

                                        <div className='form-group col-xl-12'>
                                            <label>
                                                Quốc gia <span className='text-danger'>*</span>
                                            </label>
                                            <select
                                                className='form-control'
                                                {...register('country', { required: true })}
                                            >
                                                <option value=''>Chọn một quốc gia</option>
                                                <option value='Afghanistan'>Afghanistan</option>
                                                <option value='Åland Islands'>Åland Islands</option>
                                                <option value='Albania'>Albania</option>
                                                <option value='Algeria'>Algeria</option>
                                                <option value='American Samoa'>American Samoa</option>
                                                <option value='Andorra'>Andorra</option>
                                                <option value='Angola'>Angola</option>
                                                <option value='Anguilla'>Anguilla</option>
                                                <option value='Antarctica'>Antarctica</option>
                                                <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                                                <option value='Argentina'>Argentina</option>
                                                <option value='Armenia'>Armenia</option>
                                                <option value='Aruba'>Aruba</option>
                                                <option value='Australia'>Australia</option>
                                                <option value='Austria'>Austria</option>
                                                <option value='Azerbaijan'>Azerbaijan</option>
                                                <option value='Bahamas'>Bahamas</option>
                                                <option value='Bahrain'>Bahrain</option>
                                                <option value='Bangladesh'>Bangladesh</option>
                                                <option value='Barbados'>Barbados</option>
                                                <option value='Belarus'>Belarus</option>
                                                <option value='Belgium'>Belgium</option>
                                                <option value='Belize'>Belize</option>
                                                <option value='Benin'>Benin</option>
                                                <option value='Bermuda'>Bermuda</option>
                                                <option value='Bhutan'>Bhutan</option>
                                                <option value='Bolivia'>Bolivia</option>
                                                <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                                                <option value='Botswana'>Botswana</option>
                                                <option value='Bouvet Island'>Bouvet Island</option>
                                                <option value='Brazil'>Brazil</option>
                                                <option value='British Indian Ocean Territory'>
                                                    British Indian Ocean Territory
                                                </option>
                                                <option value='Brunei Darussalam'>Brunei Darussalam</option>
                                                <option value='Bulgaria'>Bulgaria</option>
                                                <option value='Burkina Faso'>Burkina Faso</option>
                                                <option value='Burundi'>Burundi</option>
                                                <option value='Cambodia'>Cambodia</option>
                                                <option value='Cameroon'>Cameroon</option>
                                                <option value='Canada'>Canada</option>
                                                <option value='Cape Verde'>Cape Verde</option>
                                                <option value='Cayman Islands'>Cayman Islands</option>
                                                <option value='Central African Republic'>
                                                    Central African Republic
                                                </option>
                                                <option value='Chad'>Chad</option>
                                                <option value='Chile'>Chile</option>
                                                <option value='China'>China</option>
                                                <option value='Christmas Island'>Christmas Island</option>
                                                <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option>
                                                <option value='Colombia'>Colombia</option>
                                                <option value='Comoros'>Comoros</option>
                                                <option value='Congo'>Congo</option>
                                                <option value='Congo, The Democratic Republic of The'>
                                                    Congo, The Democratic Republic of The
                                                </option>
                                                <option value='Cook Islands'>Cook Islands</option>
                                                <option value='Costa Rica'>Costa Rica</option>
                                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                                <option value='Croatia'>Croatia</option>
                                                <option value='Cuba'>Cuba</option>
                                                <option value='Cyprus'>Cyprus</option>
                                                <option value='Czech Republic'>Czech Republic</option>
                                                <option value='Denmark'>Denmark</option>
                                                <option value='Djibouti'>Djibouti</option>
                                                <option value='Dominica'>Dominica</option>
                                                <option value='Dominican Republic'>Dominican Republic</option>
                                                <option value='Ecuador'>Ecuador</option>
                                                <option value='Egypt'>Egypt</option>
                                                <option value='El Salvador'>El Salvador</option>
                                                <option value='Equatorial Guinea'>Equatorial Guinea</option>
                                                <option value='Eritrea'>Eritrea</option>
                                                <option value='Estonia'>Estonia</option>
                                                <option value='Ethiopia'>Ethiopia</option>
                                                <option value='Falkland Islands (Malvinas)'>
                                                    Falkland Islands (Malvinas)
                                                </option>
                                                <option value='Faroe Islands'>Faroe Islands</option>
                                                <option value='Fiji'>Fiji</option>
                                                <option value='Finland'>Finland</option>
                                                <option value='France'>France</option>
                                                <option value='French Guiana'>French Guiana</option>
                                                <option value='French Polynesia'>French Polynesia</option>
                                                <option value='French Southern Territories'>
                                                    French Southern Territories
                                                </option>
                                                <option value='Gabon'>Gabon</option>
                                                <option value='Gambia'>Gambia</option>
                                                <option value='Georgia'>Georgia</option>
                                                <option value='Germany'>Germany</option>
                                                <option value='Ghana'>Ghana</option>
                                                <option value='Gibraltar'>Gibraltar</option>
                                                <option value='Greece'>Greece</option>
                                                <option value='Greenland'>Greenland</option>
                                                <option value='Grenada'>Grenada</option>
                                                <option value='Guadeloupe'>Guadeloupe</option>
                                                <option value='Guam'>Guam</option>
                                                <option value='Guatemala'>Guatemala</option>
                                                <option value='Guernsey'>Guernsey</option>
                                                <option value='Guinea'>Guinea</option>
                                                <option value='Guinea-bissau'>Guinea-bissau</option>
                                                <option value='Guyana'>Guyana</option>
                                                <option value='Haiti'>Haiti</option>
                                                <option value='Heard Island and Mcdonald Islands'>
                                                    Heard Island and Mcdonald Islands
                                                </option>
                                                <option value='Holy See (Vatican City State)'>
                                                    Holy See (Vatican City State)
                                                </option>
                                                <option value='Honduras'>Honduras</option>
                                                <option value='London'>London</option>
                                                <option value='Hungary'>Hungary</option>
                                                <option value='Iceland'>Iceland</option>
                                                <option value='India'>India</option>
                                                <option value='Indonesia'>Indonesia</option>
                                                <option value='Iran, Islamic Republic of'>
                                                    Iran, Islamic Republic of
                                                </option>
                                                <option value='Iraq'>Iraq</option>
                                                <option value='Ireland'>Ireland</option>
                                                <option value='Isle of Man'>Isle of Man</option>
                                                <option value='Israel'>Israel</option>
                                                <option value='Italy'>Italy</option>
                                                <option value='Jamaica'>Jamaica</option>
                                                <option value='Japan'>Japan</option>
                                                <option value='Jersey'>Jersey</option>
                                                <option value='Jordan'>Jordan</option>
                                                <option value='Kazakhstan'>Kazakhstan</option>
                                                <option value='Kenya'>Kenya</option>
                                                <option value='Kiribati'>Kiribati</option>
                                                <option value="Korea, Democratic People's Republic of">
                                                    Korea, Democratic People's Republic of
                                                </option>
                                                <option value='Korea, Republic of'>Korea, Republic of</option>
                                                <option value='Kuwait'>Kuwait</option>
                                                <option value='Kyrgyzstan'>Kyrgyzstan</option>
                                                <option value="Lao People's Democratic Republic">
                                                    Lao People's Democratic Republic
                                                </option>
                                                <option value='Latvia'>Latvia</option>
                                                <option value='Lebanon'>Lebanon</option>
                                                <option value='Lesotho'>Lesotho</option>
                                                <option value='Liberia'>Liberia</option>
                                                <option value='Libyan Arab Jamahiriya'>Libyan Arab Jamahiriya</option>
                                                <option value='Liechtenstein'>Liechtenstein</option>
                                                <option value='Lithuania'>Lithuania</option>
                                                <option value='Luxembourg'>Luxembourg</option>
                                                <option value='Macao'>Macao</option>
                                                <option value='Macedonia, The Former Yugoslav Republic of'>
                                                    Macedonia, The Former Yugoslav Republic of
                                                </option>
                                                <option value='Madagascar'>Madagascar</option>
                                                <option value='Malawi'>Malawi</option>
                                                <option value='Malaysia'>Malaysia</option>
                                                <option value='Maldives'>Maldives</option>
                                                <option value='Mali'>Mali</option>
                                                <option value='Malta'>Malta</option>
                                                <option value='Marshall Islands'>Marshall Islands</option>
                                                <option value='Martinique'>Martinique</option>
                                                <option value='Mauritania'>Mauritania</option>
                                                <option value='Mauritius'>Mauritius</option>
                                                <option value='Mayotte'>Mayotte</option>
                                                <option value='Mexico'>Mexico</option>
                                                <option value='Micronesia, Federated States of'>
                                                    Micronesia, Federated States of
                                                </option>
                                                <option value='Moldova, Republic of'>Moldova, Republic of</option>
                                                <option value='Monaco'>Monaco</option>
                                                <option value='Mongolia'>Mongolia</option>
                                                <option value='Montenegro'>Montenegro</option>
                                                <option value='Montserrat'>Montserrat</option>
                                                <option value='Morocco'>Morocco</option>
                                                <option value='Mozambique'>Mozambique</option>
                                                <option value='Myanmar'>Myanmar</option>
                                                <option value='Namibia'>Namibia</option>
                                                <option value='Nauru'>Nauru</option>
                                                <option value='Nepal'>Nepal</option>
                                                <option value='Netherlands'>Netherlands</option>
                                                <option value='Netherlands Antilles'>Netherlands Antilles</option>
                                                <option value='New Caledonia'>New Caledonia</option>
                                                <option value='New Zealand'>New Zealand</option>
                                                <option value='Nicaragua'>Nicaragua</option>
                                                <option value='Niger'>Niger</option>
                                                <option value='Nigeria'>Nigeria</option>
                                                <option value='Niue'>Niue</option>
                                                <option value='Norfolk Island'>Norfolk Island</option>
                                                <option value='Northern Mariana Islands'>
                                                    Northern Mariana Islands
                                                </option>
                                                <option value='Norway'>Norway</option>
                                                <option value='Oman'>Oman</option>
                                                <option value='Pakistan'>Pakistan</option>
                                                <option value='Palau'>Palau</option>
                                                <option value='Palestinian Territory, Occupied'>
                                                    Palestinian Territory, Occupied
                                                </option>
                                                <option value='Panama'>Panama</option>
                                                <option value='Papua New Guinea'>Papua New Guinea</option>
                                                <option value='Paraguay'>Paraguay</option>
                                                <option value='Peru'>Peru</option>
                                                <option value='Philippines'>Philippines</option>
                                                <option value='Pitcairn'>Pitcairn</option>
                                                <option value='Poland'>Poland</option>
                                                <option value='Portugal'>Portugal</option>
                                                <option value='Puerto Rico'>Puerto Rico</option>
                                                <option value='Qatar'>Qatar</option>
                                                <option value='Reunion'>Reunion</option>
                                                <option value='Romania'>Romania</option>
                                                <option value='Russian Federation'>Russian Federation</option>
                                                <option value='Rwanda'>Rwanda</option>
                                                <option value='Saint Helena'>Saint Helena</option>
                                                <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                                                <option value='Saint Lucia'>Saint Lucia</option>
                                                <option value='Saint Pierre and Miquelon'>
                                                    Saint Pierre and Miquelon
                                                </option>
                                                <option value='Saint Vincent and The Grenadines'>
                                                    Saint Vincent and The Grenadines
                                                </option>
                                                <option value='Samoa'>Samoa</option>
                                                <option value='San Marino'>San Marino</option>
                                                <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                                                <option value='Saudi Arabia'>Saudi Arabia</option>
                                                <option value='Senegal'>Senegal</option>
                                                <option value='Serbia'>Serbia</option>
                                                <option value='Seychelles'>Seychelles</option>
                                                <option value='Sierra Leone'>Sierra Leone</option>
                                                <option value='Singapore'>Singapore</option>
                                                <option value='Slovakia'>Slovakia</option>
                                                <option value='Slovenia'>Slovenia</option>
                                                <option value='Solomon Islands'>Solomon Islands</option>
                                                <option value='Somalia'>Somalia</option>
                                                <option value='South Africa'>South Africa</option>
                                                <option value='South Georgia and The South Sandwich Islands'>
                                                    South Georgia and The South Sandwich Islands
                                                </option>
                                                <option value='Spain'>Spain</option>
                                                <option value='Sri Lanka'>Sri Lanka</option>
                                                <option value='Sudan'>Sudan</option>
                                                <option value='Suriname'>Suriname</option>
                                                <option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option>
                                                <option value='Swaziland'>Swaziland</option>
                                                <option value='Sweden'>Sweden</option>
                                                <option value='Switzerland'>Switzerland</option>
                                                <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                                                <option value='Taiwan, Province of China'>
                                                    Taiwan, Province of China
                                                </option>
                                                <option value='Tajikistan'>Tajikistan</option>
                                                <option value='Tanzania, United Republic of'>
                                                    Tanzania, United Republic of
                                                </option>
                                                <option value='Thailand'>Thailand</option>
                                                <option value='Timor-leste'>Timor-leste</option>
                                                <option value='Togo'>Togo</option>
                                                <option value='Tokelau'>Tokelau</option>
                                                <option value='Tonga'>Tonga</option>
                                                <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                                                <option value='Tunisia'>Tunisia</option>
                                                <option value='Turkey'>Turkey</option>
                                                <option value='Turkmenistan'>Turkmenistan</option>
                                                <option value='Turks and Caicos Islands'>
                                                    Turks and Caicos Islands
                                                </option>
                                                <option value='Tuvalu'>Tuvalu</option>
                                                <option value='Uganda'>Uganda</option>
                                                <option value='Ukraine'>Ukraine</option>
                                                <option value='United Arab Emirates'>United Arab Emirates</option>
                                                <option value='United Kingdom'>United Kingdom</option>
                                                <option value='United States'>United States</option>
                                                <option value='United States Minor Outlying Islands'>
                                                    United States Minor Outlying Islands
                                                </option>
                                                <option value='Uruguay'>Uruguay</option>
                                                <option value='Uzbekistan'>Uzbekistan</option>
                                                <option value='Vanuatu'>Vanuatu</option>
                                                <option value='Venezuela'>Venezuela</option>
                                                <option value='Viet Nam'>Viet Nam</option>
                                                <option value='Virgin Islands, British'>Virgin Islands, British</option>
                                                <option value='Virgin Islands, U.S.'>Virgin Islands, U.S.</option>
                                                <option value='Wallis and Futuna'>Wallis and Futuna</option>
                                                <option value='Western Sahara'>Western Sahara</option>
                                                <option value='Yemen'>Yemen</option>
                                                <option value='Zambia'>Zambia</option>
                                                <option value='Zimbabwe'>Zimbabwe</option>
                                            </select>
                                            {errors.country && <i className='text-danger'>Quốc gia là bắt buộc</i>}
                                        </div>
                                        <div className='form-group col-xl-12'>
                                            <label>
                                                Địa chỉ nhận hàng <span className='text-danger'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Địa chỉ....'
                                                className='form-control'
                                                {...register('adress', { required: true })}
                                            />
                                            {errors.adress && (
                                                <i className='text-danger'>Địa chỉ nhận hàng là bắt buộc</i>
                                            )}
                                        </div>

                                        <div className='form-group col-xl-12'>
                                            <label>
                                                Thị trấn/Thành phố <span className='text-danger'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Thị trấn/Thành phố..'
                                                className='form-control'
                                                {...register('city', { required: true })}
                                            />
                                            {errors.city && (
                                                <i className='text-danger'>Thị trấn/Thành phố là bắt buộc</i>
                                            )}
                                        </div>
                                        <div className='form-group col-xl-6'>
                                            <label>
                                                Số điện thoại <span className='text-danger'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Số điện thoại'
                                                className='form-control'
                                                {...register('phone', { required: true })}
                                            />
                                            {errors.phone && <i className='text-danger'>Số điện thoại là bắt buộc</i>}
                                        </div>
                                        <div className='form-group col-xl-6'>
                                            <label>
                                                Email <span className='text-danger'>*</span>
                                            </label>
                                            <input
                                                type='email'
                                                placeholder='Email'
                                                className='form-control'
                                                {...register('email', { required: true })}
                                            />
                                            {errors.email && <i className='text-danger'>Email là bắt buộc</i>}
                                        </div>
                                        <div className='form-group col-xl-12 mb-0'>
                                            <label>Ghi chú đặt hàng</label>
                                            <textarea
                                                rows={5}
                                                className='form-control'
                                                placeholder='Ghi chú đặt hàng ( Tùy chọn )'
                                                {...register('note', { required: false })}
                                            ></textarea>
                                            {errors.note && <i className='text-danger'>Ghi chú là bắt buộc</i>}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-5 checkout-billing'>
                                    <table className='sigma_responsive-table'>
                                        <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Tổng cộng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td data-title='Product'>
                                                    <div className='sigma_cart-product-wrapper'>
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                {' '}
                                                                <a href='#'>Rubber Bone</a>{' '}
                                                            </h6>
                                                            <p>1 Piece</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title='Quantity'>x1</td>
                                                <td data-title='Total'>
                                                    {' '}
                                                    <strong>23.99$</strong>{' '}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td data-title='Product'>
                                                    <div className='sigma_cart-product-wrapper'>
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                {' '}
                                                                <a href='#'>Organic Food</a>{' '}
                                                            </h6>
                                                            <p>2 Piece</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title='Quantity'>x1</td>
                                                <td data-title='Total'>
                                                    {' '}
                                                    <strong>9.99$</strong>{' '}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td data-title='Product'>
                                                    <div className='sigma_cart-product-wrapper'>
                                                        <div className='sigma_cart-product-body'>
                                                            <h6>
                                                                {' '}
                                                                <a href='#'>Mouse bell</a>{' '}
                                                            </h6>
                                                            <p>3 Piece</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title='Quantity'>x2</td>
                                                <td data-title='Total'>
                                                    {' '}
                                                    <strong>13.99$</strong>{' '}
                                                </td>
                                            </tr>
                                            <tr className='total'>
                                                <td>
                                                    <h6 className='mb-0'>Grand Total</h6>
                                                </td>
                                                <td></td>
                                                <td>
                                                    {' '}
                                                    <strong>56.99$</strong>{' '}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <button type='submit' className='sigma_btn-custom primary d-block w-100 btn'>
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default PaymentInformationPage
