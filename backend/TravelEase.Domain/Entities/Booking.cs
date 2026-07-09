namespace TravelEase.Domain.Entities;

public class Booking : BaseEntity
{
    public string BookingId { get; set; } = string.Empty; // TE20260001
    public int UserId { get; set; }
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
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Cancelled, Completed
    public string PaymentStatus { get; set; } = "Unpaid"; // Unpaid, Paid
    public string? Notes { get; set; }
    
    // Navigation
    public User User { get; set; } = null!;
    public Package Package { get; set; } = null!;
}