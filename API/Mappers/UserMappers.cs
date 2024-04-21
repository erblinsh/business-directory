using AutoMapper;
using business_directory.DTO.Category;
using server.DTOs.Category;
using server.Models;

namespace business_directory.Mappers

public class UserMappers : Profile
{
    public UserMappers()
    {
        CreateMap<ApplicationUser, UserDTO>().ReverseMap();
    }
}
