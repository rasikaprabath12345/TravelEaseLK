using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.Services;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _dashboardService.GetStatsAsync();
        return Ok(new { success = true, data = stats });
    }

    [HttpGet("analytics")]
    public async Task<IActionResult> GetAnalytics()
    {
        var analytics = await _dashboardService.GetBookingAnalyticsAsync();
        return Ok(new { success = true, data = analytics });
    }

    [HttpGet("popular-destinations")]
    public async Task<IActionResult> GetPopularDestinations()
    {
        var destinations = await _dashboardService.GetPopularDestinationsAsync();
        return Ok(new { success = true, data = destinations });
    }
}