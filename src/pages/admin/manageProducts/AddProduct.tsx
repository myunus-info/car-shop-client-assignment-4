/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, Col, Row } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAddProductMutation } from '../../../store/features/admin/manageProducts.api';
import GenericForm from '../../../components/form/GenericForm';
import CustomInput from '../../../components/form/CustomInput';
import { ProductValidations } from '../../../schemas/product.schema';
import CustomSelect from '../../../components/form/CustomSelect';
import CustomTextArea from '../../../components/form/CustomTextArea';

const AddProduct = () => {
  const [addProduct, { isLoading, isSuccess }] = useAddProductMutation();

  const productCategoryOptions = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'].map(item => ({
    label: item,
    value: item,
  }));

  const inStockOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const toastId = toast.loading('Creating product...');
    const productData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      year: Number(data.year),
      inStock: Boolean(data.inStock),
    };

    try {
      const res = await addProduct(productData).unwrap();
      if (res?.success) toast.success(res?.message, { id: toastId, duration: 2000 });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create product', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <GenericForm
          onSubmit={onSubmit}
          resolver={zodResolver(ProductValidations.createProductValidationSchema)}
          isSuccess={isSuccess}
        >
          <h2 style={{ marginBottom: '2rem' }}>Add Product</h2>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomInput type="text" name="brand" label="Brand" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomInput type="text" name="model" label="Model" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomInput type="text" name="year" label="Year" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomInput type="text" name="price" label="Price" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomSelect
                options={productCategoryOptions ?? []}
                name="category"
                label="Category"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomInput type="text" name="quantity" label="Quantity" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CustomSelect options={inStockOptions ?? []} name="inStock" label="In Stock" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 16 }}>
              <CustomInput type="text" name="imageUrl" label="Image Url" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <CustomTextArea type="text" name="description" label="Description" />
            </Col>
          </Row>

          <Button htmlType="submit" disabled={isLoading}>
            Submit
          </Button>
        </GenericForm>
      </Col>
    </Row>
  );
};

export default AddProduct;
