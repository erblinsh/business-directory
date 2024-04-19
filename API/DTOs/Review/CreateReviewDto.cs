using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Review
{
    public class CreateReviewDto
    {
        [Required(ErrorMessage = "Rating is required")]
        [Range(1, 5, ErrorMessage = "Rate must be between 1 and 5")]
        public string Rating { get; set; }

        [MaxLength(500, ErrorMessage = "Comment cannot have more than 255 characters")]
        public string Comment { get; set; }

        [Required(ErrorMessage = "UserID is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "BusinessID is required")]
        public string BusinessId { get; set; }
    }
}