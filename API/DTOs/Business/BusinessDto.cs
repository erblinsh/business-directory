using server.DTOs.Category;
using server.DTOs.Review;
using server.Models;

namespace server.DTOs.Business
{
    public class BusinessDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string WebsiteUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Email { get; set; }

        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; }
       public List<ReviewDto> Reviews { get; set; }
    }
}
