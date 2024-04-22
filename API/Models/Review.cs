using server.models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int BusinessId { get; set; }

        [ForeignKey("UserId")]
        public LocalUser User { get; set; }

        [ForeignKey("BusinessId")]
        public Business Business { get; set; }
    }
}
