export interface IVoucher {
    _id?: string
    name: string
    status: boolean
    quantity: number
    decrease: number
    expiry: Date //hạn sử dụng
    conditions: number
    idTypeVoucher: string
}
//mẫu
