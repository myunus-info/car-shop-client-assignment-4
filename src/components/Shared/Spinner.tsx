import { Spin } from 'antd';

const Spinner: React.FC = () => {
  return (
    <Spin
      size="large"
      style={{
        width: '100%',
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default Spinner;
