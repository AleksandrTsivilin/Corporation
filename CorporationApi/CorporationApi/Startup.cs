using CorporationApi.HubConfig;
using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Repositories.ProductRepositories;
using Services.ProductService;
using Services.ProductService.MovementsService;
using Services.ProductServices.CategoriesService;
using Services.ProductServices.ManufacturerService;
using Services.ProductServices.ManufacturersService;
using Services.ProductServices.ProductService;
using Services.ProductServices.StoragesService;
using Services.ProductServices.UnitsService;
using System;
using System.Collections.Generic;
using System.Linq;
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
            services.AddScoped<IManufacturerService, ManufacturerService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUnitService, UnitService>();
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IRepository<Storage>, Repository<Storage>>();
            services.AddScoped<IRepository<CategoryProduct>, Repository<CategoryProduct>>();
            services.AddScoped<IRepository<ManufacturerProduct>, Repository<ManufacturerProduct>>();
            services.AddScoped<IRepository<UnitProduct>, Repository<UnitProduct>>();
            services.AddScoped<DBContext>();
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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapHub<MyHub>("/toastr");
                endpoints.MapHub<ProductHub>("productHub");
                endpoints.MapHub<MovementsHub>("/movementsHub");
            });
        }
    }
}
