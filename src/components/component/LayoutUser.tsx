import { Image, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Layout, { Content } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom'
import { EditOutlined, MessageOutlined } from '@ant-design/icons'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import MenuClientComponent from './MenuClientComponent'
const LayoutUserPage = () => {
    const [user, setUser] = useState<string | null>(null)
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUser(storedUserID)
        }
    }, [])
    const { data } = useAuthQuery(user || '')
    return (
        <>
            <MenuClientComponent />
            <Content style={{ padding: '10px 0px' }}>
                <Layout style={{ padding: '0px 0' }}>
                    <Sider theme='light' trigger={null} collapsible>
                        <div className='demo-logo-vertical pb-5' style={{ padding: '10px 25px', textAlign: 'center' }}>
                            <Image
                                className='rounded-5xl'
                                style={{ borderColor: '#87d068', height: 50, width: 50, margin: '0 auto' }}
                                src={data?.datas?.imgUser}
                            />
                            <p className='font-bold w-[100%]' style={{ fontSize: '17px' }}>
                                {data?.datas?.name}
                            </p>
                            <button className='btn' style={{ fontSize: '10px' }}>
                                <EditOutlined />
                                <Link to={`/updateProfile`}> Sửa hồ sơ </Link>
                            </button>
                        </div>
                        <Menu
                            theme='light'
                            mode='inline'
                            defaultSelectedKeys={['1']}
                            style={{ fontSize: 15 }}
                            items={[
                                {
                                    key: '1',
                                    icon: <AiOutlineUser />,
                                    label: <Link to='/updateProfile'>Hồ sơ của tôi</Link>
                                },
                                {
                                    key: '2',
                                    icon: <AiOutlineAntDesign style={{ borderColor: '' }} />,
                                    label: <Link to='/order'>Đơn mua</Link>
                                },
                                {
                                    key: '3',
                                    icon: <AiOutlineAim />,
                                    label: <Link to='/my_voucher'>Kho voucher</Link>
                                },
                                {
                                    key: '4',
                                    icon: <MessageOutlined />,
                                    label: <Link to='/admin/product'>Thông báo</Link>
                                }
                            ]}
                        />
                    </Sider>

                    <Outlet />
                </Layout>
            </Content>
        </>
    )
}

export default LayoutUserPage
