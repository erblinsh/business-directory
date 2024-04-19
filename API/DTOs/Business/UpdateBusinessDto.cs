using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Business
{
    public class UpdateBusinessDto
    {
        [MinLength(3, ErrorMessage = "Name must have at least 3 characters")]
        public string Name { get; set; }

        [MinLength(3, ErrorMessage = "Description must have at least 3 characters")]
        [MaxLength(250, ErrorMessage = "Description can't have more than 250 characters")]
        public string Description { get; set; }

        [MaxLength(100, ErrorMessage = "Address can't have more than 100 characters")]
        public string Address { get; set; }

        [MaxLength(20, ErrorMessage = "Phone number can't have more than 20 characters")]
        public string PhoneNumber { get; set; }

        [MaxLength(50, ErrorMessage = "Website url can't have more than 50 characters")]
        public string WebsiteUrl { get; set; }
        public string ImageUrl { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [MaxLength(50, ErrorMessage = "Email can't have more than 50 characters")]
        public string Email { get; set; }

        public int CategoryId { get; set; }
    }
}
