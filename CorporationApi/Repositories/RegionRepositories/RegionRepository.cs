using DataBase;
using DataBase.Entities;
using Microsoft.EntityFrameworkCore;
using Repositories.BaseRepositories;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.RegionRepositories
{
    public class RegionRepository : Repository<Region>, IRegionRepository
    {
        public RegionRepository(DBContext context)
            : base(context) { }

        public async Task<List<Region>> GetByAccess(RegionSpecificationByAccess specification)
        {
            return await _context.Regions
                .Where(specification.Expression)
                .ToListAsync();
        }
    }
}
