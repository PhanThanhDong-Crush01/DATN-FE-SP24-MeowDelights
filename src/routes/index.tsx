import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import Dashboard from '@/pages/Admin/Dashboard'
import ListBill from '@/pages/Admin/ListBill'
import BillDetail from '@/pages/Admin/ListBill/BillDetail'
import ListCategory from '@/pages/Admin/Category'
import ListTypeVoucher from '@/pages/Admin/ListTypeVoucher'
import SigninPage from '@/pages/Client/AuthPage/SigninPage'
import SignupPage from '@/pages/Client/AuthPage/SignupPage'
import CartPage from '@/pages/Client/CartPage'
import ContactPage from '@/pages/Client/ContactPage'
import HomePage from '@/pages/Client/HomPage'
import IntroducePage from '@/pages/Client/IntroducePage'
import PaymentInformationPage from '@/pages/Client/PaymentInformationPage'
import PaymentSuccessPage from '@/pages/Client/PaymentSuccessPage'
import ProductDetailPage from '@/pages/Client/ProductDetailPage'
import ShopPage from '@/pages/Client/ShopPage'
import { Route, Routes } from 'react-router-dom'
import AddCategory from '@/pages/Admin/Category/AddCategory'
import EditCategory from '@/pages/Admin/Category/EditCategory'
import AddProduct from '@/pages/Admin/Products/Add/AddProduct'
import Voucher from '@/pages/Admin/ListVoucher'
import AddVoucher from '@/pages/Admin/ListVoucher/AddVoucher'
import PaymentMoMo from '@/pages/Client/PaymentSuccessPage/PaymentMoMo'
import List_Bill_Order from '@/pages/Client/AuthPage/List_Bill_Order'
import Product from '@/pages/Admin/Products'
import UpdateProfile from '@/pages/Client/AuthPage/UpdateProfile'
import OrderPage from '@/pages/Client/AuthPage/OrderPage'
// import Sales_at_the_counter from '@/pages/Admin/Sales-at-the-counter'
import ListContact from '@/pages/Admin/Contact'
import LayoutUserPage from '@/components/component/LayoutUser'
import EditVoucher from '@/pages/Admin/ListVoucher/EditVoucher'
import { SendOTP } from '@/components/component/SendOtp'
import ListUserPage from '@/pages/Admin/ListUser'
import EditUser from '@/pages/Admin/ListUser/EditRoleAuth'
import OrderDetailPage from '@/pages/Client/AuthPage/OrderDetail'
import MyVoucher from '@/pages/Client/AuthPage/MyVoucher'
import AddAuth from '@/pages/Admin/ListUser/AddAuth'
import EditAuth from '@/pages/Admin/ListUser/EditAuth'
import { useEffect, useState } from 'react'
import PaymentVNPayComponent from '@/pages/Client/PaymentSuccessPage/PaymentPayPal'
import ListAuthPage from '@/pages/Admin/ListUser/indexAuth'
import ListCommentPage from '@/pages/Admin/ListComment'

const Routers = () => {
    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])
    return (
        <Routes>
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='products' element={<ShopPage />} />
                <Route path='products/:id' element={<ProductDetailPage />} />
                <Route path='cart' element={<CartPage />} />

                <Route path='payment_information' element={<PaymentInformationPage />} />
                <Route path='payment_method_paypalcheckout' element={<PaymentVNPayComponent />} />
                <Route path='payment_success' element={<PaymentSuccessPage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='introduce' element={<IntroducePage />} />

                <Route path='bill_order' element={<List_Bill_Order />} />
                <Route path='check_order' element={<SendOTP />} />
            </Route>
            <Route path='signin' element={<SigninPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='/' element={<LayoutUserPage />}>
                <Route path='updateProfile' element={<UpdateProfile />} />
                <Route path='order' element={<OrderPage />} />
                <Route path='my_voucher' element={<MyVoucher />} />
                <Route path='order/order_detail/:id' element={<OrderDetailPage />} />
            </Route>
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='products' element={<Product />} />
                <Route path='comment' element={<ListCommentPage />} />
                <Route path='auth' element={<ListAuthPage />} />
                <Route path='user' element={<ListUserPage />} />
                <Route path='user/add' element={<AddAuth />} />
                <Route path='user/editAuth/:id' element={<EditAuth />} />
                <Route path='user/edit/:id' element={<EditUser />} />
                {/* <Route path='sales-at-the-counter' element={<Sales_at_the_counter />} /> */}
                {/* <Route path='products/:id/edit' element={<EditProduct />}/> */}
                <Route path='products/add' element={<AddProduct />} />
                <Route path='categories' element={<ListCategory />} />
                <Route path='categories/edit/:id' element={<EditCategory />} />
                <Route path='categories/add' element={<AddCategory />} />
                <Route path='voucher' element={<Voucher />} />
                <Route path='voucher/edit/:id' element={<EditVoucher />} />
                <Route path='voucher/add' element={<AddVoucher />} />
                <Route path='type_voucher' element={<ListTypeVoucher />} />
                <Route path='bill' element={<ListBill />} />
                <Route path='bill/:id' element={<BillDetail />} />
                <Route path='contact' element={<ListContact />} />
            </Route>
            <Route path='*' element={'Page Not Found'} />
        </Routes>
    )
}

export default Routers
