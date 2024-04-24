using server.Models;
using server.Repository.IRepository;

namespace server.Repository.IRepository // 2
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> UpdateAsync(int id, Category category);
    }
}
