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
        var months = new List<BookingAnalyticsDto>();
        
        for (int i = 11; i >= 0; i--)
        {
            var date = DateTime.UtcNow.AddMonths(-i);
            var monthStart = new DateTime(date.Year, date.Month, 1);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);

            var bookings = await _unitOfWork.Repository<Booking>().Query()
                .Where(b => b.CreatedAt >= monthStart && b.CreatedAt <= monthEnd && b.Status != "Cancelled")
                .ToListAsync();

            months.Add(new BookingAnalyticsDto
            {
                Month = date.ToString("MMM yyyy"),
                BookingCount = bookings.Count,
                Revenue = bookings.Sum(b => b.TotalPrice)
            });
        }

        return months;
    }

    public async Task<List<PopularDestinationDto>> GetPopularDestinationsAsync()
    {
        var destinations = await _unitOfWork.Repository<Booking>().Query()
            .Include(b => b.Package)
            .ThenInclude(p => p.Destination)
            .Where(b => b.Status != "Cancelled")
            .GroupBy(b => b.Package.Destination)
            .Select(g => new PopularDestinationDto
            {
                Name = g.Key.Name,
                BookingCount = g.Count(),
                ImageUrl = g.Key.ImageUrl
            })
            .OrderByDescending(d => d.BookingCount)
            .Take(5)
            .ToListAsync();

        return destinations;
    }
}