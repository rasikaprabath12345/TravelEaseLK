namespace TravelEase.Domain.Entities;

public class TourGuide : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Photo { get; set; }
    public string? Description { get; set; }
    public int Experience { get; set; } // Years
    public string? Languages { get; set; } // JSON array
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public bool IsActive { get; set; } = true;
    
    // Navigation
    public ICollection<Package> Packages { get; set; } = new List<Package>();
}