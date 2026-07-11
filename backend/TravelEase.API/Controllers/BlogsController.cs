using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelEase.Application.DTOs;
using TravelEase.Application.Services;

namespace TravelEase.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly IBlogService _blogService;

    public BlogsController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] bool? onlyPublished = true,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var blogs = await _blogService.GetAllAsync(search, onlyPublished, page, pageSize);
        var total = await _blogService.GetTotalCountAsync(search, onlyPublished);

        return Ok(new { success = true, data = blogs, total, page, pageSize });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var blog = await _blogService.GetByIdAsync(id);
        if (blog == null)
            return NotFound(new { success = false, message = "Blog post not found" });

        return Ok(new { success = true, data = blog });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBlogDto dto)
    {
        try
        {
            var blog = await _blogService.CreateAsync(dto);
            return Ok(new { success = true, data = blog, message = "Blog post created successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateBlogDto dto)
    {
        try
        {
            var blog = await _blogService.UpdateAsync(dto);
            return Ok(new { success = true, data = blog, message = "Blog post updated successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { success = false, message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _blogService.DeleteAsync(id);
        if (!result)
            return NotFound(new { success = false, message = "Blog post not found" });

        return Ok(new { success = true, message = "Blog post deleted successfully" });
    }
}
