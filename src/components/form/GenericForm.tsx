import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TFormConfig, TFormProps } from '../../types';
import { Form } from 'antd';
import { useEffect } from 'react';

const GenericForm = ({ onSubmit, children, defaultValues, resolver, isSuccess }: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) formConfig['defaultValues'] = defaultValues;
  if (resolver) formConfig['resolver'] = resolver;

  const methods = useForm(formConfig);

  const handleSubmit: SubmitHandler<FieldValues> = data => {
    onSubmit(data);
    // methods.reset();
  };

  useEffect(() => {
    if (isSuccess) methods.reset();
  }, [isSuccess, methods]);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(handleSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default GenericForm;
