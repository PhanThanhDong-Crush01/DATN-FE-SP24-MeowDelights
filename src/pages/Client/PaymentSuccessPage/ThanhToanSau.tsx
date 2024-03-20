import { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import instance from '@/services/core/api'
import { toast } from '@/components/ui/use-toast'

const ThanhToanSau = ({ money, idBill, show }: any) => {
    const [showWindow, setShowWindow] = useState(false) // Khởi tạo trạng thái ban đầu là false
    useEffect(() => {
        setShowWindow(true)
    }, [show])

    const navigate = useNavigate()

    const handlePaymentSuccess = async (data: any) => {
        const response = await instance.patch(`/bill/changePaymentStatus/${idBill}`, { paymentstatus: 'Đã thanh toán' })
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thanh toán thành công!'
            })
            setTimeout(() => {
                navigate('/order/order_detail/' + idBill)
            }, 1500)
        }
    }

    const convertToUSD = (moneyInVND: number) => {
        const exchangeRate = 23000
        const moneyInUSD = moneyInVND / exchangeRate
        return parseFloat(moneyInUSD.toFixed(2))
    }

    const handleClose = () => {
        setShowWindow(false)
        window.location.reload()
    }

    return (
        <>
            {showWindow && (
                <div
                    style={{
                        width: '50%',
                        height: '50%',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        zIndex: '9999'
                    }}
                >
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        X
                    </button>
                    <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>
                        Thanh toán đơn hàng <u>{idBill}</u> <br /> Ngay với:
                    </h1>
                    <PayPalScriptProvider
                        options={{
                            clientId: 'Ab7_rUdInMmd7teC_f2osnmkwjW3xCB64wShQHAWmpBfxdDOGoEbFuHGCmy3XWzPkH3D9IdkAIQHF1Pe'
                        }}
                    >
                        <PayPalButtons
                            createOrder={(data: any, actions: any) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: convertToUSD(money) // Total amount for the order
                                            }
                                        }
                                    ]
                                })
                            }}
                            onApprove={(data: any, actions: any) => {
                                return actions.order.capture().then((details: any) => {
                                    handlePaymentSuccess(details)
                                })
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            )}
        </>
    )
}

export default ThanhToanSau
