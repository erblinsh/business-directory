using Moq;
using server.Repository.IRepository;
using server.Controllers;
using server.DTOs.Business;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using server.Models;

namespace BusinessDirectory.tests
{
    public class UnitTest2
    {

        [Fact]
        public async Task BusinessController_CreateBusiness_ShouldReturnObjectResult()
        {
            // Arrange
            var mockRepository = new Mock<IBusinessRepository>();
            var mockMapper = new Mock<IMapper>();

            var controller = new BusinessController(mockRepository.Object, mockMapper.Object, null);

            var createDto = new CreateBusinessDto { Name = "New Business" };

            // Act
            var result = await controller.CreateBusiness(createDto);

            // Assert
            Assert.IsType<ObjectResult>(result.Result);
        }

        [Fact]
        public async Task BusinessController_DeleteBusiness_ShouldReturnNotFoundResult()
        {
            // Arrange
            var mockRepository = new Mock<IBusinessRepository>();
            var mockMapper = new Mock<IMapper>();

            var controller = new BusinessController(mockRepository.Object, mockMapper.Object, null);

            var businessId = 1;

            // Act
            var result = await controller.DeleteBusiness(businessId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task BusinessController_UpdateBusiness_ShouldReturnActionResultWithAPIResponse()
        {
            // Arrange
            var mockRepository = new Mock<IBusinessRepository>();
            var mockMapper = new Mock<IMapper>();

            var controller = new BusinessController(mockRepository.Object, mockMapper.Object, null);

            var businessId = 1;
            var updateDto = new UpdateBusinessDto { Name = "Updated Business" };

            // Act
            var result = await controller.UpdateBusiness(businessId, updateDto);

            // Assert
            Assert.IsType<ActionResult<APIResponse>>(result);
        }


    }
}
