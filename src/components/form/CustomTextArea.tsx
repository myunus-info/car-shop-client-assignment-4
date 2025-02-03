import { Form } from 'antd';
import { Controller } from 'react-hook-form';
import { TInputProps } from '../../types';
import TextArea from 'antd/es/input/TextArea';

const CustomTextArea = ({ name, disabled, label = '' }: TInputProps) => {
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
              <TextArea
                {...field}
                id={name}
                size="large"
                placeholder={label}
                disabled={disabled}
                autoSize={{ minRows: 3, maxRows: 15 }}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default CustomTextArea;
