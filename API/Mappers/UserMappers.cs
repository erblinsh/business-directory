using AutoMapper;
using server.DTO.Category;
using server.DTOs.Category;
using server.Models;

namespace server.models

public class UserMappers : Profile
{
    public UserMappers()
    {
        CreateMap<ApplicationUser, UserDTO>().ReverseMap();
    }
}
