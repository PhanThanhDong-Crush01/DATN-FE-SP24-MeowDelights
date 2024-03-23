import React, { Fragment, useEffect, useState } from 'react'
import { FaRegChartBar } from 'react-icons/fa6'
import { LiaProductHunt } from 'react-icons/lia'
import { MdOutlineCategory } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { MdOutlineSettingsPhone } from 'react-icons/md'
import { MdPowerSettingsNew } from 'react-icons/md'
import { AiOutlineComment } from 'react-icons/ai'
import { Layout, Menu, Button, theme } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import { toast } from '@/components/ui/use-toast'

const { Header, Sider, Content } = Layout

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()

    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])

    const { data }: any = useAuthQuery(userID)

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('userID')
        localStorage.removeItem('user')
        toast({
            variant: 'destructive',
            title: 'Bạn đã đăng xuất thành công!'
        })
        navigate('/signin')
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='demo-logo-vertical' />
                <Link to='/' style={{ width: '100%' }}>
                    <img
                        src='https://res.cloudinary.com/drwpkuqxv/image/upload/v1709051842/logo_meowdelights.jpg'
                        alt=''
                        style={{ borderRadius: 10, width: 50, margin: '0 auto' }}
                    />
                </Link>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1' icon={<FaRegChartBar />}>
                        <Link to='/admin'>Thống kê</Link>
                    </Menu.Item>
                    <Menu.Item key='6' icon={<FaRegMoneyBillAlt />}>
                        <Link to='/admin/bill'>Hóa đơn</Link>
                    </Menu.Item>
                    <Menu.Item key='2' icon={<LiaProductHunt />}>
                        <Link to='/admin/products'>Sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key='3' icon={<MdOutlineCategory />}>
                        <Link to='/admin/categories'>Danh mục</Link>
                    </Menu.Item>
                    <Menu.Item
                        key='4'
                        icon={
                            <img
                                src='https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748'
                                alt=''
                                style={{ width: '10px' }}
                            />
                        }
                    >
                        <Link to='/admin/voucher'>Khuyến mãi</Link>
                    </Menu.Item>
                    {/* <Menu.Item key='10' icon={<FaRegMoneyBillAlt />}>
                        <Link to='/admin/banner'>Banner và sự kiện</Link>
                    </Menu.Item> */}
                    <Menu.Item key='5' icon={<RiBillLine />}>
                        <Link to='/admin/type_voucher'>Loại khuyến mãi</Link>
                    </Menu.Item>

                    <Menu.Item key='7' icon={<AiOutlineComment />}>
                        <Link to='/admin/comment'>Đánh giá</Link>
                    </Menu.Item>
                    <Menu.Item key='8' icon={<MdOutlineSettingsPhone />}>
                        <Link to='/admin/contact'>Liên hệ</Link>
                    </Menu.Item>
                    <Menu.SubMenu key='9' icon={<MdOutlineAccountCircle />} title='Tài khoản'>
                        <Menu.Item key='1'>
                            <Link to='/admin/auth'>Tài khoản khách hàng</Link>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to='/admin/user'>Tài khoản nhân viên</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    {/* </Menu.Item> */}

                    <Menu.Item key='12' icon={<MdPowerSettingsNew style={{ color: 'red' }} />} onClick={handleLogout}>
                        Đăng xuất
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type='text'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 700,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
