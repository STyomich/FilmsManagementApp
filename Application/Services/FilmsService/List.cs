using AutoMapper;
using Core.DTOs.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.FilmsService
{
    public class List
    {
        public class Query : IRequest<List<FilmDto>> { }
        public class Handler : IRequestHandler<Query, List<FilmDto>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<List<FilmDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var films = await _dataContext.Films
                    .ToListAsync();
                return _mapper.Map<List<FilmDto>>(films);
            }
        }

    }
}