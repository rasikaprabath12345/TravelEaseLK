using Microsoft.EntityFrameworkCore;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;

namespace TravelEase.Application.Services;

public interface IPackageService
{
    Task<IEnumerable<PackageDto>> GetAllAsync(string? search = null, int? destinationId = null, 
        decimal? minPrice = null, decimal? maxPrice = null, string? sortBy = null, int page = 1, int pageSize = 10);
    Task<PackageDto?> GetByIdAsync(int id);
    Task<IEnumerable<PackageDto>> GetFeaturedAsync();
    Task<PackageDto> CreateAsync(CreatePackageDto dto);
    Task<PackageDto> UpdateAsync(UpdatePackageDto dto);
    Task<bool> DeleteAsync(int id);
    Task<int> GetTotalCountAsync(string? search = null, int? destinationId = null);
}

public class PackageService : IPackageService
{
    private readonly IUnitOfWork _unitOfWork;

    public PackageService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<PackageDto>> GetAllAsync(string? search = null, int? destinationId = null,
        decimal? minPrice = null, decimal? maxPrice = null, string? sortBy = null, int page = 1, int pageSize = 10)
    {
        var query = _unitOfWork.Repository<Package>().Query().AsNoTracking()
            .Where(p => p.IsActive);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));

        if (destinationId.HasValue)
            query = query.Where(p => p.DestinationId == destinationId.Value);

        if (minPrice.HasValue)
            query = query.Where(p => p.Price >= minPrice.Value);

        if (maxPrice.HasValue)
            query = query.Where(p => p.Price <= maxPrice.Value);

        query = sortBy?.ToLower() switch
        {
            "price_asc" => query.OrderBy(p => p.Price),
            "price_desc" => query.OrderByDescending(p => p.Price),
            "rating" => query.OrderByDescending(p => p.AverageRating),
            "newest" => query.OrderByDescending(p => p.CreatedAt),
            _ => query.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.CreatedAt)
        };

        var packages = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PackageDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ShortDescription = p.ShortDescription,
                Price = p.Price,
                OriginalPrice = p.OriginalPrice,
                Duration = p.Duration,
                MaxSeats = p.MaxSeats,
                AvailableSeats = p.AvailableSeats,
                ImageUrl = p.ImageUrl,
                DestinationId = p.DestinationId,
                DestinationName = p.Destination != null ? p.Destination.Name : "",
                TourGuideName = p.TourGuide != null ? p.TourGuide.Name : null,
                IsFeatured = p.IsFeatured,
                AverageRating = p.AverageRating,
                Images = p.Images.OrderBy(i => i.Order).Select(i => i.ImageUrl).ToList(),
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();

        return packages;
    }

    public async Task<PackageDto?> GetByIdAsync(int id)
    {
        var package = await _unitOfWork.Repository<Package>().Query().AsNoTracking()
            .Where(p => p.Id == id && p.IsActive)
            .Select(p => new PackageDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ShortDescription = p.ShortDescription,
                Price = p.Price,
                OriginalPrice = p.OriginalPrice,
                Duration = p.Duration,
                MaxSeats = p.MaxSeats,
                AvailableSeats = p.AvailableSeats,
                ImageUrl = p.ImageUrl,
                DestinationId = p.DestinationId,
                DestinationName = p.Destination != null ? p.Destination.Name : "",
                TourGuideName = p.TourGuide != null ? p.TourGuide.Name : null,
                IsFeatured = p.IsFeatured,
                AverageRating = p.AverageRating,
                Images = new List<string>(),
                CreatedAt = p.CreatedAt
            })
            .FirstOrDefaultAsync();

        return package;
    }

    public async Task<IEnumerable<PackageDto>> GetFeaturedAsync()
    {
        var packages = await _unitOfWork.Repository<Package>().Query().AsNoTracking()
            .Where(p => p.IsActive && p.IsFeatured)
            .Take(8)
            .Select(p => new PackageDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ShortDescription = p.ShortDescription,
                Price = p.Price,
                OriginalPrice = p.OriginalPrice,
                Duration = p.Duration,
                MaxSeats = p.MaxSeats,
                AvailableSeats = p.AvailableSeats,
                ImageUrl = p.ImageUrl,
                DestinationId = p.DestinationId,
                DestinationName = p.Destination != null ? p.Destination.Name : "",
                TourGuideName = p.TourGuide != null ? p.TourGuide.Name : null,
                IsFeatured = p.IsFeatured,
                AverageRating = p.AverageRating,
                Images = new List<string>(),
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();

        return packages;
    }

    public async Task<PackageDto> CreateAsync(CreatePackageDto dto)
    {
        var package = new Package
        {
            Name = dto.Name,
            Description = dto.Description,
            ShortDescription = dto.ShortDescription,
            Price = dto.Price,
            OriginalPrice = dto.OriginalPrice,
            Duration = dto.Duration,
            MaxSeats = dto.MaxSeats,
            AvailableSeats = dto.MaxSeats,
            ImageUrl = dto.ImageUrl,
            DestinationId = dto.DestinationId,
            TourGuideId = dto.TourGuideId,
            IsFeatured = dto.IsFeatured,
            IncludedServices = dto.IncludedServices,
            ExcludedServices = dto.ExcludedServices,
            Itinerary = dto.Itinerary,
            CancellationPolicy = dto.CancellationPolicy
        };

        await _unitOfWork.Repository<Package>().AddAsync(package);
        await _unitOfWork.SaveChangesAsync();

        return new PackageDto
        {
            Id = package.Id,
            Name = package.Name,
            Description = package.Description,
            Price = package.Price,
            OriginalPrice = package.OriginalPrice,
            Duration = package.Duration,
            MaxSeats = package.MaxSeats,
            AvailableSeats = package.AvailableSeats,
            ImageUrl = package.ImageUrl,
            DestinationId = package.DestinationId,
            IsFeatured = package.IsFeatured,
            CreatedAt = package.CreatedAt
        };
    }

    public async Task<PackageDto> UpdateAsync(UpdatePackageDto dto)
    {
        var package = await _unitOfWork.Repository<Package>().GetByIdAsync(dto.Id)
            ?? throw new Exception("Package not found");

        package.Name = dto.Name;
        package.Description = dto.Description;
        package.ShortDescription = dto.ShortDescription;
        package.Price = dto.Price;
        package.OriginalPrice = dto.OriginalPrice;
        package.Duration = dto.Duration;
        package.MaxSeats = dto.MaxSeats;
        package.ImageUrl = dto.ImageUrl;
        package.DestinationId = dto.DestinationId;
        package.TourGuideId = dto.TourGuideId;
        package.IsFeatured = dto.IsFeatured;
        package.IncludedServices = dto.IncludedServices;
        package.ExcludedServices = dto.ExcludedServices;
        package.Itinerary = dto.Itinerary;
        package.CancellationPolicy = dto.CancellationPolicy;
        package.UpdatedAt = DateTime.UtcNow;

        await _unitOfWork.Repository<Package>().UpdateAsync(package);
        await _unitOfWork.SaveChangesAsync();

        return new PackageDto
        {
            Id = package.Id,
            Name = package.Name,
            Description = package.Description,
            Price = package.Price,
            OriginalPrice = package.OriginalPrice,
            Duration = package.Duration,
            MaxSeats = package.MaxSeats,
            AvailableSeats = package.AvailableSeats,
            ImageUrl = package.ImageUrl,
            DestinationId = package.DestinationId,
            IsFeatured = package.IsFeatured,
            CreatedAt = package.CreatedAt
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var package = await _unitOfWork.Repository<Package>().GetByIdAsync(id);
        if (package == null) return false;

        package.IsActive = false;
        package.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.Repository<Package>().UpdateAsync(package);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<int> GetTotalCountAsync(string? search = null, int? destinationId = null)
    {
        var query = _unitOfWork.Repository<Package>().Query().AsNoTracking().Where(p => p.IsActive);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Name.Contains(search));

        if (destinationId.HasValue)
            query = query.Where(p => p.DestinationId == destinationId.Value);

        return await query.CountAsync();
    }
}