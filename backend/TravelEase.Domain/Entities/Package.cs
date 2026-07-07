namespace TravelEase.Domain.Entities;

public class Package : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public int Duration { get; set; } // Days
    public int MaxSeats { get; set; }
    public int AvailableSeats { get; set; }
    public string? ImageUrl { get; set; }
    public int DestinationId { get; set; }
    public int? TourGuideId { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
    public string? IncludedServices { get; set; } // JSON
    public string? ExcludedServices { get; set; } // JSON
    public string? Itinerary { get; set; } // JSON
    public string? CancellationPolicy { get; set; }
    public double AverageRating { get; set; }
    
    // Navigation
    public Destination Destination { get; set; } = null!;
    public TourGuide? TourGuide { get; set; }
    public ICollection<PackageImage> Images { get; set; } = new List<PackageImage>();
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}

public class PackageImage : BaseEntity
{
    public int PackageId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int Order { get; set; }
    public Package Package { get; set; } = null!;
}