namespace TravelEase.Application.DTOs;

public class BookingDto
{
    public int Id { get; set; }
    public string BookingId { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int NumberOfAdults { get; set; }
    public int NumberOfChildren { get; set; }
    public DateTime TravelDate { get; set; }
    public string? PickupLocation { get; set; }
    public string? SpecialRequests { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = "Unpaid";
    public string PackageName { get; set; } = string.Empty;
    public string? PackageImage { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateBookingDto
{
    public int PackageId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string? PassportOrNIC { get; set; }
    public int NumberOfAdults { get; set; }
    public int NumberOfChildren { get; set; }
    public DateTime TravelDate { get; set; }
    public string? PickupLocation { get; set; }
    public string? SpecialRequests { get; set; }
}

public class UpdateBookingStatusDto
{
    public int Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public string? PaymentStatus { get; set; }
}