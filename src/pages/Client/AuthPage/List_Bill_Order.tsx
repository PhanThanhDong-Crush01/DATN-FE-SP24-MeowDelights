import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { formatPriceBootstrap } from '@/lib/utils'
import { getBillOfUser } from '@/services/bill'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useState } from 'react'

interface DataType {
    key: string
    _id: string
    iduser: string
    money: number
    totalQuantity: number
    date: string
    adress: string
    tel: number
    idvc: string
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
    user: {
        name: string
        email: string
    }
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Người nhận hàng',
        dataIndex: 'user',
        key: 'user',
        render: (user) => (
            <div style={{ color: 'blue' }}>
                <a>{user?.name}</a> <br /> <a>{user?.email}</a>
            </div>
        )
    },
    {
        title: 'Sđt',
        dataIndex: 'tel',
        key: 'tel'
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'adress',
        key: 'adress'
    },
    {
        title: 'Tổng số sp',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity'
    },
    {
        title: 'Thành tiền',
        dataIndex: 'money',
        key: 'money',
        render: (_, record) => (
            <>
                <span
                    dangerouslySetInnerHTML={{
                        __html: formatPriceBootstrap(record.money)
                    }}
                ></span>
            </>
        )
    },
    {
        title: 'PTTT',
        dataIndex: 'paymentmethods',
        key: 'paymentmethods',
        render: (_, record) => (
            <>
                <h1 style={{ fontSize: '18px' }}>{record.paymentmethods}</h1>
                <span style={{ color: 'blue' }}>{record.paymentstatus}</span>
            </>
        )
    },
    {
        title: 'Đơn hàng',
        dataIndex: 'orderstatus',
        key: 'orderstatus',
        render: (_, record) => (
            <>
                <span
                    style={{
                        color: 'white',
                        backgroundColor: 'red',
                        padding: '8px',
                        borderRadius: '10px',
                        display: 'inline-block'
                    }}
                >
                    {record.orderstatus}
                </span>
            </>
        )
    }
]

const ID_USER = '65b9451b0bbb2b6e014e5588'

const List_Bill_Order = () => {
    const [bill, setBill] = useState()
    useEffect(() => {
        const fetchBill = async () => {
            const data = await getBillOfUser(ID_USER)
            setBill(
                data?.bill.map((item: any) => {
                    return { ...item, key: item._id }
                })
            )
        }
        fetchBill()
    }, [])
    return (
        <>
            <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-9'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Search...' value='' />
                        <button type='submit' className='btn search-btn'>
                            <i className='fal fa-search m-0'></i>
                        </button>
                    </form>
                </div>

                <div className='sigma_subheader style-5 bg-gray'>
                    <div className='container'>
                        <div className='sigma_subheader-inner'>
                            <h1>Danh sách đơn hàng</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Đơn hàng
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='container' style={{ textAlign: 'center', fontSize: '40px', margin: '30px 0' }}>
                    <h1>Danh sách đơn hàng của bạn</h1>

                    <Table columns={columns} dataSource={bill} style={{ marginLeft: '60px' }} />
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}

export default List_Bill_Order
