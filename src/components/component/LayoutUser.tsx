import { Avatar, Button, Image, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom'
import { EditOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined } from '@ant-design/icons'
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
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <>
            <MenuClientComponent />

            <Layout style={{ padding: '8px 0' }} className='h-max'>
                <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className=''>
                    <div className='demo-logo-vertical ' style={{ padding: '10px 25px', textAlign: 'center' }}>
                        <Avatar
                            className='rounded-5xl'
                            style={{ borderColor: '#87d068', height: 50, width: 50, margin: '0 auto' }}
                            src={data?.datas?.imgUser}
                        />
                        <p className='font-bold w-[100%]' style={{ fontSize: '17px' }}>
                            {data?.datas?.name}
                        </p>

                        <Menu mode='inline' defaultSelectedKeys={['1']}>
                            <Menu.Item key='1' icon={<EditOutlined />}>
                                <Link to='/updateProfile'>Sửa hồ sơ</Link>
                            </Menu.Item>
                        </Menu>
                    </div>

                    <Menu theme='light' mode='vertical' defaultSelectedKeys={['2']}>
                        <Menu.Item key='2' icon={<AiOutlineUser />}>
                            <Link to='/updateProfile'>Hồ sơ của tôi</Link>
                        </Menu.Item>
                        <Menu.Item key='3' icon={<AiOutlineAntDesign style={{ borderColor: '' }} />}>
                            <Link to='/order'>Đơn mua</Link>
                        </Menu.Item>
                        <Menu.Item key='4' icon={<AiOutlineAim />}>
                            <Link to='/my_voucher'>Kho voucher</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ padding: 0, background: '#fafafa' }}>
                        <Button
                            type='text'
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 40,
                                height: 44,
                                marginLeft: 5,
                                background: '#fff'
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '0px 16px',
                            // padding: 24,
                            minHeight: 700
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutUserPage
