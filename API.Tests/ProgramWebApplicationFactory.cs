using Infrastructure.DbContext;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace API.Tests
{
    public class ProgramWebApplicationFactory : WebApplicationFactory<Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            base.ConfigureWebHost(builder);
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(temp => temp.ServiceType == typeof(DbContextOptions<DataContext>));
                if (descriptor != null) services.Remove(descriptor);
                services.AddDbContext<DataContext>(Options =>
                {
                    Options.UseInMemoryDatabase("DatabaseForTesting");
                });
            });

        }
    }
}