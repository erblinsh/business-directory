using server.models;
using server.Repository.IRepository;

namespace server.Repository.IRepository
{
    public interface IBusinessRepository : IRepository<Business>
    {

        Task<Business> UpdateAsync(int id, Business business);

    }
}
