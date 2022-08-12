using Repositories.Specifications;
using Services.Models.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductServices.StoragesService
{
    public interface IStorageService
    {
        Task<List<StorageModel>> GetStorages();
        Task<StorageModel> GetStorageByUser(IdentityUserModel identity);
        Task<List<StorageModel>> GetStorageByAccess(IdentityUserModel identity);
        Task<int> GetCount();
        Task<List<StorageModel>> GetByFactoryId(int id);
        Task<List<StorageModel>> GetByRegionId(int id);
        Task<StorageModel> GetById(int id);
    }
}
