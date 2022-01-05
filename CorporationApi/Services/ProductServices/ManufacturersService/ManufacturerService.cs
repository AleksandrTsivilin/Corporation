using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.ProductRepositories;
using Services.Models.ProductModels;
using Services.ProductServices.ManufacturerService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.ManufacturersService
{
    public class ManufacturerService : IManufacturerService
    {
        private readonly DBContext _context;
        private readonly IRepository<ManufacturerProduct> _repository;

        public ManufacturerService(DBContext context, IRepository<ManufacturerProduct> repository)
        {
            _context = context;
            _repository = repository;
        }
        public async Task<List<ManufacturerModel>> GetManufacturers()
        {
            var manufacturers = await _repository.Get();
            return manufacturers
                .Select(m => new ManufacturerModel()
                {
                    Title = m.Title
                }).ToList();
            //return await _context.Manufactures
            //    .Select((manufacturer) => new ManufacturerModel()
            //    {
            //        Title = manufacturer.Title
            //    }).ToListAsync();
        }
    }
}
