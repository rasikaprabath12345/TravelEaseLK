namespace TravelEase.Application.DTOs;

public class PackageDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public int Duration { get; set; }
    public int MaxSeats { get; set; }
    public int AvailableSeats { get; set; }
    public string? ImageUrl { get; set; }
    public int DestinationId { get; set; }
    public string DestinationName { get; set; } = string.Empty;
    public string? TourGuideName { get; set; }
    public bool IsFeatured { get; set; }
    public double AverageRating { get; set; }
    public List<string> Images { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class CreatePackageDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public int Duration { get; set; }
    public int MaxSeats { get; set; }
    public string? ImageUrl { get; set; }
    public int DestinationId { get; set; }
    public int? TourGuideId { get; set; }
    public bool IsFeatured { get; set; }
    public string? IncludedServices { get; set; }
    public string? ExcludedServices { get; set; }
    public string? Itinerary { get; set; }
    public string? CancellationPolicy { get; set; }
    public List<string> Images { get; set; } = new();
}

public class UpdatePackageDto : CreatePackageDto
{
    public int Id { get; set; }
}