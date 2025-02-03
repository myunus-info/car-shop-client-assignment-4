import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { TSelectProps } from '../../types';

const CustomSelect = ({ name, label = '', options, disabled, mode }: TSelectProps) => {
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
              help={<span style={helpStyles}>{helpMsg}</span>}
            >
              <Select
                mode={mode}
                size="large"
                style={{ width: '100%' }}
                {...field}
                options={options}
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

export default CustomSelect;
