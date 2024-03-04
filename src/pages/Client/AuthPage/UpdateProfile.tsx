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
    console.log(userID)
    // const { id } = useParams()
    // console.log(id)
    const { data }: any = useAuthQuery(userID)
    console.log(data)
    return (
        <>
            <div>
                <Content style={{ padding: '10px 0px' }}>
                    <Layout style={{ padding: '0px 0' }}>
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
