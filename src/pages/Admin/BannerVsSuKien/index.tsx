import { Button, Form, Image } from 'antd'
import '@/styles/Cate.css'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import AddCategory from './AddCategory'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'
import { FcGenealogy } from 'react-icons/fc'
import ImageUpload from '@/lib/uploadFile'
import { useState } from 'react'

const ListBanner = () => {
    const { data }: any = useCategoryQuery()
    const [imageUrl, setImageUrl] = useState<string>('')

    const handleImageUpload = (url: string) => {
        setImageUrl(url)
    }
    return (
        <div>
            <div className='flex justify-between items-center mx-[10px] my-3'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Banner Và Sự Kiện
                    </p>
                </div>
                <div className='flex justify-end mb-2 mr-10 mt-5'>
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                type='primary'
                                danger
                                icon={<FcGenealogy />}
                                size={'large'}
                                className='bg-[#1677ff]'
                            >
                                Phân phát Voucher
                            </Button>
                        </SheetTrigger>
                        <AddCategory />
                    </Sheet>
                </div>
            </div>

            <div>
                {imageUrl !== '' && <Image src={imageUrl} width={'50%'} />}

                <div className='flex justify-start aline-center  mb-2 mr-10 mt-5'>
                    <Form.Item label='Ảnh' name='image'>
                        <ImageUpload onImageUpload={handleImageUpload} />
                    </Form.Item>
                    <Button type='primary' size={'large'} className='bg-[#1677ff]'>
                        Áp dụng banner này
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ListBanner
