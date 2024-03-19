import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getRandomNumber } from '@/lib/utils'
import instance from '@/services/core/api'
import { useEffect, useState } from 'react'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'

export const SendOTP = () => {
    const [otpxacnhan, setOTPXN] = useState<any>()
    const [otpguidiTrue, setotpguidi] = useState<any>()
    const [phone, setPhone] = useState<any>()

    const [donhang, setDonHang] = useState<any>()
    const donghangJson = JSON.parse(localStorage.getItem('donhang') as any)
    useEffect(() => {
        if (donghangJson) {
            setDonHang(donghangJson)
            setPhone('84' + donghangJson?.bill?.tel.slice(1))
        }
    }, [])

    const handleOTPChange = (value: any) => {
        setOTPXN(value)
    }

    const [label, setLabel] = useState<any>(false)
    const sendOtp = async () => {
        try {
            const otpguidi = getRandomNumber()
            setotpguidi(otpguidi)
            await instance.post('/send-otp', { otp: otpguidi, phoneNumber: phone })
            setLabel(true)
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: error?.response?.data?.message + '!'
            })
        }
    }

    const navigate = useNavigate()

    const onSubmitOtp = async () => {
        if (otpxacnhan == ' ') {
            toast({
                variant: 'destructive',
                title: 'Vui lòng nhập OTP!'
            })
            // } else if (Number(otpxacnhan) !== otpguidiTrue) {
            //     toast({
            //         variant: 'destructive',
            //         title: 'OTP không đúng, vui lòng nhập lại!'
            //     })
        } else {
            toast({
                variant: 'success',
                title: 'OTP chính xác!'
            })
            try {
                const response = await instance.post('/bill/', donhang)
                if (response.data) {
                    toast({
                        variant: 'success',
                        title: 'Tạo hóa đơn thành công!!',
                        description: 'Tạo hóa đơn thành công!'
                    })
                    localStorage.setItem('billNew', JSON.stringify(response.data))
                    localStorage.removeItem('donhang')
                    const pttt = donhang?.bill?.paymentmethods
                    if (pttt === 'Thanh toán khi nhận hàng') {
                        setTimeout(() => {
                            navigate('/payment_success')
                        }, 2000) // 2 seconds delay
                    } else {
                        setTimeout(() => {
                            navigate('/payment_method_paypalcheckout')
                        }, 2000) // 2 seconds delay
                    }
                }
                return response.data
            } catch (error: any) {
                toast({
                    variant: 'destructive',
                    title: error?.response?.data?.message + '!'
                })
                console.log(`['Post_Bill']`, error)
            }
        }
    }

    return (
        <div style={{ margin: '0 auto', marginTop: '50px' }}>
            <div className='section pt-0'>
                <div className='container'>
                    <div className='section-title centered'>
                        <h1 className='title' style={{ fontSize: '30px' }}>
                            Nhập OTP để xác nhận đơn hàng
                        </h1>
                    </div>
                    <div
                        className='sigma_form style-2'
                        style={{
                            width: '300px',
                            height: '300px',
                            border: '1px soild gray',
                            borderColor: 'gray',
                            borderRadius: '10%',
                            margin: '0 auto'
                        }}
                    >
                        <div className='grid gap-2'>
                            <Label htmlFor='username'>
                                {!label ? (
                                    <span>Nhấn gửi để nhận mã OTP</span>
                                ) : (
                                    <span>
                                        OTP đã được gửi đến số điện thoại {phone.replace(/\d(?=\d{4})/g, '*')}, hãy mở
                                        hộp thư trên điện thoại và xác nhận OTP ở đây!
                                    </span>
                                )}
                            </Label>
                            <Input
                                id='otpxacnhan'
                                placeholder='123456'
                                onChange={(e: any) => handleOTPChange(e.target.value)}
                            />
                            <div style={{ display: 'flex' }}>
                                <Button
                                    variant='destructive'
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                        border: '0.5px solid gray',
                                        width: '30px'
                                    }}
                                    onClick={sendOtp}
                                >
                                    Gửi
                                </Button>
                                <Button
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'blue',
                                        width: '100%',
                                        marginLeft: '10px'
                                    }}
                                    onClick={onSubmitOtp}
                                >
                                    Check
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
