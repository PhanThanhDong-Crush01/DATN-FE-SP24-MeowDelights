import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { toast } from '@/components/ui/use-toast'
import { useBillMutation } from '@/hooks/Bill/useBillMutation'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import moment from 'moment' // Import Moment.js
import 'moment/locale/vi'
import moment from 'moment'

const ID_USER = '65b9451b0bbb2b6e014e5588'

moment.locale('vi')
const PaymentMoMo = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-9'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Search...' value='' />
                        <button type='submit' className='btn search-btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form>
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>Thanh toán MoMo</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                MoMo
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section section-padding'>
                    <div className='container'>
                        <h1 style={{ fontSize: '50px' }}>Chức năng đang phát tiển</h1>
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default PaymentMoMo
