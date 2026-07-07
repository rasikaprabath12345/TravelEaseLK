namespace TravelEase.Domain.Entities;

public class Hotel : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Rating { get; set; } // 1-5 stars
    public string? Facilities { get; set; } // JSON
    public string? ImageUrl { get; set; }
    public decimal PricePerNight { get; set; }
    public bool IsActive { get; set; } = true;
}