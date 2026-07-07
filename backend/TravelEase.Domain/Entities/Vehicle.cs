namespace TravelEase.Domain.Entities;

public class Vehicle : BaseEntity
{
    public string VehicleType { get; set; } = string.Empty; // Car, Van, Bus
    public string VehicleNumber { get; set; } = string.Empty;
    public int Seats { get; set; }
    public string? DriverName { get; set; }
    public string? DriverPhone { get; set; }
    public bool IsAvailable { get; set; } = true;
    public string? ImageUrl { get; set; }
}