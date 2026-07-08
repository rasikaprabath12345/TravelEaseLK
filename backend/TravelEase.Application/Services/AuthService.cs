using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces; 
using TravelEase.Domain.Entities;
using BCrypt.Net;

namespace TravelEase.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _configuration;

    public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration)
    {
        _unitOfWork = unitOfWork;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existingUsers = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == dto.Email);
        
        if (existingUsers != null && existingUsers.Any())
            throw new Exception("Email already registered");

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = HashPassword(dto.Password),
            PhoneNumber = dto.PhoneNumber,
            Role = "Customer",
            IsActive = true 
        };

        await _unitOfWork.Repository<User>().AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role,
            UserId = user.Id
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var users = await _unitOfWork.Repository<User>()
            .FindAsync(u => u.Email == dto.Email && u.IsActive);
        
        var foundUser = users?.FirstOrDefault();
        
        if (foundUser == null || !VerifyPassword(dto.Password, foundUser.PasswordHash))
            throw new Exception("Invalid email or password");

        var token = GenerateJwtToken(foundUser);

        return new AuthResponseDto
        {
            Token = token,
            FirstName = foundUser.FirstName,
            LastName = foundUser.LastName,
            Email = foundUser.Email,
            Role = foundUser.Role,
            UserId = foundUser.Id,
            ProfileImage = foundUser.ProfileImage
        };
    }

    // මෙන්න අපි අලුතින් එකතු කළ කොටස
    public async Task<object> GetAllUsersAsync(string search)
    {
        var dummyData = new[] { "User1", "User2" }; 
        return await Task.FromResult(dummyData);
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7), 
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    private bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}