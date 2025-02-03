/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, Col, Modal, Row } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useUpdateProductMutation } from '../../../store/features/admin/manageProducts.api';
import GenericForm from '../../../components/form/GenericForm';
import CustomInput from '../../../components/form/CustomInput';
import { ProductValidations } from '../../../schemas/product.schema';
import CustomSelect from '../../../components/form/CustomSelect';
import CustomTextArea from '../../../components/form/CustomTextArea';
import { IProduct } from '../../../types';
import { useState } from 'react';

interface UpdateProductModalProps {
  product: IProduct;
}

const UpdateProductModal = ({ product }: UpdateProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const productCategoryOptions = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'].map(item => ({
    label: item,
    value: item,
  }));

  const inStockOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const defaultValues = {
    model: product.model,
    description: product.description,
    quantity: String(product.quantity),
    imageUrl: product.imageUrl,
    category: product.category,
    brand: product.brand,
    price: String(product.price),
    year: String(product.year),
    inStock: Boolean(product.inStock),
  };

  const onSubmit: SubmitHandler<FieldValues> = async updatedProduct => {
    console.log(updatedProduct);
    const toastId = toast.loading('Updating product...');
    const productData = {
      id: product?._id,
      data: {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        quantity: Number(updatedProduct.quantity),
        year: Number(updatedProduct.year),
        inStock: Boolean(updatedProduct.inStock),
      },
    };

    try {
      const res = await updateProduct(productData).unwrap();
      if (res?.success) toast.success(res?.message, { id: toastId, duration: 2000 });
      handleCloseModal();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update product', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Button onClick={handleOpenModal} color="purple" variant="filled" size="small">
        Update
      </Button>

      <Modal width={900} open={open} onCancel={handleCloseModal} footer={false}>
        <Row>
          <Col span={24}>
            <GenericForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(ProductValidations.createProductValidationSchema)}
              isSuccess={isSuccess}
            >
              <h2 style={{ marginBottom: '2rem' }}>Update Product</h2>
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
      </Modal>
    </>
  );
};

export default UpdateProductModal;
