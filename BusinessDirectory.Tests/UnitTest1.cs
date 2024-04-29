using Moq;
using Xunit;
using server.Repository.IRepository;
using server.Models;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BusinessDirectory.tests
{
    public class UnitTest1
    {
        private readonly Mock<IRepository<Category>> _categoryRepository;

        public UnitTest1()
        {
            _categoryRepository = new Mock<IRepository<Category>>();
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnListOfCategories()
        {
            // Arrange
            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "Category 1", Description = "Description 1" },
                new Category { Id = 2, Name = "Category 2", Description = "Description 2" }
            };

            _categoryRepository.Setup(x => x.GetAllAsync(It.IsAny<Expression<Func<Category, bool>>>(), It.IsAny<Func<IQueryable<Category>, IQueryable<Category>>>()))
                .ReturnsAsync(categories);

            // Act
            var result = await _categoryRepository.Object.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Equal("Category 1", result[0].Name);
            Assert.Equal("Category 2", result[1].Name);
        }
        [Fact]
        public async Task GetAsync_ShouldReturnCategory()
        {
            // Arrange
            var category = new Category { Id = 1, Name = "Category 1", Description = "Description 1" };

            _categoryRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Category, bool>>>(), It.IsAny<bool>(), It.IsAny<Func<IQueryable<Category>, IQueryable<Category>>>()))
                .ReturnsAsync(category);

            // Act
            var result = await _categoryRepository.Object.GetAsync(c => c.Id == 1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(category.Id, result.Id);
            Assert.Equal(category.Name, result.Name);
            Assert.Equal(category.Description, result.Description);
        }

        [Fact]
        public async Task RemoveAsync_ShouldRemoveCategoryFromRepository()
        {
            // Arrange
            var category = new Category { Id = 1, Name = "Category 1", Description = "Description 1" };

            _categoryRepository.Setup(x => x.RemoveAsync(category))
                .Returns(Task.CompletedTask);

            // Act
            await _categoryRepository.Object.RemoveAsync(category);

            // Assert
            _categoryRepository.Verify(x => x.RemoveAsync(category), Times.Once);
        }
    }
}