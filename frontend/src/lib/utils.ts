import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function generateWhatsAppUrl(booking: {
  bookingId: string;
  packageName: string;
  travelDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  fullName: string;
  phoneNumber: string;
}): string {
  const phone = "94771234567"; // TravelEase LK WhatsApp number
  const message = `Hello TravelEase LK,%0A%0AI want to confirm my booking.%0A%0ABooking ID: ${booking.bookingId}%0APackage: ${booking.packageName}%0ATravel Date: ${new Date(booking.travelDate).toLocaleDateString()}%0AGuests: ${booking.numberOfAdults} Adults${booking.numberOfChildren > 0 ? `, ${booking.numberOfChildren} Children` : ''}%0ACustomer: ${booking.fullName}%0APhone: ${booking.phoneNumber}%0A%0APlease confirm my booking.%0A%0AThank you.`;
  
  return `https://wa.me/${phone}?text=${message}`;
}