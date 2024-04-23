using server.data;
using server.Models;
using server.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace server.Repository.Repositories
{
    public class ReviewRepository : Repository<Review>, IReviewRepository
    {
        private readonly ApplicationDbContext _db;

        public ReviewRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Review> UpdateAsync(int id, Review review)
        {
            var existReview = await _db.Reviews.FirstOrDefaultAsync(r => r.Id == id);
            var existBusiness = await _db.Businesses.FirstOrDefaultAsync(b => b.Id == review.BusinessId);
            var existUser = await _db.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == review.UserId);


            if (existBusiness == null) return null;
            if (existBusiness == null) throw new Exception("Invalid BusinessId provided");
            if (existUser == null) throw new Exception("Invalid UserId provided");


            existReview.Comment = review.Comment;
            existReview.Rating = review.Rating;
            existReview.BusinessId = review.BusinessId;


            await _db.SaveChangesAsync();

            return review;
        }
    }
}
