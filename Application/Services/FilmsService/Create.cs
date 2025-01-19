using Application.Interfaces;
using Core.Domain.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.FilmsService
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Film? Film { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Film.Id == null) return Result<Unit>.Failure("Can`t identify film.");
                if (request.Film.UserId == null) return Result<Unit>.Failure("Can`t identify user.");
                if (request.Film.Rating < 1 || request.Film.Rating >10) return Result<Unit>.Failure("Rating must be 1-10.");
                if (request.Film.Title == null) return Result<Unit>.Failure("Failed to create a film.");

                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());
                request.Film.UserId = user.Id;

                if (request.Film != null) await _dataContext.Films.AddAsync(request.Film);
                var result = await _dataContext.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create a film.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}