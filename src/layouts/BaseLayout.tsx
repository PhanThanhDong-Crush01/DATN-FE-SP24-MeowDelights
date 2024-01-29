import FooterClientComponent from '@/components/component/FooterClientComponent'
import HeaderClientComponent from '@/components/component/HeaderClientComponent'
import { Outlet } from 'react-router-dom'
import '../assets/css/plugins/bootstrap.min.css'
import '../assets/css/plugins/slick.css'
import '../assets/css/plugins/ion.rangeSlider.min.css'
import '../assets/css/plugins/magnific-popup.css'
import '../assets/css/style.css'
import '../assets/fonts/flaticon/flaticon.css'
import '../assets/fonts/font-awesome.min.css'

const BaseLayout = () => {
    return (
        <div style={{ width: '100%' }}>
            <HeaderClientComponent />
            <main>
                <Outlet />
            </main>
            <FooterClientComponent />
            <script src='../assets/js/main.js'></script>
        </div>
    )
}

export default BaseLayout
