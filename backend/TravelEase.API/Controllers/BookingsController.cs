// Placeholder BookingsController
using Microsoft.AspNetCore.Mvc;

namespace TravelEase.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("Bookings controller placeholder");
    }
}
