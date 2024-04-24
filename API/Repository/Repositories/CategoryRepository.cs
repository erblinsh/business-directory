using Microsoft.EntityFrameworkCore;
using server.data;
using server.Models;
using server.Repository.IRepository;
using server.Repository.Repositories;

namespace Repository.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<Category> dbSet;

        public CategoryRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
            dbSet = _db.Set<Category>();
        }

        public async Task<Category> UpdateAsync(int id, Category category)
        {
            var existCategory = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id);


            if (existCategory == null) return null;

            existCategory.Name = category.Name;
            existCategory.Description = category.Description;

            await _db.SaveChangesAsync();

            return category;
        }
    }
}
