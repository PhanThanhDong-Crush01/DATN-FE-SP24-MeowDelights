export interface IVoucher {
    id?: number
    codevc: string
    status: string
    decrease: number
    expiry: string //hạn sử dụng
    conditions: string
}
//mẫu
