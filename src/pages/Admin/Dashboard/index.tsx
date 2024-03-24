import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { formatPriceBootstrap } from '@/lib/utils'
import {
    getTop10User,
    thong_ke_doanh_thu,
    thong_ke_doanh_thu_thang_trong_nam,
    thong_ke_top_10_product
} from '@/services/thongke'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [thongke, setThongKe] = useState<any>()
    const [totalRevenueOfYear, setTotalRevenueOfYear] = useState<any>()
    const [thongkeCateNam, setThongKeCateNam] = useState<any>()
    const [thongketheongay, setThongketheongay] = useState<any>()
    const [startDate, setSartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [year, setYear] = useState<any>(2024)

    useEffect(() => {
        const fetch = async () => {
            try {
                let thongkedata: any
                if (startDate != null && endDate != null) {
                    const resthongKeNgay = await thong_ke_doanh_thu(startDate, endDate)
                    thongkedata = resthongKeNgay
                    setThongketheongay(resthongKeNgay)
                } else {
                    const response = await thong_ke_doanh_thu_thang_trong_nam(year) // Chắc chắn rằng hàm thong_ke_doanh_thu_thang_trong_nam đã được định nghĩa trước đó
                    thongkedata = response
                    setThongKeCateNam(response.bangtongke)
                    setTotalRevenueOfYear(response.totalRevenueOfYear)
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

    const [top10Product, setTop10Pro] = useState<any>()
    const [top10User, setTop10User] = useState<any>()
    const [showTable, setShowTable] = useState<any>(true)
    useEffect(() => {
        const fetch = async () => {
            const res = await thong_ke_top_10_product()
            setTop10Pro(res.data)

            const ress = await getTop10User()
            setTop10User(ress.data)
        }
        fetch()
    }, [])

    const [ngaymuonthongke, setNgayMuonThongKe] = useState<any>('')
    const [productBanduocTrongNgay, setProductBanDuocTongNgay] = useState<any>()
    const onchaneDate = (value: any) => {
        if (startDate == null || endDate == null) {
            toast({
                variant: 'destructive',
                title: 'Bạn cần chọn lọc doanh thu theo startDate và endDate ở trên trước!'
            })
        } else if (value < startDate || value > endDate) {
            toast({
                variant: 'destructive',
                title: `Giá trị cần phải nằm trong khoảng từ ${startDate} đến ${endDate}!`
            })
        } else {
            const filteredData = thongketheongay?.revenueData[value]
            if (filteredData?.totalRevenue == 0) {
                toast({
                    variant: 'destructive',
                    title: `Ngày ${value} không bán được gì!`
                })
                setNgayMuonThongKe('')
            } else {
                setNgayMuonThongKe(filteredData)
            }
        }
    }
    useEffect(() => {
        if (ngaymuonthongke !== '') {
            const product = ngaymuonthongke.soldProducts.map((item: any) => [item.namePro, item.money])
            const newData = [['Tên sản phẩm', 'Tiền'], ...product]
            setProductBanDuocTongNgay(newData)
        }
    }, [ngaymuonthongke])

    const setLaiNam = (year: any) => {
        setEndDate(null)
        setSartDate(null)
        setNgayMuonThongKe('')
        setYear(2024)
    }
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
                                defaultValue={startDate}
                                onChange={(e) => setSartDate(e.target.value)}
                                name='startDate'
                                style={{ width: '150px' }}
                            />
                            <p>Đến</p>
                            <Input
                                type='date'
                                defaultValue={endDate}
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
                                            {ngaymuonthongke ? (
                                                <div className='row'>
                                                    <div className='col-md-12 col-xl-12 d-flex flex-column justify-content-start'>
                                                        <div className='ml-xl-4 '>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <div className='card-title'>Thống kê theo ngày:</div>
                                                                <Input
                                                                    type='date'
                                                                    onChange={(e) => onchaneDate(e.target.value)}
                                                                    name='datehehe'
                                                                    style={{ width: '150px' }}
                                                                />
                                                            </div>

                                                            <h1
                                                                className='text-primary'
                                                                style={{
                                                                    fontSize: '18px',
                                                                    display: 'flex',
                                                                    justifyContent: 'start',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                Tổng:&nbsp;
                                                                <span
                                                                    className='font-weight-bold'
                                                                    style={{ fontWeight: 700 }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: formatPriceBootstrap(
                                                                            ngaymuonthongke?.totalRevenue
                                                                        )
                                                                    }}
                                                                ></span>
                                                            </h1>
                                                            <br />
                                                            <p className='mb-2 mb-xl-0'>
                                                                Những sản phẩm đã bán được trong ngày:
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'left' }}>
                                                        <Chart
                                                            width={'1000px'}
                                                            height={'300px'}
                                                            chartType='PieChart'
                                                            loader={<div>Loading Chart...</div>}
                                                            data={productBanduocTrongNgay}
                                                            options={{
                                                                title: 'My Daily Activities',
                                                                pieHole: 0.4
                                                            }}
                                                            rootProps={{ 'data-testid': '1' }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='row'>
                                                    <div className='col-md-12 col-xl-12 d-flex flex-column justify-content-start'>
                                                        <div className='ml-xl-4 '>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <div className='card-title'>
                                                                    Thống kê theo Năm: {year}
                                                                </div>
                                                                <Input
                                                                    type='date'
                                                                    onChange={(e) => onchaneDate(e.target.value)}
                                                                    name='datehehe'
                                                                    style={{ width: '150px' }}
                                                                />
                                                            </div>

                                                            <h1
                                                                className='text-primary'
                                                                style={{
                                                                    fontSize: '18px',
                                                                    display: 'flex',
                                                                    justifyContent: 'start',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                Tổng:&nbsp;
                                                                <span
                                                                    className='font-weight-bold'
                                                                    style={{ fontWeight: 700 }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: formatPriceBootstrap(totalRevenueOfYear)
                                                                    }}
                                                                ></span>
                                                            </h1>
                                                            <br />
                                                            <p className='mb-2 mb-xl-0'>
                                                                Thống kê danh mục sản phẩm bán được::
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'left' }}>
                                                        <Chart
                                                            width={'500px'}
                                                            height={'300px'}
                                                            chartType='PieChart'
                                                            loader={<div>Loading Chart...</div>}
                                                            data={thongkeCateNam}
                                                            options={{
                                                                title: 'My Daily Activities',
                                                                pieHole: 0.4
                                                            }}
                                                            rootProps={{ 'data-testid': '1' }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 grid-margin stretch-card'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className='card-title mb-0'>
                                    <Button onClick={() => setShowTable(true)}>Top Sản Phẩm</Button>
                                    <Button onClick={() => setShowTable(false)} style={{ marginLeft: '20px' }}>
                                        Top Người dùng
                                    </Button>
                                </p>
                                <div className='table-responsive'>
                                    {showTable ? (
                                        <table className='table table-striped table-borderless text-left'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th style={{ width: '40%' }}>Sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng tiền</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {top10Product &&
                                                    top10Product.map((item: any, index: number) => (
                                                        <tr key={item?._id}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <Link to={item?._id}>{item?.name}</Link>
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                {item?.totalQuantity}
                                                            </td>
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
                                    ) : (
                                        <table className='table table-striped table-borderless text-left'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th style={{ width: '40%' }}>THông tin khách hàng</th>
                                                    <th>Số lượng hóa đơn</th>
                                                    <th>Tổng tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {top10User &&
                                                    top10User.map((item: any, index: number) => (
                                                        <tr key={item?._id}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <h1 style={{ fontSize: '20px' }}>{item?.username}</h1>
                                                                <p>{item?.email}</p>
                                                                <p>{item?.phone}</p>
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                {item?.totalBillCount}
                                                            </td>
                                                            <td
                                                                className='font-weight-bold'
                                                                style={{ fontWeight: 700 }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: formatPriceBootstrap(item?.totalAmount)
                                                                }}
                                                            ></td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    )}
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
