import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
  }).format(price)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date))
}

export function generateWhatsAppUrl(data: {
  bookingId: string;
  packageName: string;
  travelDate: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  fullName?: string;
  phoneNumber?: string;
  phone?: string;
}) {
  const phone = data.phone || "94770000000";
  const message = `Booking confirmed! ID: ${data.bookingId}, Package: ${data.packageName}, Date: ${data.travelDate}, Guests: ${data.numberOfAdults || 0} Adults, ${data.numberOfChildren || 0} Children. Customer: ${data.fullName || "N/A"}`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}