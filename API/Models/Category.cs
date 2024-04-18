
using server.models;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public List<Business> Businesses { get; set; }
    }
}
