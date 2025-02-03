/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import GenericForm from '../../../components/form/GenericForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from '../../../store/features/admin/manageUsers.api';
import CustomSelect from '../../../components/form/CustomSelect';

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
}

const UsersTable = () => {
  const { data: usersData, isFetching } = useGetAllUsersQuery(undefined);

  const tableData = usersData?.data?.map(({ _id, name, email, role, status }: TUser) => ({
    _id,
    key: _id,
    name,
    email,
    role,
    status,
  }));

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      width: '27.5%',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '27.5%',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      width: '15%',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: '15%',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item: { _id: string; status: 'active' | 'blocked' }) => (
        <ChangeUserStatusModal _id={item?._id} status={item!.status} />
      ),
      width: '15%',
    },
  ];

  const ChangeUserStatusModal = ({
    _id,
    status,
  }: {
    _id: string;
    status: 'active' | 'blocked';
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updateStatus, { isLoading, isSuccess }] = useUpdateUserStatusMutation();

    const userStatusOptions = [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Blocked',
        value: 'blocked',
      },
    ];

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleSubmit: SubmitHandler<FieldValues> = async data => {
      const toastId = toast.loading('Updating status...');
      try {
        const res = await updateStatus({ id: _id, data }).unwrap();
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
        <Button
          size="small"
          variant="filled"
          color={status === 'active' ? 'red' : 'orange'}
          type="primary"
          onClick={showModal}
        >
          {status === 'active' ? 'Block' : 'Unblock'}
        </Button>
        <Modal title="Update User Status" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <GenericForm isSuccess={isSuccess} onSubmit={handleSubmit}>
            <CustomSelect name="status" label="Status" options={userStatusOptions ?? []} />
            <Button disabled={isLoading} htmlType="submit">
              Submit
            </Button>
          </GenericForm>
        </Modal>
      </>
    );
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: 'sorter-icon' }}
      pagination={false}
    />
  );
};

export default UsersTable;
