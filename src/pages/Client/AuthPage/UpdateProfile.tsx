import { Layout, Menu } from 'antd'
import FooterTemplate from '@/components/component/Footer'
import { Link } from 'react-router-dom'
import { AiOutlineAccountBook, AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import NameForm from '../../../components/User/Name'
import ImgUserForm from '@/components/User/Img'
import EmailForm from '@/components/User/Email'
import PhoneForm from '@/components/User/Phone'
import AddressForm from '@/components/User/Address'
import AgeForm from '@/components/User/Age'
import GenderForm from '@/components/User/Gender'
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
    const { data }: any = useAuthQuery(userID)
    return (
        <>
            <div>
                <Content style={{ padding: '0px 0px' }}>
                    <Layout style={{ padding: '0px 0' }}>
                        <Content style={{ padding: '0 24px' }}>
                            <main className=' gap-5 p-8' style={{}}>
                                <div className='border-b border-gray-300  pb-2'>
                                    <p className='text-2xl font-sans pb-3'>Hồ sơ của tôi</p>
                                </div>

                                <div className='flex gap-2' style={{}}>
                                    <div style={{ width: '45%' }}>
                                        <ImgUserForm data={data} />

                                        <NameForm data={data} />

                                        <PhoneForm data={data} />

                                        <EmailForm data={data} />
                                    </div>
                                    <div style={{ width: '45%' }}>
                                        <EmailForm data={data} />
                                        <AgeForm data={data} />
                                        <GenderForm data={data} />
                                        <AddressForm data={data} />
                                        {/* <AddressForm data={data} /> đổi mật khẩu */}
                                    </div>
                                </div>
                            </main>
                        </Content>
                    </Layout>
                </Content>
            </div>
        </>
    )
}

export default UpdateProfile
