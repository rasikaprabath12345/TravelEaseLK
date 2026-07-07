using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.DTOs;
using TravelEase.Application.Services;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
    private string GetUserRole() => User.FindFirst(ClaimTypes.Role)?.Value ?? "";

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        int? userId = GetUserRole() == "Admin" ? null : GetUserId();
        var bookings = await _bookingService.GetAllAsync(userId, status, page, pageSize);
        var total = await _bookingService.GetTotalCountAsync(userId, status);
        
        return Ok(new { success = true, data = bookings, total, page, pageSize });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var booking = await _bookingService.GetByIdAsync(id);
        if (booking == null)
            return NotFound(new { success = false, message = "Booking not found" });
        
        if (GetUserRole() != "Admin" && booking.UserId != GetUserId())
            return Forbid();
        
        return Ok(new { success = true, data = booking });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
    {
        try
        {
            var booking = await _bookingService.CreateAsync(dto, GetUserId());
            return Ok(new { success = true, data = booking, message = "Booking created successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("status")]
    public async Task<IActionResult> UpdateStatus([FromBody] UpdateBookingStatusDto dto)
    {
        try
        {
            var booking = await _bookingService.UpdateStatusAsync(dto);
            return Ok(new { success = true, data = booking, message = "Booking status updated" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
}