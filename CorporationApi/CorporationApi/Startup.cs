using CorporationApi.HubConfig;
using DataBase;
using DataBase.Entities.ProductEntities;
using DataBase.Entities.UserEntities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repositories;
using Repositories.BaseRepositories;
using Repositories.EmployeeRepositories;
using Repositories.FactoryRepositories;
using Repositories.MovementRepositories;
using Repositories.ProductRepositories;
using Repositories.ProductRepositories.FactoryRepositories;
using Repositories.ProductRepositories.ProductTemplatesRepositories;
using Repositories.ProductRepositories.StorageRepositories;
using Repositories.RegionRepositories;
using Repositories.UserRepositories;
using Services.AuthServices;
using Services.EmployeeServices;
using Services.IdentityUserServices;
using Services.ProductService.MovementsService;
using Services.ProductServices.CategoriesService;
using Services.ProductServices.FactoryServices;
using Services.ProductServices.ManufacturerService;
using Services.ProductServices.ManufacturersService;
using Services.ProductServices.ProductService;
using Services.ProductServices.ProductTemplatesServices;
using Services.ProductServices.StoragesService;
using Services.ProductServices.UnitsService;
using Services.RegionServices;
using Services.UserServices;
using Services.UserServices.AccessServices;
using Services.UserServices.PermissionServices;
using Services.UserServices.RoleServices;
using System.Security.Cryptography;
using System.Text;

namespace CorporationApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(option => option.AddPolicy("devCors",
                opts =>
                {
                    opts
                    .WithOrigins("http://localhost:4200", "http://localhost:51678")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    //.AllowAnyOrigin()
                    //.AllowAnyOriginWithCredentials()
                    //.SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials();
                }));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CorporationApi", Version = "v1" });
            });

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });


            services.AddHttpContextAccessor();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IManufacturerService, ManufacturerService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUnitService, UnitService>();

            services.AddScoped<IRepository<CategoryProduct>, Repository<CategoryProduct>>();
            services.AddScoped<IRepository<ManufacturerProduct>, Repository<ManufacturerProduct>>();
            services.AddScoped<IRepository<UnitProduct>,Repository<UnitProduct>>();

            services.AddScoped<DBContext>();
            services.AddSingleton<RNGCryptoServiceProvider>();

            AddEmployee(services);
            AddRole(services);
            AddPermission(services);
            AddAccess(services);
            AddUserIdentity(services);
            AddProduct(services);
            AddStorage(services);
            AddUser(services);
            AddFactory(services);
            AddRegion(services);
            AddMovementProduct(services);
            AddProductTemplates(services);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var token = context.Request.Cookies["tn"];

                            context.Token = token;
                            return System.Threading.Tasks.Task.CompletedTask;
                        }
                    };

                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(Configuration["SignignKey"])),
                            ValidateIssuerSigningKey = true,
                            ValidateLifetime = true,
                            ValidateIssuer = false,
                            ValidateAudience = false,

                        };
                });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CorporationApi v1"));
                app.UseCors("devCors");
            }


            app.UseCors("local angular");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapHub<MyHub>("/toastr");
                endpoints.MapHub<ProductHub>("productHub");
                endpoints.MapHub<MovementsHub>("/movementsHub");
                endpoints.MapHub<UserHub>("/userHub");
                endpoints.MapHub<ProductTemplateHub>("/productTemplateHub");
            });
        }

        private void AddRegion(IServiceCollection services)
        {
            services.AddScoped<IRegionService, RegionService>();
            services.AddScoped<IRegionRepository, RegionRepository>();
        }
        private void AddFactory(IServiceCollection services)
        {
            services.AddScoped<IFactoryService, FactoryService>();
            services.AddScoped<IFactoryRepository, FactoryRepository>();
        }

        private void AddStorage(IServiceCollection services)
        {
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IStorageRepository, StorageRepository>();
        }
        private void AddProduct(IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductRepository, ProductRepository>();
        }
        private void AddMovementProduct(IServiceCollection services)
        {
            services.AddScoped<IMovementsServive, MovementsService>();
            services.AddScoped<IMovementProductRepository, MovementProductRepository>();
        }
        private void AddEmployee(IServiceCollection services)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        }
        private void AddUser(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
        private void AddRole(IServiceCollection services)
        {
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IRepository<Role>, Repository<Role>>();
        }

        private void AddPermission(IServiceCollection services)
        {
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<IRepository<Permission>, Repository<Permission>>();
        }

        private void AddAccess(IServiceCollection services)
        {
            services.AddScoped<IAccessService, AccessService>();
            services.AddScoped<IRepository<Access>, Repository<Access>>();
        }

        private void AddUserIdentity(IServiceCollection services)
        {
            services.AddScoped<IIdentityUserService, IdentityUserService>();
        }

        private void AddProductTemplates(IServiceCollection services)
        {
            services.AddScoped<IProductTemplatesService, ProductTemplatesService>();
            services.AddScoped<IProductTemplatesRepository, ProductTemplatesRepository>();
        }
    }
}
