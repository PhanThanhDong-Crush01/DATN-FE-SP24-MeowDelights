import { Button } from '@/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'
import { useBillDetailQuery } from '@/hooks/BillDetail/useBillDetailQuery'
import { useComment } from '@/hooks/Comment/useComment'
import { useCommentMutation } from '@/hooks/Comment/useCommentMutation'
import { getAllCommentsByBillId } from '@/services/comment'
import { Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Text } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CommentProductPage = ({ id, onSubmitted }: { id: string; onSubmitted: () => void }) => {
    console.log('🚀 ~ CommentProductPage ~ id:', id)
    const { data } = useBillDetailQuery(id)
    console.log('🚀 ~ CommentProductPage ~ data:', data)
    const [submittedData, setSubmittedData] = useState<any>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const comment = useComment(id)
    console.log(comment)
    const dataWithKeys = comment?.data?.comments?.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    console.log(dataWithKeys)
    // const idproduct = comment?.data?.comments[0]?.productId
    // console.log(idproduct)
    const userID = localStorage.getItem('userID')
    console.log(userID)
    const { onSubmit } = useCommentMutation({
        action: 'ADD'
    })
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    const onHandleSubmit = (data: any) => {
        // Xử lý dữ liệu khi form được submit
        console.log(data)
        onSubmit(data)
        // setSubmittedData(data) // Cập nhật state submittedData khi form được submit thành công
        // onSubmitted()
        // setIsReviewVisible(false)
    }

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {data?.billDetails?.map((item: any, index: number) => {
                const hasReview = dataWithKeys?.some((danhgia: any) => {
                    return (
                        item.idpro === danhgia?.productId ||
                        userID === danhgia?.userId ||
                        item.idprotype === danhgia?.productTypeId
                    )
                })
                if (!hasReview) {
                    return (
                        <form action='' key={index} onSubmit={handleSubmit(onHandleSubmit)} className='pb-5 px-3'>
                            <p className='flex flex-row gap-2 pb-2'>
                                <img src={item.imageTypePro} alt='' width={50} height={50} />
                                <div className='flex flex-col gap-1 text-sm text-gray-500'>
                                    <div>Sản phẩm: {item?.namePro}</div>
                                    <div>Phân loại {item?.nameTypePro}</div>
                                </div>
                            </p>

                            <p>
                                <input {...register('billId')} type='hidden' value={id} />
                            </p>
                            <p>
                                <input {...register('productId')} type='hidden' value={item?.idpro} />
                            </p>
                            <p>
                                <input {...register('userId')} hidden value={userID} />
                            </p>
                            <p>
                                <input {...register('productTypeId')} type='hidden' value={item?.idprotype} />
                            </p>
                            <div className='grid gap-4 pb-1'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='img' className='text-right'>
                                        Hình ảnh
                                    </Label>
                                    <Input
                                        {...register('img')}
                                        onChange={(e) => setValue('img', e.target.value)}
                                        id='img'
                                        className='col-span-3'
                                        type='text'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='title' className='text-right'>
                                        Tiêu đề
                                    </Label>
                                    <Input
                                        {...register('title')}
                                        onChange={(e) => setValue('title', e.target.value)}
                                        id='title'
                                        className='col-span-3'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='star' className='text-right'>
                                        Chọn sao
                                    </Label>
                                    <Rate
                                        onChange={(value) => setValue('star', value)}
                                        allowHalf
                                        id='star'
                                        // value={rating}
                                        className='col-span-3'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='comment' className='text-right'>
                                        Nhận xét
                                    </Label>
                                    <TextArea
                                        rows={4}
                                        {...register('comment')}
                                        onChange={(e) => setValue('comment', e.target.value)}
                                        id='comment'
                                        className='col-span-3'
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type='submit'>Lưu</Button>
                            </DialogFooter>
                        </form>
                    )
                } else {
                    return <div>Đã đánh giá</div>
                }
            })}
        </div>
    )
}

export default CommentProductPage
