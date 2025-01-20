using AutoMapper;
using Core.Domain.Entities;
using Core.DTOs.Entities;
using Infrastructure.DbContext;
using MediatR;

namespace Application.Services.FilmsService
{
    /// <summary>
    /// Class for editing film entity via CQRS.
    /// </summary>
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public FilmDto? Film { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Film.Id == null) return Result<Unit>.Failure("Can`t identify film.");
                if (request.Film.UserId == null) return Result<Unit>.Failure("Can`t identify user.");
                if (request.Film.Rating < 1 || request.Film.Rating > 10) return Result<Unit>.Failure("Rating must be 1-10.");
                if (request.Film.Title == null) return Result<Unit>.Failure("Failed to edit a film, title can`t be blank.");
                var film = await _dataContext.Films.FindAsync(request.Film.Id);
                if (film == null) return null;

                _mapper.Map(request.Film, film);

                var result = await _dataContext.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update film.");
                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}