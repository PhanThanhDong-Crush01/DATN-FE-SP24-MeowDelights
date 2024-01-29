export interface IVoucher {
    _id?: string
    codeVc: string
    status: boolean
    decrease: number
    expiry: string //hạn sử dụng
    conditions: string
    idTypeVoucher: string
}
//mẫu
