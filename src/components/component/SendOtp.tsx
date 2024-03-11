import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getRandomNumber } from '@/lib/utils'
import instance from '@/services/core/api'
import { useEffect, useState } from 'react'
import { toast } from '../ui/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useBillMutation } from '@/hooks/Bill/useBillMutation'
import FooterTemplate from './Footer'
import MenuClientComponent from './MenuClientComponent'
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

    const sendOtp = async () => {
        try {
            const otpguidi = getRandomNumber()
            setotpguidi(otpguidi)
            await instance.post('/send-otp', { otp: otpguidi, phoneNumber: phone })
            toast({
                variant: 'success',
                title: 'OTP đã gửi đến số điện thoại của bạn. Lưu ý: OTP có hiệu lực trong 3 phút!'
            })
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: error?.response?.data?.message + '!'
            })
        }
    }

    const navigate = useNavigate()

    const onSubmitOtp = () => {
        if (otpxacnhan == ' ') {
            toast({
                variant: 'destructive',
                title: 'Vui lòng nhập OTP!'
            })
        } else if (Number(otpxacnhan) !== otpguidiTrue) {
            toast({
                variant: 'destructive',
                title: 'OTP không đúng, vui lòng nhập lại!'
            })
        } else {
            toast({
                variant: 'success',
                title: 'OTP chính xác!'
            })
            onSubmit(donhang)
            localStorage.removeItem('donhang')
            const pttt = donhang?.bill?.paymentmethods
            if (pttt === 'Thanh toán khi nhận hàng') {
                setTimeout(() => {
                    navigate('/payment_success')
                }, 2000) // 2 seconds delay
            } else {
                setTimeout(() => {
                    navigate('/payment_method_momo')
                }, 2000) // 2 seconds delay
            }
        }
    }

    const { onSubmit } = useBillMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Đặt hàng thành công!!'
            })
        }
    })

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
                            <h1>Xác nhận đơn hàng</h1>
                        </div>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className='btn-link' href='#'>
                                    Trang chủ
                                </a>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                OTP
                            </li>
                        </ol>
                    </div>

                    <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                    <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                    <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
                </div>

                <div className='section pt-0'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <h3 className='title'>Nhập OTP để xác nhận đơn hàng</h3>
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
                                <Label htmlFor='username'>OTP</Label>
                                <Input
                                    id='otpxacnhan'
                                    placeholder='123456'
                                    onChange={(e: any) => handleOTPChange(e.target.value)}
                                />
                                <Button
                                    variant='destructive'
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'green'
                                    }}
                                    onClick={sendOtp}
                                >
                                    Gửi OTP
                                </Button>
                                <Button style={{ color: 'white', backgroundColor: 'blue' }} onClick={onSubmitOtp}>
                                    Check
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterTemplate />
            </div>
        </>
    )
}
