/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { useDeleteProductMutation } from '../../../store/features/admin/manageProducts.api';
import { useState } from 'react';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import { IProduct } from '../../../types';

interface DeleteProductModalProps {
  product: IProduct;
}
const DeleteProductModal = ({ product }: DeleteProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting product');

    try {
      const res = await deleteProduct(id).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 2000 });
        handleCloseModal();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete product', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Button onClick={handleOpenModal} variant="filled" type="primary" color="danger" size="small">
        Delete
      </Button>
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Card title="Delete Product">
          <Title style={{ color: 'orangered', marginBottom: '1rem' }} level={5}>
            Are you sure you want to delete the product?
          </Title>

          <Button
            onClick={() => handleDelete(product._id)}
            icon={<Trash />}
            type="primary"
            danger
            style={{ float: 'right' }}
          >
            Delete
          </Button>
        </Card>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
