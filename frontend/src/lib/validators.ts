import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().optional(),
});

export const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Valid phone number required'),
  country: z.string().min(2, 'Country is required'),
  passportOrNIC: z.string().optional(),
  numberOfAdults: z.number().min(1, 'At least 1 adult'),
  numberOfChildren: z.number().min(0),
  travelDate: z.string().min(1, 'Travel date is required'),
  pickupLocation: z.string().optional(),
  specialRequests: z.string().optional(),
});