using System.Linq.Expressions;

namespace server.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null,
                                                    Func<IQueryable<T>,
                                                    IQueryable<T>> include = null);
        Task<T> GetAsync(Expression<Func<T, bool>> filter = null,
                                            bool tracked = true,
                                            Func<IQueryable<T>,
                                            IQueryable<T>> include = null);
        Task CreateAsync(T entity);
        Task RemoveAsync(T entity);
        Task SaveAsync();
    }
}
