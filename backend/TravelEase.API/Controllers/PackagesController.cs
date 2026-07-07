using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.DTOs;
using TravelEase.Application.Services;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackagesController : ControllerBase
{
    private readonly IPackageService _packageService;

    public PackagesController(IPackageService packageService)
    {
        _packageService = packageService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int? destinationId,
        [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice, [FromQuery] string? sortBy,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var packages = await _packageService.GetAllAsync(search, destinationId, minPrice, maxPrice, sortBy, page, pageSize);
        var total = await _packageService.GetTotalCountAsync(search, destinationId);
        
        return Ok(new { success = true, data = packages, total, page, pageSize });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var package = await _packageService.GetByIdAsync(id);
        if (package == null)
            return NotFound(new { success = false, message = "Package not found" });
        
        return Ok(new { success = true, data = package });
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured()
    {
        var packages = await _packageService.GetFeaturedAsync();
        return Ok(new { success = true, data = packages });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePackageDto dto)
    {
        var package = await _packageService.CreateAsync(dto);
        return Ok(new { success = true, data = package, message = "Package created successfully" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdatePackageDto dto)
    {
        var package = await _packageService.UpdateAsync(dto);
        return Ok(new { success = true, data = package, message = "Package updated successfully" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _packageService.DeleteAsync(id);
        if (!result)
            return NotFound(new { success = false, message = "Package not found" });
        
        return Ok(new { success = true, message = "Package deleted successfully" });
    }
}