using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Business
{
    public class CreateBusinessDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50, ErrorMessage = "Name can't have more than 50 characters")]
        [MinLength(3, ErrorMessage = "Name must have at least 3 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(250, ErrorMessage = "Description can't have more than 250 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [MaxLength(100, ErrorMessage = "Address can't have more than 100 characters")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [MaxLength(20, ErrorMessage = "Phone number can't have more than 20 characters")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Website url is required")]
        [MaxLength(50, ErrorMessage = "Website url can't have more than 50 characters")]
        public string WebsiteUrl { get; set; }

        [Required(ErrorMessage = "Image url is required")]
        public string ImageUrl { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [MaxLength(50, ErrorMessage = "Email can't have more than 50 characters")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Category id is required")]
        public int CategoryId { get; set; }
    }
}
