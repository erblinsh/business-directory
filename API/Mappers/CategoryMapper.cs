using AutoMapper;
using server.DTOs.Category;
using server.Models;

namespace server.Mappers
{
    public class CategoryMappers : Profile
    {
        public CategoryMappers()
        {
            CreateMap<Category, CategoryWithBusinessesDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<CreateCategoryDto, Category>().ReverseMap();

            CreateMap<UpdateCategoryDto, Category>().ReverseMap();
        }
    }
}
