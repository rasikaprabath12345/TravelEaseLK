namespace TravelEase.Domain.Entities;

public class Wishlist : BaseEntity
{
    public int UserId { get; set; }
    public int PackageId { get; set; }
    
    public User User { get; set; } = null!;
    public Package Package { get; set; } = null!;
}