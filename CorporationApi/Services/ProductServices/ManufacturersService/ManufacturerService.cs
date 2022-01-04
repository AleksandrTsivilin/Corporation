using DataBase;
using Microsoft.EntityFrameworkCore;
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

        public ManufacturerService(DBContext context)
        {
            _context = context;
        }
        public async Task<List<ManufacturerModel>> GetManufacturers()
        {
            return await _context.Manufactures
                .Select((manufacturer) => new ManufacturerModel()
                {
                    Title = manufacturer.Title
                }).ToListAsync();
        }
    }
}
