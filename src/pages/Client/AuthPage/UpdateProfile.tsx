import { Layout, Menu } from 'antd'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import FooterTemplate from '@/components/component/Footer'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineAccountBook, AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import NameForm from '../../../components/User/Name'
import ImgUserForm from '@/components/User/Img'
import EmailForm from '@/components/User/Email'
import PhoneForm from '@/components/User/Phone'
import AddressForm from '@/components/User/Address'
import AgeForm from '@/components/User/Age'
import GenderForm from '@/components/User/Gender'
import SigninPage from './SigninPage'
const { Content, Sider } = Layout
type Props = {}
const UpdateProfile = (_props: Props) => {
    const { id } = useParams()
    console.log(id)
    const { data } = useAuthQuery(id)
    console.log(data)
    return (
        <>
            <div>
                <MenuClientComponent />
                <div className='sigma_subheader style-5 bg-gray '>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>Trang quản lý hồ sơ</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Trang quản lý hồ sơ
                            </li>
                        </ol>
                    </div>

                    <img src='/src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='/src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='/src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <Content style={{ padding: '10px 0px' }}>
                    <Layout style={{ padding: '0px 0' }}>
                        <Sider theme='light' trigger={null} collapsible>
                            <div className='demo-logo-vertical'>
                                <Menu
                                    theme='light'
                                    mode='inline'
                                    defaultSelectedKeys={['1']}
                                    items={[
                                        {
                                            key: '1',
                                            icon: <AiOutlineUser />,
                                            label: <Link to='/'>Hồ sơ của tôi</Link>
                                        },
                                        {
                                            key: '2',
                                            icon: <AiOutlineAntDesign />,
                                            label: <Link to='/order'>Đơn mua</Link>
                                        },
                                        {
                                            key: '3',
                                            icon: <AiOutlineAccountBook />,
                                            label: <Link to='/admin/product'>Thông báo</Link>
                                        },
                                        {
                                            key: '4',
                                            icon: <AiOutlineAim />,
                                            label: <Link to='/admin/product'>Kho voucher</Link>
                                        }
                                    ]}
                                />
                            </div>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <main className=' gap-5 p-8'>
                                <div>
                                    <div className='border-b border-gray-300 flex flex-row gap-96  pb-2'>
                                        <p className='text-2xl font-sans pb-3'>Hồ sơ của tôi</p>
                                    </div>

                                    <div className='flex flex-col gap-20 py-5'>
                                        <div>
                                            <ImgUserForm data={data} />
                                        </div>
                                        <div>
                                            <NameForm data={data} />
                                        </div>
                                        <div>
                                            <EmailForm data={data} />
                                        </div>
                                        <div>
                                            <PhoneForm data={data} />
                                        </div>
                                        <div>
                                            <AddressForm data={data} />
                                        </div>
                                        <div>
                                            <AgeForm data={data} />
                                        </div>
                                        <div>
                                            <GenderForm data={data} />
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </Content>
                    </Layout>
                </Content>
                <FooterTemplate />
            </div>
        </>
    )
}

export default UpdateProfile
