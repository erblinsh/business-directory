using server.Models;

namespace server.Repository.IRepository
{
    public interface IReviewRepository : IRepository<Review>
    {
        Task<Review> UpdateAsync(int id, Review review);
    }
}
