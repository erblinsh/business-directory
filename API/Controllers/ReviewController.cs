using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using server.data;
using server.DTOs.Review;
using server.Models;
using server.Repository.IRepository;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public ReviewController(IReviewRepository reviewRepository, IMapper mapper, ApplicationDbContext context)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
            _context = context;
            this._response = new();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviews()
        {
            var reviews = await _reviewRepository.GetAllAsync();
            var reviewDtos = _mapper.Map<IEnumerable<ReviewDto>>(reviews);
            return Ok(reviewDtos);
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<ReviewDto>> GetReview(int id)
        {
            var review = await _reviewRepository.GetAsync(u => u.Id == id);

            if (review == null)
            {
                return NotFound();
            }

            var reviewDto = _mapper.Map<ReviewDto>(review);

            return reviewDto;
        }


        [HttpPost]
        public async Task<ActionResult<ReviewDto>> CreateReview(CreateReviewDto createReviewDto)
        {
            try
            {
                var reviewEntity = _mapper.Map<Review>(createReviewDto);

                await _reviewRepository.CreateAsync(reviewEntity);

                var createdReviewDto = _mapper.Map<ReviewDto>(reviewEntity);

                return CreatedAtAction(nameof(GetReview), new { id = createdReviewDto.Id }, createdReviewDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateReview(int id, UpdateReviewDto updateReviewDto)
        {
            try
            {
                var existingReview = await _reviewRepository.GetAsync(u => u.Id == id);

                if (existingReview == null)
                {
                    return NotFound();
                }

                _mapper.Map(updateReviewDto, existingReview);

                await _reviewRepository.UpdateAsync(id, existingReview);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            try
            {
                var existingReview = await _reviewRepository.GetAsync(u => u.Id == id);

                if (existingReview == null)
                {
                    return NotFound();
                }

                await _reviewRepository.RemoveAsync(existingReview);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPatch("{id:int}")]
        public async Task<IActionResult> PatchReview(int id, [FromBody] JsonPatchDocument<UpdateReviewDto> patchDocument)
        {
            try
            {
                var existingReview = await _reviewRepository.GetAsync(u => u.Id == id);

                if (existingReview == null)
                {
                    return NotFound();
                }

                var reviewDto = _mapper.Map<UpdateReviewDto>(existingReview);
                patchDocument.ApplyTo(reviewDto, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _mapper.Map(reviewDto, existingReview);
                await _reviewRepository.UpdateAsync(id, existingReview);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
