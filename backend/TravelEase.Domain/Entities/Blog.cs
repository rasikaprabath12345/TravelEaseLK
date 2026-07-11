namespace TravelEase.Domain.Entities;

public class Blog : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? ImageUrl { get; set; }
    public string? VideoUrl { get; set; }
    public string? Author { get; set; }
    public bool IsPublished { get; set; } = false;
    public DateTime? PublishedDate { get; set; }
    public string? Tags { get; set; } // JSON
}