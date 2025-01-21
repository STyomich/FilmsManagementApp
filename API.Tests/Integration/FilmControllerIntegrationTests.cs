using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Application.Interfaces;
using Application.Services;
using Core.Domain.Entities;
using Core.Domain.IdentityEntities;
using Core.DTOs.IdentityEntities;
using MediatR;
using Moq;
using Xunit;

namespace API.Tests.Integration
{
    public class FilmControllerIntegrationTests : IClassFixture<ProgramWebApplicationFactory>

    {
        private readonly HttpClient _client;

        public FilmControllerIntegrationTests(ProgramWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async void CanCreateAndRetrieveFilm()
        {
            // Arrange
            var mock = new Mock<IUserAccessor>();
            mock.Setup(x => x.GetUserIdentifier()).Returns(Guid.NewGuid().ToString());
            mock.Setup(x => x.GetUserName()).Returns("Some name");
            var user = new RegisterDto
            {
                Email = "testingIntegration@test.com",
                UserName = "testingUser",
                Password = "Password1"
            };
            var film = new Film
            {
                Id = Guid.NewGuid(),
                Title = "Some title",
                Genre = "Action",
                Director = "Some director",
                ReleaseYear = 2021,
                Rating = 8,
                Description = "Some desc"
            };
            // Act
            var request = new HttpRequestMessage(HttpMethod.Post, "/api/films")
            {
                Content = JsonContent.Create(film)
            };
            var registerResponse = await _client.PostAsJsonAsync("/api/users/register", user);
            registerResponse.EnsureSuccessStatusCode();
            var responseContent = await registerResponse.Content.ReadAsStringAsync();
            var responseObject = JsonSerializer.Deserialize<Dictionary<string, string>>(responseContent);
            if (responseObject != null && responseObject.TryGetValue("token", out var token))
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            var createResponse = await _client.SendAsync(request);
            createResponse.EnsureSuccessStatusCode();

            var createdFilm = await createResponse.Content.ReadFromJsonAsync<Result<Unit>>();

            // Assert
            Assert.NotNull(createdFilm);
            Assert.Equivalent(Result<Unit>.Success(Unit.Value), createdFilm);
        }
    }
}