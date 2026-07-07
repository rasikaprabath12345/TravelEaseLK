namespace TravelEase.Application.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IRepository<T> Repository<T>() where T : Domain.Entities.BaseEntity;
    Task<int> SaveChangesAsync();
}