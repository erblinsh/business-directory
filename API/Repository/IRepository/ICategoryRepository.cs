using server.Models;
using server.Repository.IRepository;

namespace business_directory.Repository.IRepository
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> UpdateAsync(int id, Category category);
    }
}
