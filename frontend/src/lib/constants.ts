export const APP_NAME = 'TravelEase LK';
export const APP_DESCRIPTION = 'Premium Travel Agency Management System';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94771234567';

export const BOOKING_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
} as const;

export const USER_ROLES = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
} as const;

export const COUNTRIES = [
  'Sri Lanka',
  'India',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'China',
];