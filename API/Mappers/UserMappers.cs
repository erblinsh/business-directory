using server.DTOs.UserAccess;
using AutoMapper;
using server.models;

namespace server.Mappers
{
    public class UserMappers : Profile
    {
        public UserMappers()
        {
            CreateMap<ApplicationUser, UserDTO>().ReverseMap();
        }
    }
}
