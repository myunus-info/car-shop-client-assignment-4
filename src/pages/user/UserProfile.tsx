import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { useGetUserProfileQuery } from '../../store/features/user/userApi';
import Spinner from '../../components/Shared/Spinner';

const { Title, Text } = Typography;

interface UserProfileProps {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'blocked';
}

const UserProfile: React.FC = () => {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined);

  const getStatusTag = (status: UserProfileProps['status']) => {
    switch (status) {
      case 'active':
        return <Tag color="green">Active</Tag>;
      case 'blocked':
        return <Tag color="orange">Blocked</Tag>;
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Card style={{ maxWidth: 500, margin: '20px auto', textAlign: 'center' }}>
            <Title level={3}>{userProfile?.data?.name}</Title>
            <Text type="secondary">{userProfile?.data?.email}</Text>
            <br />
            <Text strong style={{ margin: '1rem 0', display: 'inline-block' }}>
              Role: {userProfile?.data?.role}
            </Text>
            <br />
            {getStatusTag(userProfile?.data?.status)}
          </Card>
        </>
      )}
    </>
  );
};

export default UserProfile;
