using DataBase;
using DataBase.Entities.ProductEntities;
using Microsoft.EntityFrameworkCore;
using Repositories;
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
        private readonly IRepository<UnitProduct> _repository;

        public UnitService(DBContext context, IRepository<UnitProduct> repository)
        {
            _repository = repository;
        }
        public async Task<List<UnitModel>> GetUnits()
        {
            var units = await _repository.Get();
            return units.Select(u => new UnitModel()
            {
                Id = u.Id,
                Title = u.Title
            }).ToList();
        }
    }
}
