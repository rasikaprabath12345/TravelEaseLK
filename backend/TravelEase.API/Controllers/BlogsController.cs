using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
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
        [FromQuery] bool? isPublished,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // For non-admin requests, default to showing only published blogs unless explicitly requested and authenticated as Admin
        bool? filterPublished = isPublished;
        if (!User.IsInRole("Admin"))
        {
            filterPublished = true;
        }

        var blogs = await _blogService.GetAllAsync(search, filterPublished, page, pageSize);
        var total = await _blogService.GetTotalCountAsync(search, filterPublished);

        return Ok(new { success = true, data = blogs, total, page, pageSize });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var blog = await _blogService.GetByIdAsync(id);
        if (blog == null)
            return NotFound(new { success = false, message = "Blog article not found" });

        // If the blog is draft, only allow Admin to view it
        if (!blog.IsPublished && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        return Ok(new { success = true, data = blog });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBlogDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var blog = await _blogService.CreateAsync(dto);
        return Ok(new { success = true, data = blog, message = "Blog article created successfully" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBlogDto dto)
    {
        if (id != dto.Id)
            return BadRequest(new { success = false, message = "ID mismatch" });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var blog = await _blogService.UpdateAsync(dto);
            return Ok(new { success = true, data = blog, message = "Blog article updated successfully" });
        }
        catch (System.Exception ex)
        {
            return NotFound(new { success = false, message = ex.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _blogService.DeleteAsync(id);
        if (!result)
            return NotFound(new { success = false, message = "Blog article not found" });

        return Ok(new { success = true, message = "Blog article deleted successfully" });
    }
}
