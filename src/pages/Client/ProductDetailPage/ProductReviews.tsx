import { useCommentQuery } from '@/hooks/Comment/useCommentQuery'
import { statisticsComment } from '@/services/comment'
import { Avatar } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductReviews = () => {
    const { id } = useParams()
    console.log(id)
    const { data } = useCommentQuery(id)
    console.log(data)
    // const idProductType = data.idProductType
    // console.log(idProductType)

    const [isZoomed, setIsZoomed] = useState(false)

    const handleImageClick = () => {
        setIsZoomed(!isZoomed)
    }

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

    return (
        <>
            <div className='container py-5 px-32 '>
                <div className='sigma_product-additional-info'>
                    <ul className='pb-2' id='bordered-tab' role='tablist'>
                        <li className='nav-item' style={{}}>
                            <a
                                // className='nav-link'
                                id='tab-product-reviews-tab'
                                data-toggle='pill'
                                href='#tab-product-reviews'
                                role='tab'
                                aria-controls=''
                                aria-selected='false'
                            >
                                <h2 className='text-2xl pt-3 text-black font-bold '> ĐÁNH GIÁ SẢN PHẨM</h2>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <div className='' id='bordered-tabContent'>
                        <div
                            className='tab-pane fade show active'
                            id='tab-product-desc'
                            role='tabpanel'
                            aria-labelledby='tab-product-desc-tab'
                        >
                            <div className='comments-list'>
                                {data?.comments?.map((comment: any, index: any) => (
                                    <ul key={index} className='py-3'>
                                        <li className='comment-item'>
                                            <div className='comment-body'>
                                                <div className='flex flex-row gap-2'>
                                                    <Avatar
                                                        src={comment?.comment?.user?.imgUser}
                                                        style={{ height: 55, width: 55 }}
                                                        alt=''
                                                    />
                                                    <div>
                                                        <p className='font-thin text-lg '>
                                                            {comment?.comment?.user?.name}
                                                            <p className='text-gray-400 text-sm'>
                                                                {' '}
                                                                Phân loại: {comment?.comment?.productType?.color} -{' '}
                                                                {comment?.comment?.productType?.size}
                                                            </p>

                                                            {/* {Array.from({
                                                                length: comment?.comment?.data?.star || 0
                                                            }).map((_, index) => (
                                                                <i
                                                                    key={index}
                                                                    className='fa fa-star active text-yellow-400'
                                                                ></i>
                                                            ))} */}
                                                            {renderStars(comment?.comment?.data?.star || 0)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='pl-16 pb-3 '>
                                                    <p>{comment?.comment?.data?.title}</p>
                                                    <p>{comment?.comment?.data?.comment}</p>
                                                    {/* <img
                                                        className='rounded pt-1'
                                                        src={comment?.comment?.data?.img}
                                                        alt=''
                                                        style={{ height: 120, width: 100 }}
                                                    /> */}
                                                    <img
                                                        className={`rounded pt-1 ${isZoomed ? 'zoomed' : ''}`}
                                                        src={comment?.comment?.data?.img}
                                                        alt=''
                                                        style={{
                                                            height: isZoomed ? 'auto' : 120,
                                                            width: isZoomed ? 'auto' : 100
                                                        }}
                                                        onClick={handleImageClick}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductReviews
