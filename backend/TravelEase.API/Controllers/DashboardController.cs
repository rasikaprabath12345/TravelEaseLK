// Placeholder DashboardController
using Microsoft.AspNetCore.Mvc;

namespace TravelEase.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("Dashboard controller placeholder");
    }
}
