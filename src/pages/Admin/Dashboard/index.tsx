import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { formatPriceBootstrap } from '@/lib/utils'
import {
    getTop10User,
    thong_ke,
    thong_ke_doanh_thu,
    thong_ke_doanh_thu_thang_trong_nam,
    thong_ke_top_10_product
} from '@/services/thongke'
import { phanPhatVouher } from '@/services/voucher'
import { Button } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { FcGenealogy } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState<any>()
    const [thongketheongay, setThongketheongay] = useState<any>()
    const [startDate, setSartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()
    const [year, setYear] = useState<any>(2024)
    const [doanhSo, setDoanhSo] = useState<any>()
    const [doanhSoSanPham, setDoanhSoSanPham] = useState<any>()
    const [bangthongke, setBangThongKe] = useState<any>()
    const [loc, setLoc] = useState<any>(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await thong_ke(startDate ? startDate : '2024-01-01', endDate ? endDate : '2024-06-01')
                console.log('🚀 ~ fetch ~ data:', data)
                if (data) {
                    setDoanhSoSanPham(data?.revenueEveryDay)
                    setTotalRevenue(data?.totalRevenue)
                    setBangThongKe(data?.bangtongke)
                    let doanhSo
                    const diffInDays =
                        Math.abs(
                            new Date(endDate ? endDate : '2024-06-01') - new Date(startDate ? startDate : '2024-01-01')
                        ) /
                        (1000 * 60 * 60 * 24)

                    if (diffInDays > 365) {
                        // Nếu lớn hơn 365 ngày, gộp theo từng năm
                        const revenueByYear: any = {}
                        for (const date in data?.revenueEveryDay) {
                            const year = date.substring(0, 4)
                            if (!revenueByYear[year]) {
                                revenueByYear[year] = 0
                            }
                            revenueByYear[year] += data?.revenueEveryDay[date].money
                        }

                        doanhSo = [
                            ['Năm', 'Tổng tiền'],
                            ...Object.entries(revenueByYear).map(([year, sales]) => [year, sales])
                        ]
                        setDoanhSo(doanhSo)
                    } else if (365 > diffInDays && diffInDays > 90) {
                        // 365 > diffInDays > 90, gộp theo từng tháng
                        const revenueByMonth: any = {}
                        for (const date in data?.revenueEveryDay) {
                            const month = date.substring(0, 7) // Lấy năm và tháng
                            if (!revenueByMonth[month]) {
                                revenueByMonth[month] = 0
                            }
                            revenueByMonth[month] += data?.revenueEveryDay[date].money
                        }
                        doanhSo = [
                            ['Tháng', 'Tổng tiền'],
                            ...Object.entries(revenueByMonth).map(([month, sales]) => [month, sales])
                        ]
                        setDoanhSo(doanhSo)
                    } else if (90 > diffInDays && diffInDays > 15) {
                        // 90 > diffInDays > 29, gộp theo từng tuần của tháng
                        const revenueByWeek: any = {}
                        const dates = Object.keys(data?.revenueEveryDay)

                        // Lặp qua các ngày và tính toán tuần tương ứng
                        dates.forEach((date) => {
                            const week = Math.ceil(new Date(date).getDate() / 7)
                            const yearMonth = date.substring(5, 7) // Lấy năm và tháng
                            const weekKey = `T${yearMonth}-Tuần ${week}`

                            if (!revenueByWeek[weekKey]) {
                                revenueByWeek[weekKey] = 0
                            }

                            revenueByWeek[weekKey] += data?.revenueEveryDay[date].money
                        })

                        // Chuyển đổi dữ liệu thành mảng và thêm tiêu đề
                        doanhSo = [
                            ['Tuần - Tháng', 'Tổng tiền'],
                            ...Object.entries(revenueByWeek).map(([week, sales]) => [week, sales])
                        ]
                        setDoanhSo(doanhSo)
                    } else {
                        // 29 > diffInDays, gộp theo từng ngày
                        doanhSo = [
                            ['Ngày', 'Tổng tiền'],
                            ...Object.entries(data?.revenueEveryDay).map(([date, info]) => [
                                moment(date).format('MM-DD'),
                                info.money
                            ])
                        ]
                        setDoanhSo(doanhSo)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetch()
    }, [loc])

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
        const filteredData = doanhSoSanPham[value]
        if (filteredData?.money == 0) {
            toast({
                variant: 'destructive',
                title: `Ngày ${value} không bán được gì!`
            })
            setNgayMuonThongKe('')
        } else {
            setNgayMuonThongKe(filteredData)
        }
    }
    useEffect(() => {
        if (ngaymuonthongke !== '') {
            let products = ngaymuonthongke.products

            // Sắp xếp các sản phẩm theo tiền giảm dần
            products.sort((a: any, b: any) => b.money - a.money)

            let newData = [['Tên sản phẩm', 'Tiền']]

            // Nếu số lượng sản phẩm lớn hơn 5, chỉ lấy 5 sản phẩm cao nhất
            if (products.length > 5) {
                // Lấy 5 sản phẩm đầu tiên
                const topProducts = products.slice(0, 5)
                newData = [['Tên sản phẩm', 'Tiền'], ...topProducts.map((item: any) => [item.namePro, item.money])]

                // Tính tổng tiền của các sản phẩm còn lại
                const remainingMoney = products.slice(5).reduce((acc: any, cur: any) => acc + cur.money, 0)

                // Thêm sản phẩm "Sản phẩm khác" với tổng tiền của các sản phẩm còn lại
                newData.push(['Sản phẩm khác', remainingMoney])
            } else {
                // Nếu số lượng sản phẩm không vượt quá 5, hiển thị tất cả các sản phẩm
                newData = [['Tên sản phẩm', 'Tiền'], ...products.map((item: any) => [item.namePro, item.money])]
            }

            setProductBanDuocTongNgay(newData)
        }
    }, [ngaymuonthongke])

    const setLaiNam = (year: any) => {
        setEndDate(null)
        setSartDate(null)
        setNgayMuonThongKe('')
        setYear(2024)
    }

    const phanphatvoucher = async () => {
        await phanPhatVouher({ top10User: top10User })
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
                    <div style={{ width: '35%', marginLeft: '65%' }}>
                        <h2 style={{ fontSize: '20px' }}>Lọc thống kê:</h2>
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
                            <Button
                                onClick={() => {
                                    if (!startDate) {
                                        toast({
                                            variant: 'destructive',
                                            title: 'Bạn chưa chọn ngày bắt đầu!'
                                        })
                                    } else if (!endDate) {
                                        toast({
                                            variant: 'destructive',
                                            title: 'Bạn chưa chọn ngày kết thúc!'
                                        })
                                    } else {
                                        setLoc(true)
                                        toast({
                                            variant: 'success',
                                            title: 'Đang lọc thống kê!',
                                            description:
                                                'Chọn khoảng thời gian cách nhau càng xa thì việc lọc thống kê càng mất thời gian! Đợi nhé'
                                        })
                                    }
                                }}
                                type='primary'
                                danger
                            >
                                Lọc
                            </Button>
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Chart
                            width={'100%'}
                            height={'500px'}
                            chartType='LineChart'
                            loader={<div>Loading Chart</div>}
                            data={doanhSo}
                            options={{
                                title: 'Biểu đồ thống kê doanh thu',
                                hAxis: { title: '', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                tooltip: { isHtml: true }
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
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
                                                                            ngaymuonthongke?.money
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
                                                                title: 'Biểu đồ doanh số danh mục sản phẩm',
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
                                                                        __html: formatPriceBootstrap(totalRevenue)
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
                                                            data={bangthongke}
                                                            options={{
                                                                title: 'Biểu đồ %  ',
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
                                    <Button onClick={() => setShowTable(true)}>Top 5 Sản Phẩm</Button>
                                    <Button onClick={() => setShowTable(false)} style={{ marginLeft: '20px' }}>
                                        Top 5 Người dùng
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
                                        <div>
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
                                                                    <h1 style={{ fontSize: '20px' }}>
                                                                        {item?.username}
                                                                    </h1>
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

                                            <Button
                                                type='primary'
                                                danger
                                                icon={<FcGenealogy />}
                                                size={'large'}
                                                className='bg-[#1677ff]'
                                                style={{ marginLeft: '35%' }}
                                                onClick={() => phanphatvoucher()}
                                            >
                                                Phân phát Voucher
                                            </Button>
                                        </div>
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
