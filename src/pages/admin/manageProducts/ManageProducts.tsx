import { Image, Space, Table, TableColumnsType } from 'antd';
import { useGetAllProductsQuery } from '../../../store/features/admin/manageProducts.api';
import { IProduct } from '../../../types';
import UpdateProductModal from './UpdateProduct';
import DeleteProductModal from './DeleteProductModal';
import ProductDetailsModal from './ProductDetailsModal';

const StudentDataTable = () => {
  const { data: productsData, isFetching } = useGetAllProductsQuery(undefined);

  const tableData = productsData?.data?.map(
    ({
      _id,
      brand,
      model,
      price,
      category,
      imageUrl,
      description,
      quantity,
      year,
      inStock,
    }: IProduct) => ({
      _id,
      key: _id,
      imageUrl,
      brand,
      model,
      price,
      category,
      description,
      quantity,
      year,
      inStock,
    })
  );

  const columns: TableColumnsType = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      render: item => <Image width={45} style={{ borderRadius: '10%' }} height={30} src={item} />,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category.',
      dataIndex: 'category',
      key: 'category',
    },

    {
      title: 'Action',
      key: 'action',
      render: (item: IProduct) => {
        return (
          <Space>
            <ProductDetailsModal product={item} />
            <UpdateProductModal product={item} />
            <DeleteProductModal product={item} />
          </Space>
        );
      },
      width: '15%',
    },
  ];

  return <Table columns={columns} dataSource={tableData} loading={isFetching} pagination={false} />;
};

export default StudentDataTable;
