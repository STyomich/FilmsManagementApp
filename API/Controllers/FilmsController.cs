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
        [HttpGet] //api/films
        public async Task<ActionResult<List<FilmDto>>> GetAllFilms()
        {
            return await _mediator.Send(new List.Query());
        }
        [HttpPost]
        public async Task<IActionResult> CreateFilms(Film film)
        {
            return Ok(await Mediator.Send(new Create.Command { Film = film }));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFilmsDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditFilm(Guid id, FilmDto film)
        {
            film.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Film = film }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilm(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}