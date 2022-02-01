using Repositories.Specifications;
using Services.Models.UserModels.RegionModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.RegionServices
{
    public interface IRegionService
    {
        Task<List<RegionModel>> GetRegionByAccess(IdentityUserModel identity);
    }
}
