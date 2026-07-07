using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.Interfaces; // ඔබේ අදාළ Interface එක මෙතනට දාන්න

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")] // මෙය api/customers ලෙස ක්‍රියා කරයි
public class CustomersController : ControllerBase
{
    private readonly IAuthService _authService; // නැත්නම් IUserService එකක් පාවිච්චි කරන්න

    public CustomersController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCustomers([FromQuery] string search = "")
    {
        // ඔබේ Service එකෙන් දත්ත ගන්න (උදාහරණයක් ලෙස)
        var customers = await _authService.GetAllUsersAsync(search); 
        return Ok(new { success = true, data = customers });
    }
}