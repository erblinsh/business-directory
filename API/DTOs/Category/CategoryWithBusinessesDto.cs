using server.DTOs.Business;

namespace business_directory.DTO.Category
{
    public class CategoryWithBusinessesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<BusinessDto> Businesses { get; set; }
    }
}
