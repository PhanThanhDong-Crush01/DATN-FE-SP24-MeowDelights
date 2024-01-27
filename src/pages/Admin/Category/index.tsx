import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import '@/styles/Cate.css'
import { Link } from 'react-router-dom'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import AddCategory from './AddCategory'
import { IoMdAdd } from 'react-icons/io'
import EditCategory from './EditCategory'

interface DataType {
    key: string
    id: string
    name: string
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        id: '3uygbediuch'
    },
    {
        key: '2',
        name: 'John Brown 89',
        id: 'dsfergt'
    }
]
const ListCategory = () => {
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
                        <EditCategory id={record.id} name={record.name} />
                    </Sheet>

                    <Popconfirm
                        placement='topRight'
                        title='Xóa bài viết?'
                        description='Bạn có chắc chắn xóa bài viết này không?'
                        onConfirm={() => confirm(record.key)}
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
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ListCategory
