using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.DTOs;
using TravelEase.Application.Services;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        // Debugging සඳහා
        Console.WriteLine($"Register Request: {dto.Email}, {dto.FirstName}");

        if (dto == null) return BadRequest("Invalid client request");

        try
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(new { success = true, data = result, message = "Registration successful" });
        }
        catch (Exception ex)
        {
            // Terminal එකේ දෝෂය පෙන්වයි
            Console.WriteLine($"Error: {ex.Message}");
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
    
    // Login method එක කලින් තිබූ පරිදිම තබා ගන්න
}