namespace TravelEase.Domain.Entities;

public class Review : BaseEntity
{
    public int UserId { get; set; }
    public int PackageId { get; set; }
    public int Rating { get; set; } // 1-5
    public string Comment { get; set; } = string.Empty;
    public bool IsApproved { get; set; } = false;
    
    // Navigation
    public User User { get; set; } = null!;
    public Package Package { get; set; } = null!;
}