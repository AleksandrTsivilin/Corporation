using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories;

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
        private readonly IRepository<ManufacturerProduct> _repository;

        public ManufacturerService(DBContext context, IRepository<ManufacturerProduct> repository)
        {
            _repository = repository;
        }
        public async Task<List<ManufacturerModel>> GetManufacturers()
        {
            var manufacturers = await _repository.Get();
            return manufacturers
                .Select(m => new ManufacturerModel()
                {
                    Id = m.Id,
                    Title = m.Title
                }).ToList();
        }
    }
}
