using Core.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Core.Domain.IdentityEntities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ICollection<Film>? Films { get; set; }
    }
}