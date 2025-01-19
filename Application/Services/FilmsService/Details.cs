using AutoMapper;
using Core.DTOs.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.FilmsService
{
    public class Details
    {
        public class Query : IRequest<Result<FilmDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<FilmDto>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Result<FilmDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var film = await _dataContext.Films.Where(a => a.Id == request.Id).FirstOrDefaultAsync();
                if (film != null)
                    return Result<FilmDto>.Success(_mapper.Map<FilmDto>(film));
                else
                    return Result<FilmDto>.Failure("Film don't found");
            }
        }

    }
}