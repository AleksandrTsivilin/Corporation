using DataBase.Entities;
using Repositories.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.RegionRepositories
{
    public interface IRegionRepository : IRepository<Region>
    {
        Task<List<Region>> GetByAccess(RegionSpecificationByAccess specification);
    }
}
