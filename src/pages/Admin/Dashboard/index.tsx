import { formatPriceBootstrap } from '@/lib/utils'
import instance from '@/services/core/api'
import { thong_ke_doanh_thu, thong_ke_doanh_thu_thang_trong_nam, thong_ke_top_10_product } from '@/services/thongke'
import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const Dashboard = () => {
    const [thongke, setThongKe] = useState<any>()
    const [startDate, setSartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [year, setYear] = useState<any>(2024)
    const setLaiNam = (year: any) => {
        setEndDate(null)
        setSartDate(null)
        setYear(2024)
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                let thongkedata: any
                if (startDate != null && endDate != null) {
                    const resthongKeNgay = await thong_ke_doanh_thu(startDate, endDate)
                    thongkedata = resthongKeNgay
                } else {
                    const response = await thong_ke_doanh_thu_thang_trong_nam(year) // Chắc chắn rằng hàm thong_ke_doanh_thu_thang_trong_nam đã được định nghĩa trước đó
                    thongkedata = response
                }
                const data = [['Tháng', 'Tổng', 'Phụ kiện - đồ chơi', 'Đồ ăn - đồ uống']]
                for (const key in thongkedata?.revenueData) {
                    let dayMonth = key.split('-').slice(1).join('-') // Lấy phần tháng và ngày (VD: từ "2024-03-10" lấy "03-10")

                    const monthData = thongkedata?.revenueData[key]
                    const totalRevenue = monthData.totalRevenue || 0
                    let accessoryRevenue = 0
                    let foodRevenue = 0

                    // Tính tổng doanh thu từ các danh mục
                    for (const categoryId in monthData.categories) {
                        const category = monthData.categories[categoryId]
                        if (category.name === 'Phụ kiện - đồ chơi') {
                            accessoryRevenue += category.totalRevenue
                        } else if (category.name === 'Đồ ăn - đồ uống') {
                            foodRevenue += category.totalRevenue
                        }
                    }

                    data.push([dayMonth, totalRevenue, accessoryRevenue, foodRevenue])
                }

                setThongKe(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetch()
    }, [startDate, endDate, year])

    const [top10Product, setTop10] = useState<any>()
    useEffect(() => {
        const fetch = async () => {
            const res = await thong_ke_top_10_product()
            setTop10(res.data)
        }
        fetch()
    }, [])

    return (
        <div className='main-panel'>
            <div className='content-wrapper'>
                <div className='row'>
                    <div className='col-md-12 grid-margin'>
                        <div className='row'>
                            <div className='col-12 col-xl-8 mb-4 mb-xl-0'>
                                <h3 className='font-weight-bold' style={{ fontSize: '25px' }}>
                                    Thống kê:
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{ width: '40%', marginTop: '10px' }}>
                        <h2 style={{ fontSize: '20px' }}>Lọc thống kê theo ngày:</h2>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <p>Từ</p>
                            <Input
                                type='date'
                                onChange={(e) => setSartDate(e.target.value)}
                                name='startDate'
                                style={{ width: '150px' }}
                            />
                            <p>Đến</p>
                            <Input
                                type='date'
                                onChange={(e) => setEndDate(e.target.value)}
                                name='endDate'
                                style={{ width: '150px' }}
                            />
                            <p>Hoặc</p>
                            <Button onClick={() => setLaiNam(2024)}>Năm 2024</Button>
                        </div>
                    </div>
                    <Chart
                        width={'auto'}
                        height={'500px'}
                        chartType='ColumnChart'
                        loader={<div>Loading Chart...</div>}
                        data={thongke}
                        options={{
                            title: 'Company Performance',
                            chartArea: { width: '100px' },
                            hAxis: {
                                title: 'Năm',
                                minValue: 0
                            },
                            vAxis: {
                                title: 'Tiền'
                            }
                        }}
                        legendToggle
                    />
                </div>
                <div className='row'>
                    <div className='col-md-5 grid-margin stretch-card'>
                        <div className='card position-relative'>
                            <div className='card-body'>
                                <div
                                    id='detailedReports'
                                    className='carousel slide detailed-report-carousel position-static pt-2'
                                    data-ride='carousel'
                                >
                                    <div className='carousel-inner'>
                                        <div className='carousel-item active'>
                                            <div className='row'>
                                                <div className='col-md-12 col-xl-6 d-flex flex-column justify-content-start'>
                                                    <div className='ml-xl-4 mt-3'>
                                                        <p className='card-title'>Detailed Reports</p>
                                                        <h1 className='text-primary'>$34040</h1>
                                                        <h3 className='font-weight-500 mb-xl-4 text-primary'>
                                                            North America
                                                        </h3>
                                                        <p className='mb-2 mb-xl-0'>
                                                            The total number of sessions within the date range. It is
                                                            the period time a user is actively engaged with your
                                                            website, page or app, etc
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='col-md-5 col-xl-9'>
                                                    <Chart
                                                        width={'500px'}
                                                        height={'300px'}
                                                        chartType='PieChart'
                                                        loader={<div>Loading Chart...</div>}
                                                        data={[
                                                            ['Task', 'Hours per Day'],
                                                            ['Work', 11],
                                                            ['Eat', 2],
                                                            ['Commute', 2],
                                                            ['Watch TV', 2],
                                                            ['Sleep', 7]
                                                        ]}
                                                        options={{
                                                            title: 'My Daily Activities',
                                                            pieHole: 0.4
                                                        }}
                                                        rootProps={{ 'data-testid': '1' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        className='carousel-control-prev'
                                        href='#detailedReports'
                                        role='button'
                                        data-slide='prev'
                                    >
                                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                                        <span className='sr-only'>Previous</span>
                                    </a>
                                    <a
                                        className='carousel-control-next'
                                        href='#detailedReports'
                                        role='button'
                                        data-slide='next'
                                    >
                                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                                        <span className='sr-only'>Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 grid-margin stretch-card'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className='card-title mb-0'>Top Sản Phẩm</p>
                                <div className='table-responsive'>
                                    <table className='table table-striped table-borderless text-left'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Sản phẩm</th>
                                                <th>Bán được</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {top10Product &&
                                                top10Product.map((item: any, index: number) => (
                                                    <tr key={item?._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.name}</td>
                                                        <td
                                                            className='font-weight-bold'
                                                            style={{ fontWeight: 700 }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatPriceBootstrap(item?.totalRevenue)
                                                            }}
                                                        ></td>
                                                        <td className='font-weight-medium'>
                                                            {item?.status ? (
                                                                <div className='badge badge-success'>Còn hàng</div>
                                                            ) : (
                                                                <div className='badge badge-danger'>Hết hàng</div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
