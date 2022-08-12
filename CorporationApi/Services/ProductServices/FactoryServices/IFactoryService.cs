using Repositories.Specifications;
using Services.Models.UserModels.FactoryModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.FactoryServices
{
    public interface IFactoryService
    {
        Task<List<FactoryModel>> GetFactoryByAccess(IdentityUserModel identity);
        Task<List<FactoryModel>> GetFactoryByRegion(int id);
        Task<FactoryModel> GetById(int id);
    }
}
