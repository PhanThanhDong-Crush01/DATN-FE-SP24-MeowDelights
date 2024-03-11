import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import '@/styles/Cate.css'
import { Link } from 'react-router-dom'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import AddCategory from './AddCategory'
import { IoMdAdd } from 'react-icons/io'
import EditCategory from './EditCategory'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'
import { useCategoryMutation } from '@/hooks/Category/useCategoryMutation'
import { toast } from '@/components/ui/use-toast'

interface DataType {
    key: string
    _id: string
    name: string
}

const ListCategory = () => {
    const { data }: any = useCategoryQuery()
    const { onRemove } = useCategoryMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá danh mục sản phẩm thành công!!',
                description: 'Danh mục sản phẩm đã bị xóa'
            })
        }
    })

    const dataWithKeys = data?.data.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
        },
        {
            title: 'Tên danh mục sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '10%'
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle' style={{ textAlign: 'center' }}>
                    <Sheet>
                        <SheetTrigger>
                            <Button type='primary' ghost>
                                <EditOutlined style={{ display: 'inline-flex' }} />
                            </Button>
                        </SheetTrigger>
                        <EditCategory id={record._id} />
                    </Sheet>

                    <Popconfirm
                        placement='topRight'
                        title='Xóa bài viết?'
                        description='Bạn có chắc chắn xóa bài viết này không?'
                        onConfirm={() => onRemove(record)}
                        okText='Đồng ý'
                        cancelText='Không'
                    >
                        <Button type='primary' danger>
                            <DeleteOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <div className='flex justify-between items-center mx-[10px] my-3'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Danh mục sản phẩm
                    </p>
                </div>
                <div className='flex justify-end mb-2 mr-10 mt-5'>
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                type='primary'
                                icon={<PlusCircleOutlined />}
                                size={'large'}
                                className='bg-[#1677ff]'
                            ></Button>
                        </SheetTrigger>
                        <AddCategory />
                    </Sheet>
                </div>
            </div>
            <Table columns={columns} dataSource={dataWithKeys} />
        </div>
    )
}

export default ListCategory
