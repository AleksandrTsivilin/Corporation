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

        public async Task<UnitModel> GetById(int id)
        {
            var unit = await _repository.GetById(id);

            return unit is null ? null : GetUnitModel(unit);
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

        private UnitModel GetUnitModel(UnitProduct unit)
        {
            return new UnitModel
            {
                Id = unit.Id,
                Title = unit.Title
            };
        }

    }
}
