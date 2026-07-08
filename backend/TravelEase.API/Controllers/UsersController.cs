using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;

    public UsersController(IAuthService authService, IUnitOfWork unitOfWork)
    {
        _authService = authService;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search)
    {
        var result = await _authService.GetAllUsersAsync(search ?? "");
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(id);
        if (user == null)
        {
            return NotFound(new { success = false, message = "User not found" });
        }

        return Ok(new
        {
            success = true,
            data = new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.PhoneNumber,
                user.Country,
                user.Role,
                user.IsActive,
                user.CreatedAt
            }
        });
    }
}
