using Application.Services.FilmsService;
using Core.Domain.Entities;
using Core.DTOs.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FilmsController: BaseApiController
    {
        private readonly IMediator _mediator;
        public FilmsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        /// <summary>
        /// Endpoint for returning all film which assigned to user by UserId. Searching films with Authorization header.
        /// </summary>
        /// <returns>List of FilmDto</returns>
        [HttpGet] //api/films
        public async Task<ActionResult<List<FilmDto>>> GetAllFilms()
        {
            return await _mediator.Send(new List.Query());
        }
        /// <summary>
        /// Edpoint for creating new film. Creating film with Authorization header.
        /// </summary>
        /// <param name="film"></param>
        /// <returns>Ok(200) if operation done.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateFilms(Film film)
        {
            return Ok(await Mediator.Send(new Create.Command { Film = film }));
        }
        /// <summary>
        /// Endpoint for returning film details by Id. Searching film with Authorization header.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Film entity</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFilmsDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        /// <summary>
        /// Endpoint for editing film. Editing film with Authorization header.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="film"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> EditFilm(Guid id, FilmDto film)
        {
            film.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Film = film }));
        }
        /// <summary>
        /// Endpoint for deleting film. Deleting film with Authorization header.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilm(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}