// Placeholder DestinationsController
using Microsoft.AspNetCore.Mvc;

namespace TravelEase.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("Destinations controller placeholder");
    }
}
