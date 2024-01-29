export interface IProduct {
    _id?: string
    image: string
    name: string
    price: number
    idCategory: string
    import_date: string //// ngày nhận hàng
    expiry: string ///hạn sử dụng của sản phẩm
    status: boolean
    description: string
}
