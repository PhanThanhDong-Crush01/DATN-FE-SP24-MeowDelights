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
import { useEffect, useState } from 'react'
const { Content, Sider } = Layout
type Props = {}
const UpdateProfile = (_props: Props) => {
    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])
    console.log(userID)
    // const { id } = useParams()
    // console.log(id)
    const { data }: any = useAuthQuery(userID)
    console.log(data)
    return (
        <>
            <div>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div>
                        <div className='border-b border-gray-300 flex flex-row gap-96  pb-2'>
                            <p className='text-2xl font-sans pb-3'>Hồ sơ của tôi</p>
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
                                                label: <Link to='/updateProfile/76873928409-'>Hồ sơ của tôi</Link>
                                            },
                                            {
                                                key: '2',
                                                icon: <AiOutlineAntDesign />,
                                                label: <Link to='/order'>Đơn mua</Link>
                                            },
                                            {
                                                key: '3',
                                                icon: <AiOutlineAccountBook />,
                                                label: <Link to='/products'>Thông báo</Link>
                                            },
                                            {
                                                key: '4',
                                                icon: <AiOutlineAim />,
                                                label: <Link to='/products'>Kho voucher</Link>
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

                                        <div
                                            className='flex'
                                            style={{ justifyContent: 'space-evenly', alignItems: 'center' }}
                                        >
                                            <div style={{ width: '45%' }}>
                                                <ImgUserForm data={data} />

                                                <NameForm data={data} />

                                                <PhoneForm data={data} />

                                                <EmailForm data={data} />
                                            </div>
                                            <div style={{ width: '45%' }}>
                                                <AgeForm data={data} />
                                                <GenderForm data={data} />
                                                <AddressForm data={data} />
                                                <AddressForm data={data} /> đổi mật khẩu
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </Content>
                        </Layout>
                    </Content>
                </Content>
                <FooterTemplate />
            </div>
        </>
    )
}

export default UpdateProfile
