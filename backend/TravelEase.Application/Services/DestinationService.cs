using Microsoft.EntityFrameworkCore;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;

namespace TravelEase.Application.Services;

public interface IDestinationService
{
    Task<IEnumerable<DestinationDto>> GetAllAsync(string? search = null);
    Task<DestinationDto?> GetByIdAsync(int id);
    Task<DestinationDto> CreateAsync(CreateDestinationDto dto);
    Task<DestinationDto> UpdateAsync(UpdateDestinationDto dto);
    Task<bool> DeleteAsync(int id);
}

public class DestinationService : IDestinationService
{
    private readonly IUnitOfWork _unitOfWork;

    public DestinationService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<DestinationDto>> GetAllAsync(string? search = null)
    {
        var query = _unitOfWork.Repository<Destination>().Query().AsNoTracking()
            .Where(d => d.IsActive);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(d => d.Name.Contains(search) || d.Country.Contains(search));

        var destinations = await query.Select(d => new DestinationDto
        {
            Id = d.Id,
            Name = d.Name,
            Country = d.Country,
            Description = d.Description,
            ShortDescription = d.ShortDescription,
            ImageUrl = d.ImageUrl,
            BestTimeToVisit = d.BestTimeToVisit,
            TravelTips = d.TravelTips,
            Attractions = d.Attractions,
            Latitude = d.Latitude,
            Longitude = d.Longitude,
            Images = d.Images.OrderBy(i => i.Order).Select(i => i.ImageUrl).ToList(),
            PackageCount = d.Packages.Count(p => p.IsActive)
        }).ToListAsync();

        return destinations;
    }

    public async Task<DestinationDto?> GetByIdAsync(int id)
    {
        var destination = await _unitOfWork.Repository<Destination>().Query().AsNoTracking()
            .Where(d => d.Id == id && d.IsActive)
            .Select(d => new DestinationDto
            {
                Id = d.Id,
                Name = d.Name,
                Country = d.Country,
                Description = d.Description,
                ShortDescription = d.ShortDescription,
                ImageUrl = d.ImageUrl,
                BestTimeToVisit = d.BestTimeToVisit,
                TravelTips = d.TravelTips,
                Attractions = d.Attractions,
                Latitude = d.Latitude,
                Longitude = d.Longitude,
                Images = d.Images.OrderBy(i => i.Order).Select(i => i.ImageUrl).ToList(),
                PackageCount = d.Packages.Count(p => p.IsActive)
            })
            .FirstOrDefaultAsync();

        return destination;
    }

    public async Task<DestinationDto> CreateAsync(CreateDestinationDto dto)
    {
        var destination = new Destination
        {
            Name = dto.Name,
            Country = dto.Country,
            Description = dto.Description,
            ShortDescription = dto.ShortDescription,
            ImageUrl = dto.ImageUrl,
            BestTimeToVisit = dto.BestTimeToVisit,
            TravelTips = dto.TravelTips,
            Attractions = dto.Attractions,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

        await _unitOfWork.Repository<Destination>().AddAsync(destination);
        await _unitOfWork.SaveChangesAsync();

        return new DestinationDto
        {
            Id = destination.Id,
            Name = destination.Name,
            Country = destination.Country,
            Description = destination.Description,
            ImageUrl = destination.ImageUrl,
            Latitude = destination.Latitude,
            Longitude = destination.Longitude
        };
    }

    public async Task<DestinationDto> UpdateAsync(UpdateDestinationDto dto)
    {
        var destination = await _unitOfWork.Repository<Destination>().GetByIdAsync(dto.Id)
            ?? throw new Exception("Destination not found");

        destination.Name = dto.Name;
        destination.Country = dto.Country;
        destination.Description = dto.Description;
        destination.ShortDescription = dto.ShortDescription;
        destination.ImageUrl = dto.ImageUrl;
        destination.BestTimeToVisit = dto.BestTimeToVisit;
        destination.TravelTips = dto.TravelTips;
        destination.Attractions = dto.Attractions;
        destination.Latitude = dto.Latitude;
        destination.Longitude = dto.Longitude;
        destination.UpdatedAt = DateTime.UtcNow;

        await _unitOfWork.Repository<Destination>().UpdateAsync(destination);
        await _unitOfWork.SaveChangesAsync();

        return new DestinationDto
        {
            Id = destination.Id,
            Name = destination.Name,
            Country = destination.Country,
            Description = destination.Description,
            ImageUrl = destination.ImageUrl
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var destination = await _unitOfWork.Repository<Destination>().GetByIdAsync(id);
        if (destination == null) return false;

        destination.IsActive = false;
        destination.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.Repository<Destination>().UpdateAsync(destination);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}