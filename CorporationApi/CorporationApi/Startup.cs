using CorporationApi.Controllers;
using CorporationApi.HubConfig;
using DataBase;
using DataBase.Entities.EmployeeEntities;
using DataBase.Entities.ProductEntities;
using DataBase.Entities.UserEntities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repositories;
using Repositories.BaseRepositories;
using Repositories.EmployeeRepositories;
using Repositories.UserRepositories;
using Services.AuthServices;
using Services.EmployeeServices;
using Services.IdentityUserServices;
using Services.ProductService;
using Services.ProductService.MovementsService;
using Services.ProductServices.CategoriesService;
using Services.ProductServices.ManufacturerService;
using Services.ProductServices.ManufacturersService;
using Services.ProductServices.ProductService;
using Services.ProductServices.StoragesService;
using Services.ProductServices.UnitsService;
using Services.UserServices;
using Services.UserServices.AccessServices;
using Services.UserServices.PermissionServices;
using Services.UserServices.RoleServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

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
                opts => opts.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CorporationApi", Version = "v1" });
            });

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });



            //services.AddScoped<IProductServiceTemplate, ProductServiceTemplate>();

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IMovementsServive, MovementsService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IManufacturerService, ManufacturerService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUnitService, UnitService>();
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IRepository<Storage>, Repository<Storage>>();
            services.AddScoped<IRepository<CategoryProduct>, Repository<CategoryProduct>>();
            services.AddScoped<IRepository<ManufacturerProduct>, Repository<ManufacturerProduct>>();
            services.AddScoped<IRepository<UnitProduct>,Repository<UnitProduct>>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<DBContext>();
            services.AddSingleton<RNGCryptoServiceProvider>();

            AddEmployee(services);
            AddRole(services);
            AddPermission(services);
            AddAccess(services);
            AddUserIdentity(services);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
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
            });
        }

        private void AddEmployee(IServiceCollection services)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
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
    }
}
