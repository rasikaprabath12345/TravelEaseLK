using Microsoft.EntityFrameworkCore;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;

namespace TravelEase.Application.Services;

public interface IBlogService
{
    Task<IEnumerable<BlogDto>> GetAllAsync(string? search = null, bool? onlyPublished = true, int page = 1, int pageSize = 10);
    Task<BlogDto?> GetByIdAsync(int id);
    Task<BlogDto> CreateAsync(CreateBlogDto dto);
    Task<BlogDto> UpdateAsync(UpdateBlogDto dto);
    Task<bool> DeleteAsync(int id);
    Task<int> GetTotalCountAsync(string? search = null, bool? onlyPublished = true);
}

public class BlogService : IBlogService
{
    private readonly IUnitOfWork _unitOfWork;

    public BlogService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    private static BlogDto MapToDto(Blog blog)
    {
        return new BlogDto
        {
            Id = blog.Id,
            Title = blog.Title,
            Content = blog.Content,
            Excerpt = blog.Excerpt,
            ImageUrl = blog.ImageUrl,
            VideoUrl = blog.VideoUrl,
            Author = blog.Author,
            IsPublished = blog.IsPublished,
            PublishedDate = blog.PublishedDate,
            Tags = blog.Tags,
            CreatedAt = blog.CreatedAt,
            UpdatedAt = blog.UpdatedAt
        };
    }

    public async Task<IEnumerable<BlogDto>> GetAllAsync(string? search = null, bool? onlyPublished = true, int page = 1, int pageSize = 10)
    {
        var query = _unitOfWork.Repository<Blog>().Query();

        if (onlyPublished == true)
        {
            query = query.Where(b => b.IsPublished);
        }

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(b => b.Title.Contains(search) || 
                                     b.Content.Contains(search) || 
                                     (b.Tags != null && b.Tags.Contains(search)));
        }

        var blogs = await query
            .OrderByDescending(b => b.PublishedDate ?? b.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return blogs.Select(MapToDto);
    }

    public async Task<BlogDto?> GetByIdAsync(int id)
    {
        var blog = await _unitOfWork.Repository<Blog>().GetByIdAsync(id);
        return blog == null ? null : MapToDto(blog);
    }

    public async Task<BlogDto> CreateAsync(CreateBlogDto dto)
    {
        var blog = new Blog
        {
            Title = dto.Title,
            Content = dto.Content,
            Excerpt = dto.Excerpt,
            ImageUrl = dto.ImageUrl,
            VideoUrl = dto.VideoUrl,
            Author = dto.Author,
            IsPublished = dto.IsPublished,
            PublishedDate = dto.IsPublished ? DateTime.UtcNow : null,
            Tags = dto.Tags
        };

        var created = await _unitOfWork.Repository<Blog>().AddAsync(blog);
        await _unitOfWork.SaveChangesAsync();
        return MapToDto(created);
    }

    public async Task<BlogDto> UpdateAsync(UpdateBlogDto dto)
    {
        var repo = _unitOfWork.Repository<Blog>();
        var blog = await repo.GetByIdAsync(dto.Id);
        if (blog == null)
        {
            throw new KeyNotFoundException("Blog not found");
        }

        blog.Title = dto.Title;
        blog.Content = dto.Content;
        blog.Excerpt = dto.Excerpt;
        blog.ImageUrl = dto.ImageUrl;
        blog.VideoUrl = dto.VideoUrl;
        blog.Author = dto.Author;
        blog.Tags = dto.Tags;
        blog.UpdatedAt = DateTime.UtcNow;

        if (dto.IsPublished && !blog.IsPublished)
        {
            blog.IsPublished = true;
            blog.PublishedDate = DateTime.UtcNow;
        }
        else if (!dto.IsPublished && blog.IsPublished)
        {
            blog.IsPublished = false;
            blog.PublishedDate = null;
        }

        await repo.UpdateAsync(blog);
        await _unitOfWork.SaveChangesAsync();
        return MapToDto(blog);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var repo = _unitOfWork.Repository<Blog>();
        var blog = await repo.GetByIdAsync(id);
        if (blog == null)
            return false;

        await repo.DeleteAsync(blog);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<int> GetTotalCountAsync(string? search = null, bool? onlyPublished = true)
    {
        var query = _unitOfWork.Repository<Blog>().Query();

        if (onlyPublished == true)
        {
            query = query.Where(b => b.IsPublished);
        }

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(b => b.Title.Contains(search) || 
                                     b.Content.Contains(search) || 
                                     (b.Tags != null && b.Tags.Contains(search)));
        }

        return await query.CountAsync();
    }
}
