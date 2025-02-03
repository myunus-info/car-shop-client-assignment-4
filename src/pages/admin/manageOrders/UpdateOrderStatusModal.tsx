/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import GenericForm from '../../../components/form/GenericForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import CustomSelect from '../../../components/form/CustomSelect';
import { Order } from './ManageOrders';
import { useUpdateOrderStatusMutation } from '../../../store/features/order/orderApi';

interface UpdateOrderModalProps {
  order: Order;
}

const UpdateOrderStatusModal = ({ order }: UpdateOrderModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateStatus, { isLoading, isSuccess }] = useUpdateOrderStatusMutation();
  const orderStatusOptions = [
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'Paid',
      value: 'Paid',
    },
    {
      label: 'Shipped',
      value: 'Shipped',
    },
    {
      label: 'Completed',
      value: 'Completed',
    },
    {
      label: 'Cancelled',
      value: 'Cancelled',
    },
  ];

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    const toastId = toast.loading('Updating status...');
    const statusData = {
      id: order._id,
      data,
    };

    try {
      const res = await updateStatus(statusData).unwrap();
      if (res?.success) toast.success(res?.message, { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status', { id: toastId });
    }
  };

  useEffect(() => {
    if (isSuccess) setIsModalOpen(false);
  }, [isSuccess]);

  return (
    <>
      <Button variant="solid" color="primary" type="primary" onClick={showModal}>
        Update status
      </Button>
      <Modal title="Update Order Status" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <GenericForm isSuccess={isSuccess} onSubmit={handleSubmit}>
          <CustomSelect name="status" label="Status" options={orderStatusOptions ?? []} />
          <Button disabled={isLoading} htmlType="submit">
            Submit
          </Button>
        </GenericForm>
      </Modal>
    </>
  );
};

export default UpdateOrderStatusModal;
