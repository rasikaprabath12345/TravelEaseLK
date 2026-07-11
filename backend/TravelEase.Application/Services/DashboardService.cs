using Microsoft.EntityFrameworkCore;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;

namespace TravelEase.Application.Services;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetStatsAsync();
    Task<List<BookingAnalyticsDto>> GetBookingAnalyticsAsync();
    Task<List<PopularDestinationDto>> GetPopularDestinationsAsync();
}

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;

    public DashboardService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<DashboardStatsDto> GetStatsAsync()
    {
        var totalCustomers = await _unitOfWork.Repository<User>().Query()
            .CountAsync(u => u.Role == "Customer" && u.IsActive);

        var totalBookings = await _unitOfWork.Repository<Booking>().Query().CountAsync();
        var totalPackages = await _unitOfWork.Repository<Package>().Query().CountAsync(p => p.IsActive);
        var pendingBookings = await _unitOfWork.Repository<Booking>().Query()
            .CountAsync(b => b.Status == "Pending");
        var confirmedBookings = await _unitOfWork.Repository<Booking>().Query()
            .CountAsync(b => b.Status == "Confirmed");

        var monthlyRevenue = await _unitOfWork.Repository<Booking>().Query()
            .Where(b => b.CreatedAt.Month == DateTime.UtcNow.Month && 
                       b.CreatedAt.Year == DateTime.UtcNow.Year &&
                       b.Status != "Cancelled")
            .SumAsync(b => b.TotalPrice);

        var totalRevenue = await _unitOfWork.Repository<Booking>().Query()
            .Where(b => b.Status != "Cancelled")
            .SumAsync(b => b.TotalPrice);

        return new DashboardStatsDto
        {
            TotalCustomers = totalCustomers,
            TotalBookings = totalBookings,
            TotalPackages = totalPackages,
            PendingBookings = pendingBookings,
            ConfirmedBookings = confirmedBookings,
            MonthlyRevenue = monthlyRevenue,
            TotalRevenue = totalRevenue
        };
    }

    public async Task<List<BookingAnalyticsDto>> GetBookingAnalyticsAsync()
    {
        // Single query: fetch all non-cancelled bookings from the last 12 months
        var startDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1).AddMonths(-11);
        
        var monthlyData = await _unitOfWork.Repository<Booking>().Query().AsNoTracking()
            .Where(b => b.CreatedAt >= startDate && b.Status != "Cancelled")
            .GroupBy(b => new { b.CreatedAt.Year, b.CreatedAt.Month })
            .Select(g => new
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                BookingCount = g.Count(),
                Revenue = g.Sum(b => b.TotalPrice)
            })
            .ToListAsync();

        // Build the full 12-month list (including months with zero bookings)
        var months = new List<BookingAnalyticsDto>();
        for (int i = 11; i >= 0; i--)
        {
            var date = DateTime.UtcNow.AddMonths(-i);
            var data = monthlyData.FirstOrDefault(d => d.Year == date.Year && d.Month == date.Month);
            months.Add(new BookingAnalyticsDto
            {
                Month = date.ToString("MMM yyyy"),
                BookingCount = data?.BookingCount ?? 0,
                Revenue = data?.Revenue ?? 0
            });
        }

        return months;
    }

    public async Task<List<PopularDestinationDto>> GetPopularDestinationsAsync()
    {
        var destinations = await _unitOfWork.Repository<Booking>().Query().AsNoTracking()
            .Where(b => b.Status != "Cancelled")
            .GroupBy(b => b.Package.DestinationId)
            .Select(g => new PopularDestinationDto
            {
                Name = g.First().Package.Destination.Name,
                BookingCount = g.Count(),
                ImageUrl = g.First().Package.Destination.ImageUrl
            })
            .OrderByDescending(d => d.BookingCount)
            .Take(5)
            .ToListAsync();

        return destinations;
    }
}