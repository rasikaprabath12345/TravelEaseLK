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

    // ලියාපදිංචි වීමේ method එක
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (dto == null) return BadRequest("Invalid client request");

        try
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(new { success = true, data = result, message = "Registration successful" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    // Login වීමේ method එක (අලුතින් එකතු කළා)
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (dto == null) return BadRequest("Invalid login request");

        try
        {
            var result = await _authService.LoginAsync(dto);
            return Ok(new { success = true, data = result, message = "Login successful" });
        }
        catch (Exception ex)
        {
            // Unauthorized (401) Error එක පෙන්වීම සුදුසුයි
            return Unauthorized(new { success = false, message = "Invalid email or password" });
        }
    }
}