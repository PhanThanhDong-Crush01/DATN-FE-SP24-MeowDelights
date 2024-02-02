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

export const getRandomNumber = () => {
    let randomNumber
    const min = 100000
    const max = 1000000
    const generatedNumbers: any = [] // Mảng để lưu trữ các số đã được tạo ra

    do {
        randomNumber = Math.floor(Math.random() * (max - min)) + min
    } while (generatedNumbers.includes(randomNumber)) // Kiểm tra xem số mới có tồn tại trong mảng không

    generatedNumbers.push(randomNumber) // Thêm số mới vào mảng

    return randomNumber
}
