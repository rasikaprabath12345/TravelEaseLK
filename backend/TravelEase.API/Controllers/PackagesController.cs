// Placeholder PackagesController
using Microsoft.AspNetCore.Mvc;

namespace TravelEase.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("Packages controller placeholder");
    }
}
