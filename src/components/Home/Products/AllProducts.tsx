/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Button, Row, Col, Card, Pagination, Space, Input, Select } from 'antd';
import {
  ArrowLeftOutlined,
  EyeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useGetAllProductsQuery } from '../../../store/features/admin/manageProducts.api';
import { useState } from 'react';
import { TQueryParam } from '../../../types';
import Navbar from '../Navbar/Navbar';
import AppFooter from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';

const { Title } = Typography;

const AllProducts = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: productsData, isLoading } = useGetAllProductsQuery([
    { name: 'limit', value: 6 },
    { name: 'page', value: page },
    ...params,
  ]);

  const handleSearch = (value: string) => {
    const queryParams: TQueryParam[] = [{ name: 'searchTerm', value }];
    setParams(queryParams);
  };

  const handleFilterChange = (value: string) => {
    const queryParams: TQueryParam[] = [{ name: 'category', value }];
    setParams(queryParams);
  };

  const handleSortChange = (value: string) => {
    const queryParams: TQueryParam[] = [];
    if (value === 'price' || value === 'year') queryParams.push({ name: 'sortBy', value });
    if (value === 'asc' || value === 'desc') queryParams.push({ name: 'sortOrder', value });
    setParams(queryParams);
  };

  const getParamValue = (name: string): string | undefined => {
    const param = params.find(param => param.name === name);
    return param ? String(param.value) : undefined;
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
            Back
          </Button>
          <Title level={4}>All Cars</Title>
        </div>

        {/* Search and Filter Controls */}
        <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '1.5rem' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Input
                placeholder="Search products..."
                prefix={<SearchOutlined />}
                value={getParamValue('searchTerm')}
                onChange={e => handleSearch(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: '100%' }}
                value={getParamValue('category')}
                onChange={(value: string) => handleFilterChange(value)}
                placeholder="Filter by category"
              >
                {['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'].map(category => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} sm={4}>
              <Select
                value={getParamValue('sortBy')}
                onChange={value => handleSortChange(value)}
                style={{ width: '100%' }}
                placeholder="Sort by"
              >
                <Select.Option value="price">Price</Select.Option>
                <Select.Option value="year">Year</Select.Option>
              </Select>
            </Col>
            <Col xs={12} sm={4}>
              <Select
                value={getParamValue('sortOrder')}
                onChange={value => handleSortChange(value)}
                style={{ width: '100%' }}
                placeholder="Sort order"
              >
                <Select.Option value="asc">Ascending</Select.Option>
                <Select.Option value="desc">Descending</Select.Option>
              </Select>
            </Col>
          </Row>
        </Space>

        {/* Products after searching, sorting and filtering */}
        {isLoading ? (
          <Spinner />
        ) : (
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            {productsData?.data?.map((product: any) => (
              <Col xs={24} sm={12} md={8} key={product._id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.title}
                      src={product.imageUrl}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  }
                  style={{ height: '100%' }}
                  actions={[
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      View Details
                    </Button>,
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      // onClick={() => handleAddToCart(product._id)}
                    >
                      Add to Cart
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={product.title}
                    description={<Typography.Text strong>{product.price}</Typography.Text>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {/* Paginate products */}
        <Pagination
          align="end"
          current={page}
          onChange={value => setPage(value)}
          pageSize={productsData?.meta?.limit}
          hideOnSinglePage
          total={productsData?.meta?.total}
        />
      </div>
      <AppFooter />
    </>
  );
};

export default AllProducts;
