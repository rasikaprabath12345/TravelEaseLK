namespace TravelEase.Application.DTOs;

public class ReviewDto
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? UserImage { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateReviewDto
{
    public int PackageId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
}