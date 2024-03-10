import FooterTemplate from '@/components/component/Footer'
import instance from '@/services/core/api'
import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const { Content, Sider } = Layout
type Props = {}
const MyVoucher = (_props: Props) => {
    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])
    const [dataMyVoucher, setdataMyVoucher] = useState<any[]>([])
    console.log('🚀 ~ MyVoucher ~ dataMyVoucher:', dataMyVoucher)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/my_voucher/user/' + userID)
                const dataPro = response.data?.datas || []

                // Sort products by createdAt (newest to oldest)
                dataPro.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

                const formattedData = dataPro.map((item: any, index: any) => ({
                    ...item,
                    key: index + 1
                }))
                setdataMyVoucher(formattedData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [userID])
    return (
        <>
            <div>
                <Content style={{ padding: '10px 0px' }}>
                    <Layout style={{ padding: '0px 0' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <main className=' gap-5 p-8'>
                                <h1 style={{ fontSize: '30px' }}>Danh sách voucher của tôi</h1>

                                <div
                                    className=''
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gridGap: '50px',
                                        marginTop: '40px'
                                    }}
                                >
                                    {dataMyVoucher.map((item) => (
                                        <div
                                            className=''
                                            style={{
                                                width: '600px',
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                border: '1px solid #FFCC99	',
                                                padding: '10px 0',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            <div className='image'>
                                                <img
                                                    src='https://www.veggiepatch.com.au/wp-content/uploads/2017/06/Gift-Voucher-1.png'
                                                    alt='anh'
                                                    width={200}
                                                />
                                            </div>
                                            <div className='info' style={{}}>
                                                <i style={{ fontSize: '20px', color: 'black' }}>
                                                    {' '}
                                                    {item?.voucher?.name}
                                                </i>
                                                <p
                                                    style={{
                                                        padding: '5px 5px',
                                                        border: '1px solid red',
                                                        color: 'red',
                                                        width: '110px',
                                                        borderRadius: '3px',
                                                        margin: '3px 0'
                                                    }}
                                                >
                                                    Chỉ có trên web
                                                </p>
                                                <h3
                                                    style={{
                                                        color: 'black',
                                                        margin: '5px 0',
                                                        fontSize: '18px'
                                                    }}
                                                >
                                                    Lượt sử dụng:{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontSize: '19px',
                                                            fontWeight: '700'
                                                        }}
                                                    >
                                                        {item?.quantity}
                                                    </span>
                                                </h3>
                                                <h3
                                                    style={{
                                                        color: 'gray',
                                                        fontSize: '18px'
                                                    }}
                                                >
                                                    ⏱️ HSD: <u>{item?.voucher?.expiry}</u>
                                                </h3>
                                            </div>
                                            <div>
                                                <Link to={`/products`}>
                                                    <button type='submit' className='btn btn-warning'>
                                                        Dùng sau
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
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

export default MyVoucher
