import { z } from 'zod';

const signUpValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, { message: "This field can't be empty" }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const loginValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const AuthValidations = {
  signUpValidationSchema,
  loginValidationSchema,
};
