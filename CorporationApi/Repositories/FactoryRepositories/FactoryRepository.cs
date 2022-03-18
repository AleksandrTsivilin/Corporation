using DataBase;
using DataBase.Entities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using Repositories.ProductRepositories.FactoryRepositories;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.FactoryRepositories
{
    public class FactoryRepository : Repository<Factory>, IFactoryRepository
    {
        public FactoryRepository(DBContext context)
            : base(context) { }

        public async Task<List<Factory>> GetByAccess(FactorySpecificationByAccess specification)
        {
            return await _context.Factories
                .Where(specification.Expression)
                .ToListAsync();
        }

        public async Task<List<Factory>> GetByRegionId(int id)
        {
            return await _context.Factories
                .Where(factory => factory.RegionId == id)
                .ToListAsync();
        }
    }
}
