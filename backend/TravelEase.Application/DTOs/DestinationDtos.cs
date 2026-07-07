namespace TravelEase.Application.DTOs;

public class DestinationDto
{
    public int Id { get; set; }
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
    public List<string> Images { get; set; } = new();
    public int PackageCount { get; set; }
}

public class CreateDestinationDto
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
}

public class UpdateDestinationDto : CreateDestinationDto
{
    public int Id { get; set; }
}