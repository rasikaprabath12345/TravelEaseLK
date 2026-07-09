using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.DTOs;
using TravelEase.Application.Services;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DestinationsController : ControllerBase
{
    private readonly IDestinationService _destinationService;

    public DestinationsController(IDestinationService destinationService)
    {
        _destinationService = destinationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search)
    {
        var destinations = await _destinationService.GetAllAsync(search);
        return Ok(new { success = true, data = destinations });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var destination = await _destinationService.GetByIdAsync(id);
        if (destination == null)
            return NotFound(new { success = false, message = "Destination not found" });
        
        return Ok(new { success = true, data = destination });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDestinationDto dto)
    {
        var destination = await _destinationService.CreateAsync(dto);
        return Ok(new { success = true, data = destination, message = "Destination created" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")] // <-- මෙන්න මේකයි අපි වෙනස් කළේ ("{id}" එකතු කළා)
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDestinationDto dto)
    {
        // URL එකෙන් එන ID එකයි, Data (dto) එක ඇතුලේ තියෙන ID එකයි සමානද කියලා බලන එක ආරක්ෂිතයි
        // (ඔයාගේ UpdateDestinationDto එකේ Id property එකක් තියෙනවා නම් මේක පාවිච්චි කරන්න පුළුවන්)
        /*
        if (id != dto.Id) 
        {
            return BadRequest(new { success = false, message = "ID mismatch" });
        }
        */

        var destination = await _destinationService.UpdateAsync(dto);
        return Ok(new { success = true, data = destination, message = "Destination updated" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _destinationService.DeleteAsync(id);
        if (!result)
            return NotFound(new { success = false, message = "Destination not found" });
        
        return Ok(new { success = true, message = "Destination deleted" });
    }
}