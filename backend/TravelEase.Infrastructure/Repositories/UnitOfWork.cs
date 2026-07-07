using System.Collections;
using TravelEase.Application.Interfaces;
using TravelEase.Domain.Entities;
using TravelEase.Infrastructure.Data;

namespace TravelEase.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly TravelEaseDbContext _context;
    private Hashtable _repositories = new();

    public UnitOfWork(TravelEaseDbContext context)
    {
        _context = context;
    }

    public IRepository<T> Repository<T>() where T : BaseEntity
    {
        var type = typeof(T).Name;
        if (!_repositories.ContainsKey(type))
        {
            var repositoryInstance = new Repository<T>(_context);
            _repositories.Add(type, repositoryInstance);
        }
        return (IRepository<T>)_repositories[type]!;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}