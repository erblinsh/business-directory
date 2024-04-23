namespace server.DTOs.Review
{
    public class ReviewDto
    {
        public int Id;
        public int Rating { get; set; }
        public string Comment { get; set; }
        public string UserId { get; set; }
        public int BusinessId { get; set; }

        //public UserDTO User { get; set; }
        //public BusinessDto Business { get; set; }
    }
}