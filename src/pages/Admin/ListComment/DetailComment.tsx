import { useCommentMutation } from '@/hooks/Comment/useCommentMutation'
import { useCommentQuery } from '@/hooks/Comment/useCommentQuery'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { getAllCommentOfProduct } from '@/services/comment'
import instance from '@/services/core/api'
import { DeleteOutlined, StarFilled } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Popconfirm, Space, Table, TableColumnsType } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
interface DataType {
    datas: any
    key: string
    _id: string
    productId: string
    productInfo: any
    productTypeInfo: any
    user: string
    productTypeId: string
    userId: string
    img: string
    title: string
    star: number
    comment: string
}

type DataIndex = keyof DataType

const DetailCommentPage = () => {
    const { id } = useParams()
    console.log(id)
    const product = useProductQuery(id)

    console.log(product)
    const { data } = useCommentQuery(id)
    console.log(data)
    const { onRemove } = useCommentMutation({
        action: 'DELETE'
    })
    const dataWithKeys = data?.comments?.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    console.log(dataWithKeys)

    const renderStars = (starCount: number) => {
        // Làm tròn số lượng sao
        const roundedStars = Math.round(starCount)

        // Phần nguyên của số sao
        const fullStars = Math.floor(starCount)

        // Phần dư
        const remainder = starCount - fullStars

        // Mảng sao đầy đủ
        const starsArray = []

        // Thêm số lượng sao nguyên
        for (let i = 0; i < fullStars; i++) {
            starsArray.push(<i key={i} className='fa fa-star active text-yellow-400'></i>)
        }

        // Thêm nửa sao nếu có phần dư >= 0.5
        if (remainder >= 0.5) {
            starsArray.push(<i key='half-star' className='fa fa-star-half active text-yellow-400'></i>)
        }

        // Trả về mảng sao
        return starsArray
    }
    const columns: TableColumnsType<DataType> = [
        // {
        //     title: '#',
        //     dataIndex: 'key',
        //     key: 'key',
        //     width: '5%'
        // },

        {
            title: 'Khách hàng',
            dataIndex: 'userId',
            key: 'userId',
            width: '5%',
            fixed: 'left',
            // ...getColumnSearchProps('userId'),
            render: (_, record) => {
                return (
                    <div>
                        <h1 style={{ fontSize: '16px', color: '' }}>Tên: {record?.comment?.user?.name}</h1>
                        <h2 style={{ fontSize: '16px' }}>Email: {record?.comment?.user?.email}</h2>

                        <p style={{ fontSize: '12px', marginTop: '5px', color: 'gray' }}>Mã: {record?.userId}</p>
                    </div>
                )
            }
        },
        {
            title: 'Phân loại',
            dataIndex: 'productId',
            key: 'productId',
            width: '3%',
            // ...getColumnSearchProps('productId'),
            render: (_, record) => {
                return (
                    <div>
                        {/* <div>
                              <Image src={record?.productInfo?.image} width={70} />
                              <Link to={'/products/' + record?.productInfo?._id}>
                                  <h1 style={{ fontSize: '16px' }}>{record?.productInfo?.name}</h1>
                              </Link>
                          </div> */}
                        <div>
                            <div>
                                {record?.comment?.productType?.color} - {record?.comment?.productType?.size}-
                                {record?.comment?.productType?.weight}
                            </div>
                            {/* <p style={{ fontSize: '12px', marginTop: '5px', color: 'gray' }}>
                                Mã: {record?.productInfo?._id}
                            </p> */}
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Số sao ',
            dataIndex: 'star',
            key: 'star',
            width: '3%',
            filters: [
                {
                    text: '1-2 sao',
                    value: '1-<2'
                },
                {
                    text: '2-3 sao',
                    value: '2-<3'
                },
                {
                    text: '3-4 sao',
                    value: '3-<4'
                },
                {
                    text: '4-5 sao',
                    value: '4-5'
                }
            ],

            onFilter: (value: number, record) => {
                const star = record.comment.data.star
                const [lowerBound, upperBound] = value.split('-').map(parseFloat)
                return star >= lowerBound && star <= upperBound
            },

            render: (_, record) => {
                const fullStars = Math.floor(record.comment.data.star) // Số sao đầy
                const decimalPart = record.star - fullStars // Phần thập phân của số sao

                const starArray = Array.from({ length: fullStars }, (_, index) => index) // Tạo mảng sao đầy
                let halfStarComponent = null

                // Xác định nếu có icon nửa sao và số lượng sao trống
                if (decimalPart >= 0.25 && decimalPart <= 0.75) {
                    halfStarComponent = <FontAwesomeIcon icon={faStarHalf} style={{ color: 'gold' }} /> // Icon nửa sao
                } else if (decimalPart > 0.75) {
                    starArray.push(fullStars) // Thêm một sao đầy
                }

                const emptyStars = 5 - starArray.length // Số sao trống

                // Tạo mảng sao trống
                const emptyStarArray = Array.from({ length: emptyStars }, (_, index) => index)

                return (
                    <div>
                        {/* Các sao đầy */}
                        {starArray.map((_, index) => (
                            <StarFilled key={`full-${index}`} style={{ color: 'gold' }} />
                        ))}
                        {/* Icon nửa sao nếu có */}
                        {halfStarComponent}
                        {/* Các sao trống */}
                        {/* {emptyStarArray.map((_, index) => (
                            <StarOutlined key={`empty-${index}`} style={{ color: 'gold' }} />
                        ))} */}
                    </div>
                )
            }
        },

        {
            title: 'Hình ảnh',
            dataIndex: 'img',
            key: 'img',
            width: '4%',
            render: (_, record) => {
                return <img src={record.comment.data.img} />
            }
        },

        // {
        //     title: 'Chủ đề',
        //     dataIndex: 'title',
        //     key: 'title',
        //     width: '20%',
        //     render: (_, record) => record?.title
        // },

        {
            title: 'Đánh giá',
            dataIndex: 'comment',
            key: 'comment',
            width: '3%',
            render: (_, record) => {
                return (
                    <div>
                        {record.comment.data.title}-{record.comment.data.comment}
                    </div>
                )
            }
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '1.5%',
            fixed: 'right',
            render: (_, record) => (
                <Space size='middle'>
                    <Popconfirm
                        placement='topRight'
                        title='Xóa đánh giá?'
                        description='Bạn có chắc chắn đánh giá này không?'
                        onConfirm={() => onRemove(record)}
                        // onCancel={cancel}
                        okText='Đồng ý'
                        cancelText='Không'
                    >
                        <Button type='primary' danger>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <div>
            <div className='flex  flex-col gap-2 pb-4 text-[20px]'>
                <p className='text-[30px] items-center'>Danh sách đánh giá chi tiết </p>
                <h2>Sản phẩm: {product?.data?.data?.name}</h2>
                <h2>Mã sp: {product?.data?.data?._id}</h2>
            </div>
            <Table columns={columns} dataSource={dataWithKeys} scroll={{ x: 1300 }} />
        </div>
    )
}

export default DetailCommentPage
