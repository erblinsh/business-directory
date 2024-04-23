using AutoMapper;
using server.DTOs.Review;
using server.Models;

namespace server.Mappers
{
    public class ReviewMapper : Profile
    {
        public ReviewMapper()
        {
            CreateMap<Review, ReviewDto>().ReverseMap();
            CreateMap<CreateReviewDto, Review>().ReverseMap();
            CreateMap<UpdateReviewDto, Review>().ReverseMap();
        }
    }
}
