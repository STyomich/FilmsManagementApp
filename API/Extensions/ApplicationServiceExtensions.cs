using Application.Helpers;
using Application.Interfaces;
using Application.Services.FilmsService;
using Infrastructure.DbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    /// <summary>
    /// Custom static class for adding application services to the IServiceCollection into Program.cs build process.
    /// </summary>
    public static class ApplicationServiceExtensions
    {
        /// <summary>
        /// Method for adding application services to the IServiceCollection.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns>IServiceCollection services</returns>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(List).Assembly);
            });
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "https://localhost:3000");
                });
            });
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();


            return services;
        }
    }
}