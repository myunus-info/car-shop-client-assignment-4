/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

export type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  isSuccess?: boolean;
} & TFormConfig;

export type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  prefix?: ReactNode;
};

type TOptions = {
  label: string;
  value: string | boolean;
  disabled?: boolean;
};

export type TSelectProps = {
  name: string;
  label?: string;
  options: TOptions[];
  disabled?: boolean;
  mode?: 'multiple' | undefined;
};
