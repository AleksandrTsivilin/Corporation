using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories.ProductRepositories;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.UnitsService
{
    public class UnitService : IUnitService
    {
        private readonly DBContext _context;
        private readonly IRepository<UnitProduct> _repository;

        public UnitService(DBContext context, IRepository<UnitProduct> repository)
        {
            _context = context;
            _repository = repository;
        }
        public async Task<List<UnitModel>> GetUnits()
        {
            //return await _context.Units
            //    .Select((unit) => new UnitModel()
            //    {
            //        Title = unit.Title
            //    }).ToListAsync();
            var units = await _repository.Get();
            return units.Select(u => new UnitModel()
            {
                Title = u.Title
            }).ToList();
        }
    }
}
