using Application.Interfaces;
using Application.Services;
using Application.Services.FilmsService;
using AutoMapper;
using Core.Domain.Entities;
using Core.DTOs.Entities;
using FluentAssertions;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Application.Tests.Services.FilmsService
{
    public class EditTests
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
        public async void Edit_EditFilmWithoutTitle_ReturnsFailure()
        {
            //Arrange
            var mapperMock = new Mock<IMapper>();
            var film = new FilmDto
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
            var createCommand = new Edit.Command
            {
                Film = film
            };


            var handler = new Edit.Handler(dataContext, mapperMock.Object);

            var result = await handler.Handle(createCommand, CancellationToken.None);

            //Assert
            result.Should().BeEquivalentTo(Result<Unit>.Failure("Failed to edit a film, title can`t be blank."));
        }
        [Fact]
        public async void Edit_EditFilmWithIncorrectRating_ReturnsFailure()
        {
            //Arrange
            var mapperMock = new Mock<IMapper>();
            var film = new FilmDto
            {
                Id = Guid.NewGuid(),
                Title = "Some title",
                Genre = "Action",
                Director = "Some director",
                ReleaseYear = 2021,
                Rating = 12,
                Description = "Some desc"
            };
            var dataContext = GetDbContext();

            //Act
            var createCommand = new Edit.Command
            {
                Film = film
            };

            var handler = new Edit.Handler(dataContext, mapperMock.Object);

            var result = await handler.Handle(createCommand, CancellationToken.None);

            //Assert
            result.Should().BeEquivalentTo(Result<Unit>.Failure("Rating must be 1-10."));
        }
    }
}