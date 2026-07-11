import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed === 'main image url' || trimmed === 'image url' || trimmed === 'null' || trimmed === 'undefined') return false;
  return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('data:image');
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
  let phone = data.phone;
  if (!phone) {
    if (typeof window !== 'undefined') {
      phone = localStorage.getItem('site_whatsapp_number') || "94703348191";
    } else {
      phone = "94703348191";
    }
  }
  
  const displayDate = data.travelDate ? data.travelDate.split('T')[0] : '';
  const message = `Dear TravelEase LK Support,\n\nI would like to share my booking confirmation details:\n\n• Booking ID: ${data.bookingId}\n• Tour Package: ${data.packageName}\n• Travel Date: ${displayDate}\n• Guests: ${data.numberOfAdults || 0} Adult(s) & ${data.numberOfChildren || 0} Child(ren)\n• Customer Name: ${data.fullName || "N/A"}\n\nPlease let me know the next steps for payment verification and tour confirmation.\n\nThank you!`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}