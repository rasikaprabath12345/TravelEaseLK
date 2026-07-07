// Placeholder AuthController
using Microsoft.AspNetCore.Mvc;

namespace TravelEase.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("Auth controller placeholder");
    }
}
