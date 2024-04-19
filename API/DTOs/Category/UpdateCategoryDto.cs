using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Category
{
    public class UpdateCategoryDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50, ErrorMessage = "Name cannot have more than 50 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(255, ErrorMessage = "Description cannot have more than 255 characters")]
        public string Description { get; set; }
    }
}
