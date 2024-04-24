using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.data;
using server.DTOs.Business;
using server.Helpers;
using server.models;
using server.Models;
using server.Repository.IRepository;
using System.Net;

namespace server.Controllers
{
    [Route("api/business")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public BusinessController(IBusinessRepository businessRepository, IMapper mapper, ApplicationDbContext context)
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
            _context = context;
            this._response = new();
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<APIResponse>> GetBusinesses([FromQuery] QueryObject queryObject)
        {
            try
            {
                IEnumerable<Business> businessList = await _businessRepository.GetAllAsync(
                                                        include: q => q.Include(b => b.Category));

               if (!string.IsNullOrWhiteSpace(queryObject.CategoryName))
                {
                    businessList = businessList.Where(b => b.Category.Name.ToLower()
                                                .Contains(queryObject.CategoryName.ToLower()));
                }

                if (!string.IsNullOrWhiteSpace(queryObject.Name))
                {
                    businessList = businessList.Where(b => b.Name.ToLower()
                                                .Contains(queryObject.Name.ToLower()));
                }

                businessList = queryObject.IsDescending
                                      ? businessList.OrderByDescending(b => b.Id)
                                      : businessList.OrderBy(b => b.Id);

                if (!string.IsNullOrEmpty(queryObject.SortBy))
                {
                    switch (queryObject.SortBy.ToLower())
                    {
                        case "name":
                            businessList = queryObject.IsDescending
                                        ? businessList.OrderByDescending(b => b.Name)
                                        : businessList.OrderBy(b => b.Name);
                            break;

                        case "email":
                            businessList = queryObject.IsDescending
                                        ? businessList.OrderByDescending(b => b.Email)
                                        : businessList.OrderBy(b => b.Email);
                            break;
                    }
                }


                // Pagination
                int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;
                businessList = businessList.Skip(skipNumber)
                                            .Take(queryObject.PageSize);
                _response.Result = _mapper.Map<List<BusinessDto>>(businessList);
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
        public async Task<ActionResult<APIResponse>> GetBusiness([FromRoute] int id)
        {
            try
            {
                if (id <= 0)
                {
                    ModelState.AddModelError("id", "Invalid id.");
                    return BadRequest(ModelState);
                }

                var business = await _businessRepository.GetAsync(u => u.Id == id,
                                         include: q => q.Include(b => b.Reviews)
                                                        .Include(b => b.Category));


                if (business == null)
                {
                    ModelState.AddModelError("", "Business not found!");
                    return BadRequest(ModelState);
                }

                _response.Result = _mapper.Map<BusinessDto>(business);
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
        [Authorize]
        public async Task<ActionResult<APIResponse>> CreateBusiness([FromBody] CreateBusinessDto createDTO)
        {
            try
            {
                var categoryExists = await _context.Categories.AnyAsync(c => c.Id == createDTO.CategoryId);

                if (!categoryExists)
                {
                    ModelState.AddModelError("CategoryNotFound", "The specified category does not exist.");
                    return BadRequest(ModelState);
                }

                if (await _businessRepository.GetAsync(u => u.Name.ToLower() == createDTO.Name.ToLower()) != null)
                {
                    ModelState.AddModelError("CustomError", "Business already Exists!");
                    return BadRequest(ModelState);
                }

                if (createDTO == null)
                    return BadRequest(createDTO);

                Business business = _mapper.Map<Business>(createDTO);


                await _businessRepository.CreateAsync(business);
                _response.Result = _mapper.Map<BusinessDto>(business);
                _response.StatusCode = HttpStatusCode.Created;

                return CreatedAtAction(nameof(GetBusiness), new { id = business.Id }, _response);
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
        [Authorize]
        public async Task<ActionResult<APIResponse>> DeleteBusiness([FromRoute] int id)
        {
            try
            {
                if (id <= 0)
                {
                    ModelState.AddModelError("id", "Invalid id.");
                    return BadRequest(ModelState);
                }

                var business = await _businessRepository.GetAsync(u => u.Id == id);

                if (business == null)
                    return NotFound();

                await _businessRepository.RemoveAsync(business);
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
        [Authorize]
        public async Task<ActionResult<APIResponse>> UpdateBusiness([FromRoute] int id, [FromBody] UpdateBusinessDto updateDTO)
        {
            try
            {
                if (updateDTO == null)
                    return BadRequest();

                Business model = _mapper.Map<Business>(updateDTO);

                await _businessRepository.UpdateAsync(id, model);
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
        public async Task<IActionResult> UpdatePartialBusiness([FromRoute] int id, JsonPatchDocument<UpdateBusinessDto> patchDTO)
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

                var business = await _businessRepository.GetAsync(u => u.Id == id, tracked: false);

                if (business == null)
                    return NotFound();

                var businessDTO = _mapper.Map<UpdateBusinessDto>(business);

                patchDTO.ApplyTo(businessDTO);

                if (!TryValidateModel(businessDTO))
                    return BadRequest(ModelState);

                _mapper.Map(businessDTO, business);

                await _businessRepository.UpdateAsync(id, business);
                var updatedBusinessDTO = _mapper.Map<BusinessDto>(business);

                return Ok(updatedBusinessDTO);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while processing your request. Please try again later.";
                return StatusCode(StatusCodes.Status500InternalServerError, errorMessage);
            }
        }
    }
}
