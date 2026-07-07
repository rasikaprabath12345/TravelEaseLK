namespace TravelEase.Application.DTOs;

public class DashboardStatsDto
{
    public int TotalCustomers { get; set; }
    public int TotalBookings { get; set; }
    public int TotalPackages { get; set; }
    public int PendingBookings { get; set; }
    public int ConfirmedBookings { get; set; }
    public decimal MonthlyRevenue { get; set; }
    public decimal TotalRevenue { get; set; }
}

public class BookingAnalyticsDto
{
    public string Month { get; set; } = string.Empty;
    public int BookingCount { get; set; }
    public decimal Revenue { get; set; }
}

public class PopularDestinationDto
{
    public string Name { get; set; } = string.Empty;
    public int BookingCount { get; set; }
    public string? ImageUrl { get; set; }
}