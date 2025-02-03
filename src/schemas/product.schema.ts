import { z } from 'zod';

const createProductValidationSchema = z.object({
  brand: z.string({ required_error: 'Brand is required' }),
  model: z.string({ required_error: 'Model is required' }),
  year: z.string({ required_error: 'Year is required' }),
  price: z.string({ required_error: 'Price is required' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    required_error: 'Category is required',
  }),
  description: z.string({ required_error: 'Description is required' }),
  quantity: z.string({ required_error: 'Quantity is required' }),
  inStock: z.boolean({ required_error: 'In Stock is required' }),
  imageUrl: z.string({ required_error: 'Image url is required' }),
});

const updateProductValidationSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  price: z.string().optional(),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']).optional(),
  description: z.string().optional(),
  quantity: z.string().optional(),
  inStock: z.boolean().optional(),
  imageUrl: z.string().optional(),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
