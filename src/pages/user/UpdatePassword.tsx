/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from 'antd';
import GenericForm from '../../components/form/GenericForm';
import CustomInput from '../../components/form/CustomInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePasswordMutation } from '../../store/features/auth/authApi';
import { useEffect } from 'react';
import { toast } from 'sonner';

const updatePasswordValidationSchema = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
});

const UpdatePassword: React.FC = () => {
  const [updatePassword, { data: passwordData, isLoading, isSuccess, isError, error }] =
    useUpdatePasswordMutation();
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    await updatePassword(data);
  };

  const toastId = 'id-123';
  useEffect(() => {
    if (isLoading) {
      toast.loading('Updating password', { id: toastId });
    } else if (isSuccess && passwordData?.success) {
      toast.success(passwordData?.message, { id: toastId, duration: 2000 });
    } else if (isError) {
      toast.error((error as any)?.data?.message || 'Failed to update password', {
        id: toastId,
      });
    }
  }, [isSuccess, passwordData, isLoading, isError, error]);

  return (
    <Card>
      <h3 style={{ marginBottom: '1.5rem' }}>Update Password</h3>
      <GenericForm
        onSubmit={onSubmit}
        resolver={zodResolver(updatePasswordValidationSchema)}
        isSuccess={isSuccess}
      >
        <CustomInput type="text" name="oldPassword" label="Old Password" />
        <CustomInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit" disabled={isLoading}>
          Submit
        </Button>
      </GenericForm>
    </Card>
  );
};

export default UpdatePassword;
