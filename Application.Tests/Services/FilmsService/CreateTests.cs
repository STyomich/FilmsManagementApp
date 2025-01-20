using Application.Interfaces;
using Application.Services;
using Application.Services.FilmsService;
using Core.Domain.Entities;
using FluentAssertions;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Application.Tests.Services.FilmsService
{
    public class CreateTests
    {
        private static DataContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new DataContext(options);
            dbContext.Database.EnsureCreated();
            return dbContext;
        }

        [Fact]
        public async void Create_CreateFilmWithoutTitle_ReturnsFailure()
        {
            //Arrange
            var mock = new Mock<IUserAccessor>();
            mock.Setup(x => x.GetUserIdentifier()).Returns(Guid.NewGuid().ToString());
            mock.Setup(x => x.GetUserName()).Returns("Some name");
            var film = new Film
            {
                Id = Guid.NewGuid(),
                Title = null, // Title is null for testing.
                Genre = "Action",
                Director = "Some director",
                ReleaseYear = 2021,
                Rating = 7,
                Description = "Some desc"
            };
            var dataContext = GetDbContext();

            //Act
            var createCommand = new Create.Command
            {
                Film = film
            };

            var handler = new Create.Handler(dataContext, mock.Object);

            var result = await handler.Handle(createCommand, CancellationToken.None);

            //Assert
            result.Should().BeEquivalentTo(Result<Unit>.Failure("Failed to create a film."));
        }
        [Fact]
        public async void Create_CreateFilmWithIncorrectRating_ReturnsFailure()
        {
            //Arrange
            var mock = new Mock<IUserAccessor>();
            mock.Setup(x => x.GetUserIdentifier()).Returns(Guid.NewGuid().ToString());
            mock.Setup(x => x.GetUserName()).Returns("Some name");
            var film = new Film
            {
                Id = Guid.NewGuid(),
                Title = "Some title",
                Genre = "Action",
                Director = "Some director",
                ReleaseYear = 2021,
                Rating = 12, // Rating is 12 for testing.
                Description = "Some desc"
            };
            var dataContext = GetDbContext();
            //Act
            var createCommand = new Create.Command
            {
                Film = film
            };

            var handler = new Create.Handler(dataContext, mock.Object);

            var result = await handler.Handle(createCommand, CancellationToken.None);

            //Assert
            result.Should().BeEquivalentTo(Result<Unit>.Failure("Rating must be 1-10."));
        }
    }
}