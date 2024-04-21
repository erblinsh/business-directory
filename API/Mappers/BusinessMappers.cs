using AutoMapper;
using server.DTOs.Business;
using server.models;

namespace server.Mappers
{
    public class BusinessMappers : Profile
    {
        public BusinessMappers()
        {
            CreateMap<Business, BusinessDto>()
                .ForMember(dest => dest.Category,   // Category that the business belong to
                            opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Reviews,    // Reviews that belong to that business
                            opt => opt.MapFrom(src => src.Reviews)); 

            CreateMap<BusinessDto, Business>()
                .ForMember(dest => dest.Category,   // Category that the business belong to
                            opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Reviews,    // Reviews that belong to that business
                            opt => opt.MapFrom(src => src.Reviews)); 

            CreateMap<CreateBusinessDto, Business>();
            CreateMap<Business, CreateBusinessDto>();

            CreateMap<UpdateBusinessDto, Business>();
            CreateMap<Business, UpdateBusinessDto>();
        }
    }
}
