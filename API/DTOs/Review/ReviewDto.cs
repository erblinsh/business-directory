﻿using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Review
{
    public class ReviewDto
    {
        public string Rating { get; set; }
        public string Comment { get; set; }
        public string UserId { get; set; }
        public string BusinessId { get; set; }

        public UserDto User { get; set; }
        public BusinessDto Business { get; set; }
    }
}