namespace TravelEase.Domain.Entities;

public class Destination : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? ImageUrl { get; set; }
    public string? BestTimeToVisit { get; set; }
    public string? TravelTips { get; set; }
    public string? Attractions { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public bool IsActive { get; set; } = true;
    
    // Navigation
    public ICollection<DestinationImage> Images { get; set; } = new List<DestinationImage>();
    public ICollection<Package> Packages { get; set; } = new List<Package>();
}

public class DestinationImage : BaseEntity
{
    public int DestinationId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int Order { get; set; }
    public Destination Destination { get; set; } = null!;
}