using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }
            public async Task<List<FilmDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());
                var films = await _dataContext.Films.Where(f => f.UserId == user.Id).ToListAsync();
                return _mapper.Map<List<FilmDto>>(films);
            }
        }

    }
}