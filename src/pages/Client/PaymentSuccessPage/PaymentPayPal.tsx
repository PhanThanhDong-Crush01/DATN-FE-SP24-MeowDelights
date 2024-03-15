import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { apiChangePaymentStatus } from '@/services/bill'
import instance from '@/services/core/api'
import { toast } from '@/components/ui/use-toast'

const PayPalCheckout = () => {
    const navgate = useNavigate()
    const [money, setMoney] = useState<any>()
    const [billNew, setbillNew] = useState<any>()
    const billNewJson = JSON.parse(localStorage.getItem('billNew') as any)
    useEffect(() => {
        if (billNewJson) {
            setMoney(billNewJson?.data?.bill?.money)
            setbillNew(billNewJson)
        }
    }, [])

    const handlePaymentSuccess = async (data: any) => {
        const idBill = billNew?.data?.bill?._id
        const response = await instance.patch(`/bill/changePaymentStatus/${idBill}`, { paymentstatus: 'Đã thanh toán' })
        if (response.data) {
            toast({
                variant: 'success',
                title: 'Thanh toán thành công!'
            })
            setTimeout(() => {
                localStorage.removeItem('billNew')
                navgate('/payment_success')
            }, 1500)
        }
    }

    const convertToUSD = (moneyInVND: number) => {
        // Giả định tỷ giá hối đoái: 1 USD ≈ 23000 VND (tỉ giá gần đúng)
        const exchangeRate = 23000

        // Chuyển đổi từ VND sang USD
        const moneyInUSD = moneyInVND / exchangeRate

        // Làm tròn đến 2 chữ số thập phân
        return parseFloat(moneyInUSD.toFixed(2))
    }

    return (
        <div style={{ margin: '50px 30%' }}>
            <h1 style={{ fontSize: '30px' }}>Thanh Toán Ngay với</h1>
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
    )
}

export default PayPalCheckout
