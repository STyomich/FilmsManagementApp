using AutoMapper;
using Core.Domain.Entities;
using Core.Domain.IdentityEntities;
using Core.DTOs.Entities;
using Core.DTOs.IdentityEntities;

namespace Application.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ApplicationUser, ApplicationUser>();
            CreateMap<ApplicationUser, UserDto>();

            CreateMap<Film, Film>();
            CreateMap<Film, FilmDto>();
            CreateMap<FilmDto, Film>();
        }
    }
}
