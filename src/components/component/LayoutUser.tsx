import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Layout, { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { AiOutlineAccountBook, AiOutlineAim, AiOutlineAntDesign, AiOutlineUser } from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom'
import { Avatar, Flex, Segmented } from 'antd'
import { EditOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
const LayoutUserPage = () => {
    const [user, setUser] = useState<string | null>(null)
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUser(storedUserID)
        }
    }, [])
    console.log(user)
    const { data } = useAuthQuery(user || '')
    console.log(data)
    return (
        <Content style={{ padding: '10px 0px' }}>
            <Layout style={{ padding: '0px 0' }}>
                <Sider theme='light' trigger={null} collapsible>
                    <div className='demo-logo-vertical flex flex-row gap-3 pb-5' style={{ padding: '10px 25px' }}>
                        {/* <Segmented
                            style={{ padding: '10px 40px' }}
                            options={[
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 10,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                display: 'flex',
                                                gap: 20
                                            }}
                                        > */}
                        <img
                            className='rounded-3xl '
                            style={{ borderColor: '#87d068', height: 50, width: 50 }}
                            src={data?.datas?.imgUser}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 10
                            }}
                        >
                            <p className='text-lg font-bold'>{data?.datas?.name}</p>
                            <p className=' flex flex-row gap-2'>
                                <EditOutlined />
                                <Link to={`/updateProfile`}> Sửa hồ sơ </Link>
                            </p>
                        </div>
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
                                label: <Link to='/admin/product'>Kho voucher</Link>
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
    )
}

export default LayoutUserPage
