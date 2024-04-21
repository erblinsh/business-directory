using Microsoft.EntityFrameworkCore;
using server.data;
using server.models;
using server.Repository.IRepository;

namespace server.Repository
{
    public class BusinessRepository : Repository<Business>, IBusinessRepository
    {
        private readonly ApplicationDbContext _db;

        public BusinessRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }


        public async Task<Business> UpdateAsync(int id, Business business)
        {
            var existBusiness = await _db.Businesses.FirstOrDefaultAsync(b => b.Id == id);
            var existCategory = await _db.Categories
                                    .FirstOrDefaultAsync(c => c.Id == business.CategoryId);


            if (existBusiness == null) return null;
            if (existCategory == null) throw new Exception("Invalid CategoryId provided");


            // Update business fields
            existBusiness.Name = business.Name;
            existBusiness.Description = business.Description;
            existBusiness.Address = business.Address;
            existBusiness.PhoneNumber = business.PhoneNumber;
            existBusiness.WebsiteUrl = business.WebsiteUrl;
            existBusiness.ImageUrl = business.ImageUrl;
            existBusiness.Email = business.Email;
            existBusiness.CategoryId = business.CategoryId;

            await _db.SaveChangesAsync();

            return business;
        }
    }
}
