using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TravelEase.Application.DTOs;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;

namespace TravelEase.Application.Services;

public interface IBlogService
{
    Task<IEnumerable<BlogDto>> GetAllAsync(string? search = null, bool? isPublished = null, int page = 1, int pageSize = 10);
    Task<BlogDto?> GetByIdAsync(int id);
    Task<BlogDto> CreateAsync(CreateBlogDto dto);
    Task<BlogDto> UpdateAsync(UpdateBlogDto dto);
    Task<bool> DeleteAsync(int id);
    Task<int> GetTotalCountAsync(string? search = null, bool? isPublished = null);
}

public class BlogService : IBlogService
{
    private readonly IUnitOfWork _unitOfWork;

    public BlogService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<BlogDto>> GetAllAsync(string? search = null, bool? isPublished = null, int page = 1, int pageSize = 10)
    {
        var query = _unitOfWork.Repository<Blog>().Query();

        if (isPublished.HasValue)
        {
            query = query.Where(b => b.IsPublished == isPublished.Value);
        }

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(b => b.Title.Contains(search) || 
                                     b.Content.Contains(search) || 
                                     (b.Excerpt != null && b.Excerpt.Contains(search)));
        }

        // Sort by published date (if published) or created date descending
        query = query.OrderByDescending(b => b.PublishedDate ?? b.CreatedAt);

        var blogs = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return blogs.Select(b => MapToDto(b)).ToList();
    }

    public async Task<BlogDto?> GetByIdAsync(int id)
    {
        var blog = await _unitOfWork.Repository<Blog>().GetByIdAsync(id);
        if (blog == null) return null;

        return MapToDto(blog);
    }

    public async Task<BlogDto> CreateAsync(CreateBlogDto dto)
    {
        var tagsJson = dto.Tags != null ? JsonSerializer.Serialize(dto.Tags) : "[]";
        
        var blog = new Blog
        {
            Title = dto.Title,
            Content = dto.Content,
            Excerpt = dto.Excerpt,
            ImageUrl = dto.ImageUrl,
            Author = dto.Author,
            IsPublished = dto.IsPublished,
            PublishedDate = dto.IsPublished ? DateTime.UtcNow : null,
            Tags = tagsJson,
            CreatedAt = DateTime.UtcNow
        };

        await _unitOfWork.Repository<Blog>().AddAsync(blog);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(blog);
    }

    public async Task<BlogDto> UpdateAsync(UpdateBlogDto dto)
    {
        var blog = await _unitOfWork.Repository<Blog>().GetByIdAsync(dto.Id)
            ?? throw new Exception("Blog not found");

        var tagsJson = dto.Tags != null ? JsonSerializer.Serialize(dto.Tags) : "[]";

        blog.Title = dto.Title;
        blog.Content = dto.Content;
        blog.Excerpt = dto.Excerpt;
        blog.ImageUrl = dto.ImageUrl;
        blog.Author = dto.Author;
        
        // If transitioning from Draft to Published, set PublishedDate
        if (dto.IsPublished && !blog.IsPublished)
        {
            blog.PublishedDate = DateTime.UtcNow;
        }
        else if (!dto.IsPublished)
        {
            blog.PublishedDate = null;
        }

        blog.IsPublished = dto.IsPublished;
        blog.Tags = tagsJson;
        blog.UpdatedAt = DateTime.UtcNow;

        await _unitOfWork.Repository<Blog>().UpdateAsync(blog);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(blog);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var blog = await _unitOfWork.Repository<Blog>().GetByIdAsync(id);
        if (blog == null) return false;

        await _unitOfWork.Repository<Blog>().DeleteAsync(blog);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<int> GetTotalCountAsync(string? search = null, bool? isPublished = null)
    {
        var query = _unitOfWork.Repository<Blog>().Query();

        if (isPublished.HasValue)
        {
            query = query.Where(b => b.IsPublished == isPublished.Value);
        }

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(b => b.Title.Contains(search) || 
                                     b.Content.Contains(search) || 
                                     (b.Excerpt != null && b.Excerpt.Contains(search)));
        }

        return await query.CountAsync();
    }

    private static BlogDto MapToDto(Blog blog)
    {
        List<string> tagsList;
        try
        {
            tagsList = string.IsNullOrEmpty(blog.Tags) 
                ? new List<string>() 
                : JsonSerializer.Deserialize<List<string>>(blog.Tags) ?? new List<string>();
        }
        catch
        {
            tagsList = new List<string>();
        }

        return new BlogDto
        {
            Id = blog.Id,
            Title = blog.Title,
            Content = blog.Content,
            Excerpt = blog.Excerpt,
            ImageUrl = blog.ImageUrl,
            Author = blog.Author,
            IsPublished = blog.IsPublished,
            PublishedDate = blog.PublishedDate,
            Tags = tagsList,
            CreatedAt = blog.CreatedAt,
            UpdatedAt = blog.UpdatedAt
        };
    }
}
