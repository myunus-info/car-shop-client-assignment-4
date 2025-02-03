import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { TInputProps } from '../../types';

const CustomInput = ({ type, name, disabled, prefix, label = '' }: TInputProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          const errorStatus = error ? 'error' : 'success';
          const helpMsg = error ? error.message : '';
          const helpStyles = { color: 'crimson', marginBottom: '1rem' };

          return (
            <Form.Item
              label={label}
              validateStatus={errorStatus}
              help={<p style={helpStyles}>{helpMsg}</p>}
            >
              <Input
                {...field}
                prefix={prefix}
                type={type}
                id={name}
                size="large"
                placeholder={label}
                disabled={disabled}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default CustomInput;
