using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.models
{
    public class Business
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public string WebsiteUrl { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string Email { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]

        public Category Category { get; set; }

        public List<Review> Reviews { get; set; }
    }
}
