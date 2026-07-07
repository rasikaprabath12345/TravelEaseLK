using Microsoft.EntityFrameworkCore;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;

namespace TravelEase.Application.Services;

public interface IBookingService
{
    Task<IEnumerable<BookingDto>> GetAllAsync(int? userId = null, string? status = null, int page = 1, int pageSize = 10);
    Task<BookingDto?> GetByIdAsync(int id);
    Task<BookingDto> CreateAsync(CreateBookingDto dto, int userId);
    Task<BookingDto> UpdateStatusAsync(UpdateBookingStatusDto dto);
    Task<IEnumerable<BookingDto>> GetUserBookingsAsync(int userId);
    Task<int> GetTotalCountAsync(int? userId = null, string? status = null);
}

public class BookingService : IBookingService
{
    private readonly IUnitOfWork _unitOfWork;

    public BookingService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<BookingDto>> GetAllAsync(int? userId = null, string? status = null, int page = 1, int pageSize = 10)
    {
        var query = _unitOfWork.Repository<Booking>().Query()
            .Include(b => b.User)
            .Include(b => b.Package)
            .AsQueryable();

        if (userId.HasValue)
            query = query.Where(b => b.UserId == userId.Value);

        if (!string.IsNullOrEmpty(status))
            query = query.Where(b => b.Status == status);

        var bookings = await query
            .OrderByDescending(b => b.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return bookings.Select(MapToDto);
    }

    public async Task<BookingDto?> GetByIdAsync(int id)
    {
        var booking = await _unitOfWork.Repository<Booking>().Query()
            .Include(b => b.User)
            .Include(b => b.Package)
            .FirstOrDefaultAsync(b => b.Id == id);

        return booking == null ? null : MapToDto(booking);
    }

    public async Task<BookingDto> CreateAsync(CreateBookingDto dto, int userId)
    {
        var package = await _unitOfWork.Repository<Package>().GetByIdAsync(dto.PackageId)
            ?? throw new Exception("Package not found");

        var totalGuests = dto.NumberOfAdults + dto.NumberOfChildren;
        if (totalGuests > package.AvailableSeats)
            throw new Exception("Not enough seats available");

        var totalPrice = (dto.NumberOfAdults * package.Price) + (dto.NumberOfChildren * (package.Price * 0.7m));

        // Generate booking ID
        var bookingCount = await _unitOfWork.Repository<Booking>().Query().CountAsync();
        var bookingId = $"TE{DateTime.UtcNow.Year}{(bookingCount + 1).ToString().PadLeft(4, '0')}";

        var booking = new Booking
        {
            BookingId = bookingId,
            UserId = userId,
            PackageId = dto.PackageId,
            FullName = dto.FullName,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            Country = dto.Country,
            PassportOrNIC = dto.PassportOrNIC,
            NumberOfAdults = dto.NumberOfAdults,
            NumberOfChildren = dto.NumberOfChildren,
            TravelDate = dto.TravelDate,
            PickupLocation = dto.PickupLocation,
            SpecialRequests = dto.SpecialRequests,
            TotalPrice = totalPrice,
            Status = "Pending"
        };

        // Update available seats
        package.AvailableSeats -= totalGuests;
        await _unitOfWork.Repository<Package>().UpdateAsync(package);

        await _unitOfWork.Repository<Booking>().AddAsync(booking);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(booking);
    }

    public async Task<BookingDto> UpdateStatusAsync(UpdateBookingStatusDto dto)
    {
        var booking = await _unitOfWork.Repository<Booking>().Query()
            .Include(b => b.User)
            .Include(b => b.Package)
            .FirstOrDefaultAsync(b => b.Id == dto.Id)
            ?? throw new Exception("Booking not found");

        var oldStatus = booking.Status;
        booking.Status = dto.Status;
        booking.Notes = dto.Notes;
        booking.UpdatedAt = DateTime.UtcNow;

        // If cancelled, restore seats
        if (dto.Status == "Cancelled" && oldStatus != "Cancelled")
        {
            var package = await _unitOfWork.Repository<Package>().GetByIdAsync(booking.PackageId);
            if (package != null)
            {
                package.AvailableSeats += booking.NumberOfAdults + booking.NumberOfChildren;
                await _unitOfWork.Repository<Package>().UpdateAsync(package);
            }
        }

        await _unitOfWork.Repository<Booking>().UpdateAsync(booking);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(booking);
    }

    public async Task<IEnumerable<BookingDto>> GetUserBookingsAsync(int userId)
    {
        var bookings = await _unitOfWork.Repository<Booking>().Query()
            .Include(b => b.Package)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();

        return bookings.Select(MapToDto);
    }

    public async Task<int> GetTotalCountAsync(int? userId = null, string? status = null)
    {
        var query = _unitOfWork.Repository<Booking>().Query().AsQueryable();

        if (userId.HasValue)
            query = query.Where(b => b.UserId == userId.Value);

        if (!string.IsNullOrEmpty(status))
            query = query.Where(b => b.Status == status);

        return await query.CountAsync();
    }

    private BookingDto MapToDto(Booking b)
    {
        return new BookingDto
        {
            Id = b.Id,
            BookingId = b.BookingId,
            UserId = b.UserId,
            CustomerName = b.FullName,
            Email = b.Email,
            PhoneNumber = b.PhoneNumber,
            Country = b.Country,
            NumberOfAdults = b.NumberOfAdults,
            NumberOfChildren = b.NumberOfChildren,
            TravelDate = b.TravelDate,
            PickupLocation = b.PickupLocation,
            SpecialRequests = b.SpecialRequests,
            TotalPrice = b.TotalPrice,
            Status = b.Status,
            PackageName = b.Package?.Name ?? "",
            PackageImage = b.Package?.ImageUrl,
            CreatedAt = b.CreatedAt
        };
    }
}