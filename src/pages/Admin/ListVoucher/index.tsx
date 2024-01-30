import { useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusSquareOutlined, SearchOutlined } from '@ant-design/icons'
import type { GetRef, TableColumnsType, TableColumnType } from 'antd'
import { Button,Input,Modal, Popconfirm, Select, Space, Table, message } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useVoucherQuery } from '@/hooks/Voucher/useVoucherQuery'
import { useVoucherMutation } from '@/hooks/Voucher/useVoucherMutation'
import { toast } from '@/components/ui/use-toast'
import AddVoucher from './AddVoucher'
type InputRef = GetRef<typeof Input>

interface DataType {
    key: string
    _id: string
    status: boolean
    codeVc: string
    decrease: number
    expiry: string
    conditions: string
    idTypeVoucher: string
}

type DataIndex = keyof DataType

const Voucher = () => {
    const { data }: any = useVoucherQuery()
    console.log(data)
    const { onRemove } = useVoucherMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Xoá sản phẩm thành công!!',
                description: 'Sẩn phẩm đã bị xóa'
            })
        }
    })

    const { onSubmit } = useVoucherMutation({
        action: 'UPDATE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Cập nhật thành công!!',
                description: 'Cập nhật danh mục khuyến mại thành công!'
            })
        }
    })
    const dataVoucher = data?.datas.map((item: any, index: any) => ({
        ...item,
        key: index + 1
    }))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const searchInput = useRef<InputRef>(null)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    const [editStatus, setEditStatus] = useState(true)
    const [editDecrease, setEditDecrease] = useState('')
    const [editCodeVc, setEditCodeVc] = useState('')
    const [editExpiry, setEditExpiry] = useState('')
    const [editConditions, setEditConditions] = useState('')
    const [editIdTypeVoucher, setEditIdTypeVoucher] = useState('')
    const [editedVoucherId, setEditedVoucherId] = useState(null)

    const handleEditVoucher = (
        id: any,
        status: any,
        decrease: any,
        codeVc: any,
        expiry: any,
        conditions: any,
        idTypeVoucher: any
    ) => {
        setEditedVoucherId(id)
        setEditStatus(status)
        setEditDecrease(decrease)
        setEditCodeVc(codeVc)
        setEditExpiry(expiry)
        setEditConditions(conditions)
        setEditIdTypeVoucher(idTypeVoucher)
    }

    const handleSaveEdit = () => {
        onSubmit({
            _id: editedVoucherId,
            status: editStatus,
            decrease: editDecrease,
            codeVc: editCodeVc,
            expiry: editExpiry,
            conditions: editConditions,
            idTypeVoucher: editIdTypeVoucher
        })

        // Reset state after saving
        setEditedVoucherId(null)
        setEditStatus(true)
        setEditDecrease('')
        setEditCodeVc('')
        setEditExpiry('')
        setEditConditions('')
        setEditIdTypeVoucher('')
    }

    const handleCancelEdit = () => {
        // Reset state on cancel
        setEditedVoucherId(null)
        setEditStatus(true)
        setEditDecrease('')
        setEditCodeVc('')
        setEditExpiry('')
        setEditConditions('')
        setEditIdTypeVoucher('')
    }
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }
    const getStatusLabel = (status: boolean) => (status ? 'Còn voucher' : 'Hết voucher')

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
    })
    // bảng table
    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <Select
                        className=' w-32'
                        labelInValue
                        value={{ value: editStatus, label: getStatusLabel(editStatus) }}
                        onChange={(value) => setEditStatus(value.value)}
                        options={[
                            {
                                value: true,
                                label: 'Còn voucher'
                            },
                            {
                                value: false,
                                label: 'Hết voucher'
                            }
                        ]}
                    ></Select>
                ) : (
                    getStatusLabel(record.status)
                    // <option value='record.status'></option>
                )
        },

        {
            title: 'Giảm bớt',
            dataIndex: 'decrease',
            key: 'decrease',
            width: '10%',
            ...getColumnSearchProps('decrease'),
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <input
                        className='border border-gray-300 rounded-md'
                        style={{ overflow: 'hidden', display: 'block', width: '100%', height: '100%', padding: '6px' }}
                        type='text'
                        value={editDecrease}
                        onChange={(e) => setEditDecrease(e.target.value)}
                        placeholder='giảm bớt'
                    />
                ) : (
                    record.decrease
                )
        },
        {
            title: 'Mã voucher',
            dataIndex: 'codeVc',
            key: 'codeVc',
            width: '10%',
            ...getColumnSearchProps('codeVc'),
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <input
                        className='border border-gray-300 rounded-md'
                        style={{ overflow: 'hidden', display: 'block', width: '100%', height: '100%', padding: '6px' }}
                        type='text'
                        value={editCodeVc}
                        onChange={(e) => setEditCodeVc(e.target.value)}
                        placeholder='Mã giảm giá'
                    />
                ) : (
                    record.codeVc
                )
        },
        {
            title: 'Hết hạn',
            dataIndex: 'expiry',
            key: 'expiry',
            width: '20%',
            ...getColumnSearchProps('expiry'),
            sorter: (a, b) => a.expiry.length - b.expiry.length,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <input
                        className='border border-gray-300 rounded-md'
                        style={{ overflow: 'hidden', display: 'block', width: '100%', height: '100%', padding: '6px' }}
                        type='text'
                        value={editExpiry}
                        onChange={(e) => setEditExpiry(e.target.value)}
                        placeholder='ngày hết hạn'
                    />
                ) : (
                    record.expiry
                )
        },

        {
            title: 'Điều kiện',
            dataIndex: 'conditions',
            key: 'conditions',
            width: '10%',
            ...getColumnSearchProps('conditions'),
            // sorter: (a, b) => a.conditions - b.conditions,
            // sortDirections: ['descend', 'ascend'],
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <input
                        className='border border-gray-300 rounded-md'
                        style={{ overflow: 'hidden', display: 'block', width: '100%', height: '100%', padding: '6px' }}
                        type='text'
                        value={editConditions}
                        onChange={(e) => setEditConditions(e.target.value)}
                        placeholder='điều kiện'
                    />
                ) : (
                    record.conditions
                )
        },

        {
            title: 'Loại Voucher',
            dataIndex: 'idTypeVoucher',
            key: 'idTypeVoucher',
            width: '20%',
            render: (_, record) =>
                editedVoucherId === record._id ? (
                    <input
                        className='border border-gray-300 rounded-md'
                        style={{ overflow: 'hidden', display: 'block', width: '100%', height: '100%', padding: '6px' }}
                        type='text'
                        value={editIdTypeVoucher}
                        onChange={(e) => setEditIdTypeVoucher(e.target.value)}
                        placeholder='điều kiện'
                    />
                ) : (
                    record.idTypeVoucher
                )
        },

        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle'>
                    {editedVoucherId === record._id ? (
                        <div className='flex flex-col gap-1'>
                            <button onClick={handleSaveEdit} className='bg-blue-500 px-4 py-1 rounded text-white'>
                                Lưu
                            </button>
                            &nbsp; &nbsp;
                            <button onClick={handleCancelEdit} className='bg-red-500 px-4  py-1 rounded text-white'>
                                Hủy
                            </button>
                        </div>
                    ) : (
                        <Button
                            type='primary'
                            onClick={() =>
                                handleEditVoucher(
                                    record._id,
                                    record.status,
                                    record.decrease,
                                    record.codeVc,
                                    record.expiry,
                                    record.conditions,
                                    record.idTypeVoucher
                                )
                            }
                            ghost
                        >
                            <EditOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    )}

                    <Popconfirm
                        placement='topRight'
                        title='Xóa bài viết?'
                        description='Bạn có chắc chắn xóa bài viết này không?'
                        onConfirm={() => onRemove(record)}
                        onCancel={cancel}
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
    const cancel = () => {
        message.error('Đã hủy!')
    }
    return (
        <div>
            <div className='flex justify-between items-center mx-[50px]'>
                <div>
                    <p className='text-[20px]'>Phiếu giảm giá </p>
                </div>
                <div className='flex justify-end mb-2'>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className='bg-[#1677ff]'
                        onClick={showModal}
                    ></Button>
                </div>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <AddVoucher />
                </Modal>
            </div>
            <Table columns={columns} dataSource={dataVoucher} />
            {/* form */}
        </div>
    )
}

export default Voucher
