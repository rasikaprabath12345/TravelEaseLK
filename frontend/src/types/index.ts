export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userId: number;
  profileImage?: string;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice: number;
  duration: number;
  maxSeats: number;
  maxGroupSize?: number;
  availableSeats: number;
  imageUrl?: string;
  destinationId: number;
  destinationName: string;
  tourGuideName?: string;
  isFeatured: boolean;
  isActive?: boolean;
  category?: string;
  difficultyLevel?: string;
  averageRating: number;
  totalReviews?: number;
  images: string[];
  inclusions?: string;
  exclusions?: string;
  createdAt: string;
  includedServices?: string;
  excludedServices?: string;
  itinerary?: string;
  cancellationPolicy?: string;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  shortDescription?: string;
  imageUrl?: string;
  bestTimeToVisit?: string;
  travelTips?: string;
  attractions?: string;
  latitude: number;
  longitude: number;
  images: string[];
  packageCount: number;
}

export interface Booking {
  id: number;
  bookingId: string;
  userId: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  country: string;
  numberOfAdults: number;
  numberOfChildren: number;
  travelDate: string;
  pickupLocation?: string;
  specialRequests?: string;
  totalPrice: number;
  status: string;
  paymentStatus?: string;
  packageName: string;
  packageImage?: string;
  createdAt: string;
}

export interface Review {
  id: number;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  author?: string;
  isPublished: boolean;
  publishedDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalBookings: number;
  totalPackages: number;
  pendingBookings: number;
  confirmedBookings: number;
  monthlyRevenue: number;
  totalRevenue: number;
}

export interface BookingAnalytics {
  month: string;
  bookingCount: number;
  revenue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  page?: number;
  pageSize?: number;
}