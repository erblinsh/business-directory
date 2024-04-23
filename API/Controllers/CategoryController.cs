using AutoMapper;
using business_directory.DTO.Category;
using business_directory.Repository.IRepository;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.data;
using server.DTOs.Category;
using server.Helpers;
using server.Models;
using System.Net;

namespace Category_directory.Controllers
{
    [Route("api/Category")]
    [ApiController]
    public class CategoryAPIController : ControllerBase
    {
        protected APIResponse _response;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _db;

        public CategoryAPIController(ICategoryRepository dbCategory, IMapper mapper, ApplicationDbContext db)
        {
            _categoryRepository = dbCategory;
            _mapper = mapper;
            _db = db;
            this._response = new();
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<APIResponse>> GetCategories([FromQuery] QueryObject queryObject)
        {
            try
            {
                IEnumerable<Category> CategoryList = await _categoryRepository.GetAllAsync();

                if (!string.IsNullOrWhiteSpace(queryObject.Name))
                    CategoryList = CategoryList.Where(b => b.Name.ToLower()
                                                .Contains(queryObject.Name.ToLower()));


                if (!string.IsNullOrEmpty(queryObject.SortBy))
                {
                    switch (queryObject.SortBy.ToLower())
                    {
                        case "name":
                            CategoryList = queryObject.IsDescending
                                        ? CategoryList.OrderByDescending(b => b.Name)
                                        : CategoryList.OrderBy(b => b.Name);
                            break;
                    }
                }

                // Pagination
                int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;
                CategoryList = CategoryList.Skip(skipNumber)
                .Take(queryObject.PageSize);

                _response.Result = _mapper.Map<List<CategoryDto>>(CategoryList);
                _response.StatusCode = HttpStatusCode.OK;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;

                return StatusCode((int)_response.StatusCode, _response);
            }
        }


        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetCategory([FromRoute] int id)
        {
            try
            {
                if (id <= 0)
                {
                    ModelState.AddModelError("id", "Invalid id.");
                    return BadRequest(ModelState);
                }


                var Category = await _categoryRepository.GetAsync(u => u.Id == id, include: q => q.Include(b => b.Businesses));

                if (Category == null)
                {
                    ModelState.AddModelError("", "Category not found!");
                    return BadRequest(ModelState);
                }

                _response.Result = _mapper.Map<CategoryWithBusinessesDto>(Category);
                _response.StatusCode = HttpStatusCode.OK;


                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;

                return StatusCode((int)_response.StatusCode, _response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<APIResponse>> CreateCategory([FromBody] CreateCategoryDto createDTO)
        {
            try
            {

                if (await _categoryRepository.GetAsync(u => u.Name.ToLower() == createDTO.Name.ToLower()) != null)
                {
                    ModelState.AddModelError("CustomError", "Category already Exists!");
                    return BadRequest(ModelState);
                }

                if (createDTO == null)
                    return BadRequest(createDTO);

                Category category = _mapper.Map<Category>(createDTO);


                await _categoryRepository.CreateAsync(category);
                _response.Result = _mapper.Map<CategoryDto>(category);
                _response.StatusCode = HttpStatusCode.Created;

                return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, _response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;

                return StatusCode((int)_response.StatusCode, _response);
            }
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<APIResponse>> DeleteCategory([FromRoute] int id)
        {
            try
            {
                if (id <= 0)
                {
                    ModelState.AddModelError("id", "Invalid id.");
                    return BadRequest(ModelState);
                }

                var Category = await _categoryRepository.GetAsync(u => u.Id == id);

                if (Category == null)
                    return NotFound();

                await _categoryRepository.RemoveAsync(Category);
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;

                return StatusCode((int)_response.StatusCode, _response);
            }
        }


        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> UpdateCategory([FromRoute] int id, [FromBody] UpdateCategoryDto updateDTO)
        {
            try
            {
                if (updateDTO == null)
                    return BadRequest();

                Category model = _mapper.Map<Category>(updateDTO);

                await _categoryRepository.UpdateAsync(id, model);
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;

                return StatusCode((int)_response.StatusCode, _response);
            }
        }


        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePartialCategory([FromRoute] int id, JsonPatchDocument<UpdateCategoryDto> patchDTO)
        {
            try
            {
                if (patchDTO == null)
                {
                    ModelState.AddModelError("patchDTO", "Patch document cannot be null.");
                    return BadRequest(ModelState);
                }

                if (id <= 0)
                {
                    ModelState.AddModelError("id", "Invalid id.");
                    return BadRequest(ModelState);
                }

                var Category = await _categoryRepository.GetAsync(u => u.Id == id, tracked: false);

                if (Category == null)
                    return NotFound();

                var CategoryDTO = _mapper.Map<UpdateCategoryDto>(Category);

                patchDTO.ApplyTo(CategoryDTO);

                if (!TryValidateModel(CategoryDTO))
                    return BadRequest(ModelState);

                _mapper.Map(CategoryDTO, Category);

                await _categoryRepository.UpdateAsync(id, Category);
                var updatedCategoryDTO = _mapper.Map<CategoryDto>(Category);

                return Ok(updatedCategoryDTO);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while processing your request. Please try again later.";
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }
        }

    }
}

