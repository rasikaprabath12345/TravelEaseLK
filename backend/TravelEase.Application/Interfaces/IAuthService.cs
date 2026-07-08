using TravelEase.Application.DTOs;

namespace TravelEase.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
    
    // CustomersController එකෙන් ඉල්ලන Method එක මෙන්න
    Task<object> GetAllUsersAsync(string search); 
}