using server.data;
using Microsoft.EntityFrameworkCore;
using server.Repository.IRepository;
using server.Repository.Repositories;
using business_directory.Repository.IRepository;
using Repository.Repositories;
using Microsoft.OpenApi.Models;
using server.Mappers;

// Add using directives for necessary namespaces

// Create a new WebApplication builder
var builder = WebApplication.CreateBuilder(args);

// Configure DbContext to use SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

// Add AutoMapper for object mapping
builder.Services.AddAutoMapper(typeof(BusinessMappers));

// Register repositories for dependency injection
builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Add endpoint API explorer for discovering API endpoints
builder.Services.AddEndpointsApiExplorer();

// Retrieve the JWT secret key from configuration
var key = builder.Configuration.GetValue<string>("ApiSettings:Secret");

// Add controllers with NewtonsoftJson and XML data contract serialization
builder.Services.AddControllers(option =>
{
}).AddNewtonsoftJson().AddXmlDataContractSerializerFormatters();

// Add Swagger documentation with JWT security definition
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
                  "Enter 'Bearer' [space] and then your token in the text input below. \r\n\r\n" +
                  "Example: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });

});

// Build the application
var app = builder.Build();

// If the environment is development, use Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use HTTPS redirection, authentication, authorization, map controllers, and run the application
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
