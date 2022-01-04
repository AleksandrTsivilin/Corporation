using DataBase;
using Microsoft.EntityFrameworkCore;
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

        public UnitService(DBContext context)
        {
            _context = context;
        }
        public async Task<List<UnitModel>> GetUnits()
        {
            return await _context.Units
                .Select((unit) => new UnitModel()
                {
                    Title = unit.Title
                }).ToListAsync();
        }
    }
}
