import MenuClientComponent from '@/components/component/MenuClientComponent'
import { useCommentQuery } from '@/hooks/Comment/useCommentQuery'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductReviews = () => {
    const { id } = useParams()
    console.log(id)
    const { data } = useCommentQuery(id)
    console.log(data)
    // const idProductType = data.idProductType
    // console.log(idProductType)

    return (
        <>
            <div className='container'>
                <div className='sigma_product-additional-info'>
                    <ul className='nav' id='bordered-tab' role='tablist'>
                        <li className='nav-item'>
                            <a
                                className='nav-link'
                                id='tab-product-reviews-tab'
                                data-toggle='pill'
                                href='#tab-product-reviews'
                                role='tab'
                                aria-controls='tab-product-reviews'
                                aria-selected='false'
                            >
                                <h2 className='text-2xl pt-3'>Đánh giá</h2>{' '}
                            </a>
                        </li>
                    </ul>

                    <div className='tab-content' id='bordered-tabContent'>
                        <div
                            className='tab-pane fade show active'
                            id='tab-product-desc'
                            role='tabpanel'
                            aria-labelledby='tab-product-desc-tab'
                        >
                            <div
                                className='tab-pane fade'
                                id='tab-product-info'
                                role='tabpanel'
                                aria-labelledby='tab-product-info-tab'
                            ></div>
                            <div
                                className='tab-pane fade'
                                id='tab-product-reviews'
                                role='tabpanel'
                                aria-labelledby='tab-product-reviews-tab'
                            ></div>
                            <div className='comments-list'>
                                {data?.comments?.map((comment: any, index: any) => (
                                    <ul key={index} className='py-3'>
                                        <li className='comment-item'>
                                            <div className='comment-body'>
                                                <div className='flex flex-row'>
                                                    <img
                                                        src={comment?.comment?.user?.img}
                                                        style={{ height: 50, width: 50 }}
                                                        alt=''
                                                    />
                                                    <div>
                                                        <h5>{comment?.comment?.user?.name}</h5>
                                                        <h5>{comment?.comment?.user?.email}</h5>
                                                    </div>
                                                </div>
                                                <div className='px-5 '>
                                                    <div className='sigma_rating'>
                                                        {Array.from({ length: comment?.comment?.data?.star || 0 }).map(
                                                            (_, index) => (
                                                                <i key={index} className='fa fa-star active'></i>
                                                            )
                                                        )}
                                                    </div>
                                                    <p className='text-gray-400 text-sm'>
                                                        {' '}
                                                        Phân loại:
                                                        {comment?.comment?.productType?.color},
                                                        {comment?.comment?.productType?.size}
                                                    </p>
                                                    <p>{comment?.comment?.data?.title}</p>
                                                    <p>{comment?.comment?.data?.comment}</p>
                                                    <img
                                                        className='rounded pt-1'
                                                        src={comment?.comment?.data?.img}
                                                        alt=''
                                                        style={{ height: 120, width: 100 }}
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
