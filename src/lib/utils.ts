import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const formatPrice = (price: number) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
    }).format(price)
    const formattedPriceWithoutVND = formattedPrice.replace('VND', '')
    return formattedPriceWithoutVND + `<sup>đ</sup>`
}

export const formatPriceBootstrap = (price: number) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
    }).format(price)
    const formattedPriceWithoutVND = formattedPrice.replace('VND', '')
    return `<span class="d-flex justify-content-left align-items-center text-danger">${formattedPriceWithoutVND} <sup>đ</sup></span>`
}
